import { createRequestHandler, RouterContextProvider, createContext } from "react-router";
import { isbot } from "isbot";
import { detectPlatform, storeLink } from "../app/lib/platform";
import { API_BASE } from "../app/constants";

// Context key so loaders/actions can reach the Cloudflare env if needed later.
export const cloudflareContext = createContext<{ env: Env; ctx: ExecutionContext }>();

/**
 * One canonical hostname.
 *
 * The site answered on both the apex and www with a 200 and no redirect between
 * them, which quietly broke the hero's live-stats strip: the API returns
 * Access-Control-Allow-Origin for the www origin only, so a visitor who reached
 * the apex — by typing the domain without "www", or following a link that omits
 * it — had the stats request blocked by their browser. Nothing errored; the
 * numbers were simply missing on some devices and present on others.
 *
 * www is already what the page declares as canonical in og:url, so the apex
 * redirects to it. This also stops two hostnames serving byte-identical pages
 * from splitting search ranking signals between them.
 *
 * The query string is carried across — ?ref= promo attribution rides on it.
 */
const APEX_HOST = "chatphcreations.co.za";
const CANONICAL_HOST = "www.chatphcreations.co.za";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname === APEX_HOST) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/go" || url.pathname === "/go/") {
      return goToStore(request, url, ctx);
    }

    const context = new RouterContextProvider();
    context.set(cloudflareContext, { env, ctx });
    const response = await requestHandler(request, context);

    // SSR HTML must not be edge/browser-cached, or deploys show stale content.
    // (Hashed static assets are served by the assets binding, not here, so they
    // keep their long-lived caching.)
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "no-store, must-revalidate");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    return response;
  },
} satisfies ExportedHandler<Env>;

/**
 * /go — straight to the visitor's store, no website in between.
 *
 * Made for the link on TikTok (onchat.co.za/go): a tap should land in the App
 * Store or Play Store, not on a page asking for a second tap. Same routing as
 * the site's Download button — iPhone → App Store, everything else → Google
 * Play, direct app links where the browser can take them (see storeLink).
 *
 * Inside TikTok's own browser, whether the store *app* then opens is TikTok's
 * call: both stores finish with an app handoff that its browser may block. This
 * route only decides where to send them.
 *
 * - Crawlers and link-preview fetchers get the homepage, so a shared link
 *   previews as the site rather than as a redirect.
 * - The visit (and any ?ref= promo code) is counted here, since the page's own
 *   tracking never runs — without holding up the redirect.
 * - no-store + Vary: the answer depends on the phone, so it must never be
 *   cached and handed to someone on the other platform.
 */
function goToStore(request: Request, url: URL, ctx: ExecutionContext): Response {
  const ua = request.headers.get("user-agent") ?? "";
  const bot = isbot(ua);

  const location = bot
    ? `https://${CANONICAL_HOST}/${url.search}`
    : storeLink(detectPlatform(ua, bot)).href;

  // Only real traffic on the live site is counted — not crawlers, not HEAD
  // probes, and not local or preview builds.
  if (!bot && request.method === "GET" && url.hostname === CANONICAL_HOST) {
    ctx.waitUntil(trackStoreVisit(url));
  }

  return new Response(null, {
    status: 302,
    headers: { Location: location, "Cache-Control": "no-store", Vary: "User-Agent" },
  });
}

async function trackStoreVisit(url: URL) {
  const calls = [fetch(`${API_BASE}/website-visitors/track`, { method: "POST" })];
  const ref = url.searchParams.get("ref");
  if (ref) {
    calls.push(fetch(`${API_BASE}/promo-codes/${encodeURIComponent(ref)}/track`, { method: "POST" }));
  }
  await Promise.allSettled(calls);
}
