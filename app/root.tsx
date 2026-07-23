import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.png", type: "image/png" },
  { rel: "apple-touch-icon", href: "/favicon.png" },
  { rel: "canonical", href: "https://www.chatphcreations.co.za/" },
  // Preload the two fonts the hero needs first
  { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/playfair-800.woff2", crossOrigin: "anonymous" },
  { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/jakarta-400.woff2", crossOrigin: "anonymous" },
];

// Apply the saved theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var s=localStorage.getItem('chat-theme');var t=s==='light'?'light':'dark';document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`;

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-site-verification" content="S4WDdm8kX-QrNUy7g4YN9w9NOGgZV1j1ILpFCe6N6WY" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Meta />
        <Links />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4JEM4G6RPF" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4JEM4G6RPF');",
          }}
        />
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xdppoucvrx");',
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
