import { createRequestHandler, RouterContextProvider, createContext } from "react-router";
import { isbot } from "isbot";
import { detectPlatform, storeLink } from "../app/lib/platform";
import { API_BASE } from "../app/constants";
import { inAppPage } from "./inAppPage";

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
 * Made for the link on TikTok (onchat.co.za/go). Same routing as the site's
 * Download button — iPhone → App Store, everything else → Google Play, direct
 * app links where the browser can take them (see storeLink).
 *
 * - In-app browsers (TikTok, Instagram, …) get a small page instead of a
 *   redirect. Tested on TikTok: any store redirect there ends in "action can't
 *   be taken" — its browser blocks the handoff to the store app, whatever the
 *   link. The page walks them into their real browser (⋯ → Open in browser),
 *   and since its address is /go, that browser goes straight to the store.
 * - Crawlers and link-preview fetchers get the homepage, so a shared link
 *   previews as the site rather than as a redirect.
 * - The visit (and any ?ref= promo code) is counted here, since the site's own
 *   tracking never runs — once. The in-app page tags its address ?seen=1, so
 *   reopening it in the real browser isn't counted again.
 * - no-store + Vary: the answer depends on the phone, so it must never be
 *   cached and handed to someone on the other platform.
 */
function goToStore(request: Request, url: URL, ctx: ExecutionContext): Response {
  const ua = request.headers.get("user-agent") ?? "";
  const bot = isbot(ua);
  const headers = { "Cache-Control": "no-store", Vary: "User-Agent" };

  if (bot) {
    const home = new URL(`https://${CANONICAL_HOST}/`);
    const ref = url.searchParams.get("ref");
    if (ref) home.searchParams.set("ref", ref);
    return new Response(null, { status: 302, headers: { ...headers, Location: home.toString() } });
  }

  // Only real traffic on the live site is counted — not HEAD probes, not
  // local or preview builds, and not a visit already counted inside an app.
  if (request.method === "GET" && url.hostname === CANONICAL_HOST && !url.searchParams.has("seen")) {
    ctx.waitUntil(trackStoreVisit(url));
  }

  const platform = detectPlatform(ua, bot);
  if (platform.inApp) {
    return new Response(inAppPage(platform, url.searchParams.get("ref")), {
      status: 200,
      headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new Response(null, { status: 302, headers: { ...headers, Location: storeLink(platform).href } });
}

async function trackStoreVisit(url: URL) {
  const calls = [fetch(`${API_BASE}/website-visitors/track`, { method: "POST" })];
  const ref = url.searchParams.get("ref");
  if (ref) {
    calls.push(fetch(`${API_BASE}/promo-codes/${encodeURIComponent(ref)}/track`, { method: "POST" }));
  }
  await Promise.allSettled(calls);
}
