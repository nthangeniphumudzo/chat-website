import { useEffect } from "react";
import type { Route } from "./+types/home";
import { useTheme } from "../hooks/useTheme";
import { API_BASE } from "../constants";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroPoster from "../components/HeroPoster";
import Problem from "../components/Problem";
import HowItWorks from "../components/HowItWorks";
import Compare from "../components/Compare";
import SocialProof from "../components/SocialProof";
import PrivacyDemo from "../components/PrivacyDemo";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import StickyDownload from "../components/StickyDownload";
import LegalSection from "../components/LegalSection";
import Footer from "../components/Footer";

const OG_IMAGE = "https://www.chatphcreations.co.za/og-image.png";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ch@t — Free Dating App for Real Conversations | Meet Verified Singles" },
    {
      name: "description",
      content:
        "Ch@t is a free speed-dating app: ask three questions, read real answers, then decide who to chat with. Verified profiles, screenshot-proof chats, no ads. Download for iOS and Android.",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Ch@t" },
    { property: "og:url", content: "https://www.chatphcreations.co.za/" },
    { property: "og:title", content: "Ch@t — Skip the endless texting. Know if you click first." },
    {
      property: "og:description",
      content:
        "The speed-dating app: ask three questions, read their real answers, then decide. Free on iOS & Android.",
    },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_ZA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Ch@t — Skip the endless texting. Know if you click first." },
    {
      name: "twitter:description",
      content:
        "The speed-dating app: ask three questions, read their real answers, then decide. Free on iOS & Android.",
    },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

/**
 * Which hero the page ships with.
 *
 * "direct" is the conversion hero from the landing redesign: outcome headline,
 * one call to action, and the SpeedDate playing on a real screen; "poster" is
 * the original typographic screen. Flip this constant and redeploy to swap arms — it is deliberately
 * build-time rather than a `?hero=` query flag, because picking the variant
 * during render would desync the server markup from the first client render.
 */
const HERO: "direct" | "poster" = "direct";

export default function Home() {
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    // Fire-and-forget visitor tracking.
    fetch(`${API_BASE}/website-visitors/track`, { method: "POST", keepalive: true }).catch(() => {});

    // Promo code tracking — attribute the visit via ?ref=CODE
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref) sessionStorage.setItem("promoRef", ref);
      const activeRef = ref || sessionStorage.getItem("promoRef");
      if (activeRef) {
        const url = `${API_BASE}/promo-codes/${encodeURIComponent(activeRef)}/track`;
        if (navigator.sendBeacon) navigator.sendBeacon(url);
        else fetch(url, { method: "POST", keepalive: true }).catch(() => {});
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    // Bottom padding on phones keeps the sticky download bar off the footer.
    <div className="min-h-screen pb-20 md:pb-0 bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      {HERO === "direct" ? <Hero /> : <HeroPoster />}
      <Problem />
      <HowItWorks isDark={isDark} />
      <Compare />
      <SocialProof />
      <PrivacyDemo isDark={isDark} />
      <FAQ />
      <FinalCTA />
      <LegalSection />
      <Footer isDark={isDark} onToggleTheme={toggle} />
      <StickyDownload />
    </div>
  );
}
