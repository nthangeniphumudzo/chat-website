# Live stats endpoint — request for the backend team

> **Status: answered and built.** The backend team implemented this contract
> exactly as specified and settled all six open decisions — see their response
> doc for the resolutions, config variables and test coverage.
>
> **Deployed and verified live.** Returns 200 with
> `Cache-Control: public, max-age=30`, rate-limit headers, and
> `Access-Control-Allow-Origin: https://www.chatphcreations.co.za`. The web side
> now uses real figures in production.
>
> **One open item back to the backend team — see
> [Outstanding: apex origin](#outstanding-apex-origin) at the end.**
>
> This document is kept as the original request and the record of why each rule
> exists.

The landing page needs one public, unauthenticated endpoint returning three
activity figures. The front end is already built against the contract below and
is running on placeholder numbers until this ships.

**Contact:** web / `app/hooks/useLiveStats.ts`

---

## Why unauthenticated

The caller is an anonymous visitor on a marketing page who has never signed in
and may never sign up. There is no user, no session, and no token to issue —
anything requiring credentials cannot work here. Please do not put this behind
the app's normal auth middleware.

Unauthenticated does **not** mean unprotected. See [Abuse](#abuse-and-rate-limiting).

## The endpoint

```
GET /api/public/live-stats
```

Same host as the existing public tracking routes
(`/api/website-visitors/track`, `/api/promo-codes/{code}/track`), so no new
origin and no CORS preflight beyond what those already need.

### Response — `200 application/json`

```json
{
  "online_now": 1247,
  "messages_today": 3108,
  "matches_today": 412
}
```

| Field | Type | Meaning |
|---|---|---|
| `online_now` | integer ≥ 0 | Distinct users currently active. Define "active" as a session or heartbeat seen in the last 5 minutes. |
| `messages_today` | integer ≥ 0 | Messages sent since local midnight, **Africa/Johannesburg (UTC+2)**. Resets daily. |
| `matches_today` | integer ≥ 0 | Matches/connections made since local midnight, **Africa/Johannesburg (UTC+2)**. Resets daily. |

All three are deliberately live or same-day. There is no all-time total: the
page is answering "is anyone here *now*", and a cumulative figure answers a
different question.

Rules the front end relies on:

- **All three fields required.** The page validates all three and renders
  nothing at all if any is missing, negative, non-finite, or non-numeric. A
  partial response shows nothing rather than something wrong.
- **Integers, not strings.** `1247`, not `"1247"` or `"1.2k"`. Formatting is the
  page's job.
- **No PII.** Counts only. No user IDs, names, locations, or message content.
- Extra fields are ignored, so the shape can grow without breaking the page.

### Failure

Any non-`200`, timeout, malformed body, or network error causes the page to
render **nothing** in that slot. There is no error shape to design — the page
never displays an error to visitors, and never falls back to invented numbers.

Prefer failing over guessing: a 503 is better than a stale or fabricated count.

## Caching

Expect this to be the most-hit endpoint on the service — every landing-page
visitor calls it on load and again every 45 seconds while the tab is open.

**Do not compute these live per request.** `COUNT(*)` over a messages table on
every hit will fall over. Suggested approach:

- Maintain the counters in Redis (or equivalent), updated on write.
- Serve straight from that cache.
- Set `Cache-Control: public, max-age=30` so browsers and any CDN in front
  absorb most of the load.

30 seconds of staleness is invisible to a visitor and cuts origin traffic by
orders of magnitude.

## CORS

The page is served from a different origin to the API, so the response needs:

```
Access-Control-Allow-Origin: https://www.chatphcreations.co.za
```

A specific origin is preferred over `*`. If a wildcard is simpler, that is
acceptable here — the payload is three public numbers with no credentials and
no PII. The request sends no cookies and no `Authorization` header, so
`Access-Control-Allow-Credentials` is not needed.

The front end sends only `Accept: application/json` (a CORS-safelisted header),
so **no preflight `OPTIONS` request is triggered** as long as no custom headers
become required. Please don't add a required custom header — it would double
the request count.

## Abuse and rate limiting

Public and cheap means it will be scraped. Please add:

- **Rate limiting per IP** — something like 60 requests/minute is generous
  against the page's real usage (roughly 1 request per 45s per open tab).
- **No enumeration surface** — no query parameters, no date ranges, no
  filtering. One fixed response for everybody. This keeps it trivially
  cacheable and gives an attacker nothing to pivot on.
- **Method restriction** — `GET` only; reject everything else with 405.

Consider that these numbers are commercially revealing: they disclose your real
scale and growth rate to anyone, competitors included. That is the deliberate
trade for social proof, but it is worth a conscious yes from the business
before launch.

## Correctness notes worth deciding up front

1. **`online_now` at zero.** Early on, and at 04:00, this will legitimately be a
   small number or zero. The page will print whatever you send. Decide whether
   you would rather show a true small number or suppress the field until the
   figure clears a floor — if the latter, omit the whole response (503) rather
   than sending a fake number, and the page will simply show nothing.
2. **`messages_today` timezone.** Must be Africa/Johannesburg, not UTC, or the
   counter resets at 02:00 local and users see "today" collapse mid-evening.
3. **Monotonicity within a day.** Both `_today` counters should only ever climb
   until they reset at midnight. The page animates from the previous figure to
   the new one, so a decrease renders as a visible countdown — which reads as
   the app losing data. Beware of deletions or moderation removals decrementing
   the counter mid-day; prefer counting events, not surviving rows.
4. **Definition of "message".** Confirm whether SpeedDate answers count as
   messages, or only free-text chat. Either is fine — keep it stable.
5. **Definition of "match".** This one needs an explicit decision: is a match a
   mutual connection, an accepted SpeedDate response, or the start of a
   conversation? Whatever you pick, `matches_today` should be materially smaller
   than `messages_today` — the two sit side by side on the page, and matches
   exceeding messages would look wrong to a visitor even if it were true.
6. **Both `_today` fields share one rollover.** They must reset at the same
   instant, from the same clock. Two counters resetting minutes apart is
   visible.

## Acceptance checklist

- [ ] `GET /api/public/live-stats` returns 200 with all three integer fields
      (`online_now`, `messages_today`, `matches_today`)
- [ ] Works with no `Authorization` header, no cookie, no session
- [ ] `Access-Control-Allow-Origin` present for the site origin
- [ ] `Cache-Control: public, max-age=30`
- [ ] Served from a counter cache, not a live table scan
- [ ] Rate limited per IP
- [ ] Non-`GET` methods rejected with 405
- [ ] `messages_today` and `matches_today` both roll over at midnight
      Africa/Johannesburg, together
- [ ] Load tested at expected landing-page traffic

Once it is live, the web side flips `USE_PLACEHOLDER` to `false` in
`app/hooks/useLiveStats.ts` and the real figures appear. No other change needed.


---

## Outstanding: apex origin blocked by CORS

**Raised after verifying the live endpoint. This affects real visitors today.**

The site answers on **both** hostnames, and neither redirects to the other:

```
https://chatphcreations.co.za/       -> 200   (no redirect)
https://www.chatphcreations.co.za/   -> 200
```

But the API only allows the `www` origin:

```
Origin: https://www.chatphcreations.co.za   -> access-control-allow-origin: https://www.chatphcreations.co.za
Origin: https://chatphcreations.co.za       -> (no header — browser blocks the response)
```

So every visitor who reaches the site without `www` — typing the domain by hand,
or following a link that omits it — has their stats request blocked by the
browser. The page degrades quietly and correctly (the strip renders nothing
rather than anything wrong), which is exactly why this would not have been
noticed from the outside: **there is no error, just missing social proof for a
share of real traffic.**

Either fix resolves it:

1. **Add `https://chatphcreations.co.za` to the API's CORS allow-list.**
   One-line change, no front-end work. Recommended regardless of option 2 —
   there is no reason for the apex to be a second-class origin.
2. **301 the apex to `www` at the edge.** Worth doing anyway for SEO — two
   hostnames serving identical 200s splits ranking signals and duplicates
   crawling — but it is an infrastructure change rather than an API one.

Doing both is the durable answer.

### Also noted

- `Access-Control-Allow-Credentials: true` is set, which the response doc said
  would not be. Harmless here: the page sends no cookie and no `Authorization`
  header, and `Access-Control-Allow-Origin` is a specific origin rather than
  `*`, so the combination is valid. Flagging only so it is a known deviation
  rather than a surprise later.
- `Cross-Origin-Resource-Policy: same-origin` is present. It does not apply to
  `cors`-mode fetches like this one, so it is not blocking anything today —
  worth remembering if the strip ever goes blank on a browser update.
