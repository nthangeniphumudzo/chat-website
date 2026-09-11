import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";
import { isbot } from "isbot";

import type { Route } from "./+types/root";
import AppLoader from "./components/AppLoader";
import { detectPlatform, storeLink } from "./lib/platform";
import { API_BASE } from "./constants";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.png", type: "image/png" },
  { rel: "apple-touch-icon", href: "/favicon.png" },
  { rel: "canonical", href: "https://www.chatphcreations.co.za/" },
  // Preload the two fonts the hero needs first — one variable file per family
  // now covers every weight on the page.
  { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/playfair-var.woff2", crossOrigin: "anonymous" },
  { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/jakarta-var.woff2", crossOrigin: "anonymous" },
];

// Runs before first paint. Three jobs:
//  1. Apply the saved theme class so there's no flash of the wrong theme.
//  2. Arm the scroll-reveal animation by adding .js-reveal, then disarm it on a
//     watchdog timer. Sections are only ever hidden while .js-reveal is set, so
//     if the JS bundle is slow to arrive on a weak connection the page reveals
//     itself anyway rather than sitting blank below the fold.
//  3. Raise the loading overlay (.app-loading) and drop it once the first
//     screen's assets have landed.
//
// The overlay rules are what keep it honest on a weak connection:
//   MIN  — stay up briefly even on a warm cache, so it reads as a beat rather
//          than a flicker of something broken.
//   MAX  — an absolute ceiling. Whatever is still in flight, the page is handed
//          over. Screenshots already carry inline placeholders, so content that
//          arrives late still looks intentional rather than empty. Without this
//          a visitor on a bad link would be held at a logo indefinitely, which
//          is precisely the audience we cannot afford to lose.
// Both run off plain DOM events, so a slow or failed hydration cannot strand
// anyone behind the overlay.
const bootScript = `(function(){var d=document.documentElement;try{var s=localStorage.getItem('chat-theme');d.classList.add(s==='dark'?'dark':'light');}catch(e){d.classList.add('light');}d.classList.add('js-reveal');setTimeout(function(){d.classList.remove('js-reveal');},1500);var MIN=700,MAX=3000,t0=Date.now(),done=false;d.classList.add('app-loading');function hide(){if(done)return;done=true;d.classList.remove('app-loading');}function ready(){setTimeout(hide,Math.max(0,MIN-(Date.now()-t0)));}if(document.readyState==='complete'){ready();}else{window.addEventListener('load',ready,{once:true});}setTimeout(hide,MAX);})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "@id": "https://www.chatphcreations.co.za/#app",
      name: "Ch@t",
      operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication",
      applicationSubCategory: "Dating",
      description:
        "A dating app where you meet people through three questions you write yourself. People nearby answer in their own words before you ever match.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
      installUrl: "https://apps.apple.com/us/app/ch-t/id6763358775",
      sameAs: [
        "https://apps.apple.com/us/app/ch-t/id6763358775",
        "https://play.google.com/store/apps/details?id=com.phcreations.chat",
      ],
      publisher: { "@id": "https://www.chatphcreations.co.za/#org" },
    },
    {
      "@type": "Organization",
      "@id": "https://www.chatphcreations.co.za/#org",
      name: "PH Creations",
      url: "https://www.chatphcreations.co.za/",
      logo: "https://www.chatphcreations.co.za/favicon.png",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.chatphcreations.co.za/#website",
      url: "https://www.chatphcreations.co.za/",
      name: "Ch@t",
      publisher: { "@id": "https://www.chatphcreations.co.za/#org" },
    },
  ],
};

// Works out, from the request, which store this visitor belongs to — so the
// download link is right in the server-rendered HTML — and whether this is a
// phone that should be sent to its store on a first visit. HTML is served
// no-store (see workers/app.ts), so per-visitor output is never cached and
// handed to someone else.
export function loader({ request }: Route.LoaderArgs) {
  const ua = request.headers.get("user-agent") ?? "";
  const bot = isbot(ua);
  const platform = detectPlatform(ua, bot);
  const link = storeLink(platform);

  // Only phones whose browser can make the handoff. Never in-app browsers —
  // an automatic store redirect in TikTok fails with "action can't be taken"
  // the moment the page lands — and never crawlers, or Google would index the
  // store listing instead of the site.
  const firstVisit = platform.canDeepLink
    ? { deep: link.href, web: link.web, os: platform.os }
    : null;

  return { platform, firstVisit };
}

// Tap feedback for every download button, installed before React so it works
// from first paint. Opening a store can take a moment, and a button that does
// nothing visible for that moment reads as broken — so the pressed button
// switches to "Opening…" at once. Cleared when the visitor comes back from the
// store (or after 6s).
const downloadFeedbackScript = `(function(){function c(){var a=document.querySelectorAll('[data-opening]');for(var i=0;i<a.length;i++)a[i].removeAttribute('data-opening');}document.addEventListener('click',function(e){var t=e.target,a=t&&t.closest?t.closest('[data-download]'):null;if(!a)return;a.setAttribute('data-opening','');setTimeout(c,6000);});window.addEventListener('pageshow',c);document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')c();});})();`;

// First visit from a phone: send them straight to their store. Runs in <head>,
// before the CSS and the JS bundle, so it fires as soon as the HTML arrives.
//
//  - Homepage only, and only once: the "visited" mark is written before
//    leaving, so pressing Back — or any later visit — shows the site as usual.
//    If storage is blocked we can't remember, so we don't redirect at all
//    rather than risk doing it on every visit.
//  - iPhone: the App Store deep link. Safari asks "Open this page in 'App
//    Store'?" for a redirect nobody tapped — Open goes to the store, Cancel
//    leaves them on the site. No fallback, so a Cancel is respected.
//  - Android: the Play deep link. Chrome may refuse an app handoff nobody
//    tapped, so if the page is still in front after 1.5s we fall back to the
//    Play web listing — recording the visit first, since the page's own
//    tracking won't get to run.
function firstVisitScript(fv: { deep: string; web: string; os: string }) {
  const j = JSON.stringify;
  return `(function(){if(location.pathname!=='/')return;try{if(localStorage.getItem('chat-visited'))return;localStorage.setItem('chat-visited','1');}catch(e){return;}location.href=${j(fv.deep)};if(${j(fv.os)}!=='android')return;var left=false;function m(){left=true;}document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')m();});window.addEventListener('pagehide',m);window.addEventListener('blur',m);setTimeout(function(){if(left||document.visibilityState!=='visible')return;if(!window.__chatTracked){try{var b=${j(API_BASE)};navigator.sendBeacon(b+'/website-visitors/track');var r=new URLSearchParams(location.search).get('ref');if(r)navigator.sendBeacon(b+'/promo-codes/'+encodeURIComponent(r)+'/track');}catch(e){}}location.href=${j(fv.web)};},1500);})();`;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="google-site-verification" content="S4WDdm8kX-QrNUy7g4YN9w9NOGgZV1j1ILpFCe6N6WY" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script dangerouslySetInnerHTML={{ __html: downloadFeedbackScript }} />
        {data?.firstVisit && (
          <script dangerouslySetInnerHTML={{ __html: firstVisitScript(data.firstVisit) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Meta />
        <Links />
        {/* Analytics stub only — queues events immediately (so download
            tracking works). The heavy GA + Clarity scripts load on idle in
            <App/>, keeping them off the critical path on slow connections. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4JEM4G6RPF');",
          }}
        />
      </head>
      <body>
        {/* Server-rendered so the mark is on screen at first paint, in the
            same breath as the page itself — nothing to wait for. */}
        <AppLoader />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    // Load the heavy third-party analytics only once the browser is idle, so
    // they never contend with content + hydration on weak connections.
    const load = () => {
      const ga = document.createElement("script");
      ga.async = true;
      ga.src = "https://www.googletagmanager.com/gtag/js?id=G-4JEM4G6RPF";
      document.head.appendChild(ga);

      const clarity = document.createElement("script");
      clarity.async = true;
      clarity.src = "https://www.clarity.ms/tag/xdppoucvrx";
      document.head.appendChild(clarity);
    };

    const ric = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
      }
    ).requestIdleCallback;
    if (ric) ric(load, { timeout: 5000 });
    else setTimeout(load, 3000);
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
