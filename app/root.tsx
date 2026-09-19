import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { isbot } from "isbot";

import type { Route } from "./+types/root";
import { detectPlatform } from "./lib/platform";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.png", type: "image/png" },
  { rel: "apple-touch-icon", href: "/favicon.png" },
  { rel: "canonical", href: "https://www.chatphcreations.co.za/" },
  // Preload the display face the hero headline needs first. Body text uses the
  // system font, so there is nothing else to fetch.
  { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/playfair-var.woff2", crossOrigin: "anonymous" },
];

// Runs before first paint: apply the theme — the visitor's own toggle choice if
// they made one, otherwise their phone's light/dark setting (see useTheme). It
// also clears the old 'chat-theme' key, which was saved on every visit and isn't
// a choice.
//
// Nothing here covers the page or holds back a tap: the server sends the whole
// page, and it's usable the moment it arrives. (A full-screen loading overlay
// used to sit on top and swallow every tap — measured on a slow 4G phone, the
// page was ready at ~1s while the overlay blocked it until ~3.3s.)
const bootScript = `(function(){var d=document.documentElement;var t='light';try{var s=localStorage.getItem('chat-theme-choice');localStorage.removeItem('chat-theme');t=(s==='dark'||s==='light')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(e){try{t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(e2){}}d.classList.add(t);})();`;

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
// download link is right in the server-rendered HTML. HTML is served no-store
// (see workers/app.ts), so per-visitor output is never cached and handed to
// someone else.
//
// There is deliberately no automatic redirect to the store on a first visit:
// the visitor decides when to go.
export function loader({ request }: Route.LoaderArgs) {
  const ua = request.headers.get("user-agent") ?? "";
  const bot = isbot(ua);
  const platform = detectPlatform(ua, bot);
  return { platform };
}

// Tap feedback for every download button, installed before React so it works
// from first paint. Opening a store can take a moment, and a button that shows
// nothing for that moment reads as broken — so the button switches to
// "Opening…" the instant a finger touches it (pointerdown), not when it lifts:
// on iPhone the App Store handoff starts on release, which can leave no frame
// to show anything. If the touch turns into a scroll (pointercancel) or ends
// without a tap, it switches back. Cleared when the visitor returns from the
// store, or after 6s.
const downloadFeedbackScript = `(function(){var held=null,t=0;function pill(e){var n=e.target;return n&&n.closest?n.closest('[data-download]'):null;}function clear(){held=null;var a=document.querySelectorAll('[data-opening]');for(var i=0;i<a.length;i++)a[i].removeAttribute('data-opening');}function on(a){a.setAttribute('data-opening','');clearTimeout(t);t=setTimeout(clear,6000);}document.addEventListener('pointerdown',function(e){if(e.button!==0)return;var a=pill(e);if(!a)return;held=a;on(a);},{passive:true});document.addEventListener('pointercancel',function(){if(held)clear();});document.addEventListener('pointerup',function(){var a=held;if(!a)return;setTimeout(function(){if(held===a)clear();},500);});document.addEventListener('click',function(e){var a=pill(e);if(!a)return;held=null;on(a);});window.addEventListener('pageshow',clear);document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')clear();});})();`;

export function Layout({ children }: { children: React.ReactNode }) {
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
