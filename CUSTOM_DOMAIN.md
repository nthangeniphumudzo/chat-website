# Custom domain for Chat website (GitHub Pages)

Your site is currently at: **https://nthangeniphumudzo.github.io/chat-website/**

---

## If you see “Redirected you too many times”

**Do this first to get the site working again:**

1. Open **https://github.com/nthangeniphumudzo/chat-website**
2. Go to **Settings → Pages**
3. Under **Custom domain**, **clear the domain field** (delete the value) and click **Save**
4. Wait a minute, then open **https://nthangeniphumudzo.github.io/chat-website/** — it should load without the redirect error

**Why the loop happens:** GitHub redirects `*.github.io/chat-website` to your custom domain. If your DNS or host (e.g. Cloudflare proxy) then sends that domain back to GitHub, you get an endless redirect. Fix DNS (see below) or remove the custom domain until DNS is correct.

**When re-adding the custom domain:** Use **DNS only** at your provider (e.g. in Cloudflare turn off the orange cloud / proxy so it’s grey). Only add the custom domain in GitHub again after the CNAME or A records have propagated (often 5–30 minutes).

## 1. Domain in the repo

**`public/CNAME`** is set to **www.chatphcreations.co.za**. It is copied into `dist/` on build and deployed. Use the same value in GitHub’s Custom domain field.

## 2. GitHub Pages

1. Open **https://github.com/nthangeniphumudzo/chat-website** → **Settings** → **Pages**.
2. Under **Custom domain**, enter **www.chatphcreations.co.za** (must match DNS and `public/CNAME`) and click **Save**.
3. After DNS is correct, turn on **Enforce HTTPS** if you want.

## 3. Configure DNS for chatphcreations.co.za

**Step 1:** Remove any “URL redirect”, “domain forwarding”, or “redirect to URL” for chatphcreations.co.za. Do not redirect to the GitHub URL.

**Step 2:** Add one of the following at your DNS provider (GoDaddy, Namecheap, Cloudflare, etc.).

---

### Option A: chatphcreations.co.za is the root domain (you see “Name” or “Host” as @ or blank)

Add these **4 A records**:

| Type | Name | Value |
|------|------|--------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

---

### Option B: chatphcreations is a subdomain (you have a “Name” or “Host” field like “chatphcreations”)

Add this **1 CNAME record**:

| Type | Name | Value / Target |
|------|------|----------------|
| CNAME | chatphcreations | nthangeniphumudzo.github.io |

(No `https://`, no path. Only `nthangeniphumudzo.github.io`.)

---

### Option C: Using www.chatphcreations.co.za (recommended if you see InvalidDNSError for www)

If you set the custom domain to **www.chatphcreations.co.za** in GitHub, you **must** add this DNS record first; otherwise GitHub shows “Domain's DNS record could not be retrieved (InvalidDNSError)”:

| Type | Name | Value / Target |
|------|------|----------------|
| CNAME | **www** | **nthangeniphumudzo.github.io** |

- **Name/Host:** `www` (not the full domain).
- **Target:** `nthangeniphumudzo.github.io` only (no `https://`, no path).
- At your DNS provider, do **not** use “URL redirect” or “forwarding” for www — use a normal CNAME.
- If you use Cloudflare, set the record to **DNS only** (grey cloud), not proxied (orange cloud), until the domain is working.

After adding the CNAME, wait 5–30 minutes (up to 24–48 hours) for propagation, then in GitHub **Settings → Pages → Custom domain** enter **www.chatphcreations.co.za** and Save. The repo’s `public/CNAME` is already set to `www.chatphcreations.co.za`; redeploy so the live site has it.

---

DNS can take 5–30 minutes (up to 24–48 hours) to propagate.

## 4. Deploy

After saving `public/CNAME` with your real domain:

```bash
npm run deploy
```

GitHub will then serve your site on the custom domain once DNS is correct.

## References

- [GitHub Pages custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
