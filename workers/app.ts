import { createRequestHandler, RouterContextProvider, createContext } from "react-router";

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
