import { useEffect } from "react";
import type { Route } from "./+types/home";
import { useTheme } from "../hooks/useTheme";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StoryPanels from "../components/StoryPanels";
import PrivacyDemo from "../components/PrivacyDemo";
import AppPreview from "../components/AppPreview";
import FAQ from "../components/FAQ";
import DownloadSection from "../components/DownloadSection";
import LegalSection from "../components/LegalSection";
import Footer from "../components/Footer";

const OG_IMAGE = "https://www.chatphcreations.co.za/og-image.png";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ch@t — Free Dating App for Real Conversations | Meet Verified Singles" },
    {
      name: "description",
      content:
        "Ch@t is a free dating app where you meet people through three questions you write yourself. Read real answers before you match — verified profiles, screenshot-proof chats, no ads. Download for iOS and Android.",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Ch@t" },
    { property: "og:url", content: "https://www.chatphcreations.co.za/" },
    { property: "og:title", content: "Ch@t — Stop endless swiping. Start real conversations." },
    {
      property: "og:description",
      content:
        "A free dating app where people answer your three questions before you ever match. Verified profiles. No ads. iOS & Android.",
    },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_ZA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Ch@t — Stop endless swiping. Start real conversations." },
    {
      name: "twitter:description",
      content:
        "A free dating app where people answer your three questions before you ever match. Verified profiles. No ads.",
    },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

const TRACK_BASE =
  "https://chatlivecontainer.wonderfulbeach-a47f64a5.southafricanorth.azurecontainerapps.io/api";

export default function Home() {
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    // Fire-and-forget visitor tracking
    fetch(`${TRACK_BASE}/website-visitors/track`, { method: "POST", keepalive: true }).catch(() => {});

    // Promo code tracking — attribute the visit via ?ref=CODE
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref) sessionStorage.setItem("promoRef", ref);
      const activeRef = ref || sessionStorage.getItem("promoRef");
      if (activeRef) {
        const url = `${TRACK_BASE}/promo-codes/${encodeURIComponent(activeRef)}/track`;
        if (navigator.sendBeacon) navigator.sendBeacon(url);
        else fetch(url, { method: "POST", keepalive: true }).catch(() => {});
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="grain min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <Navbar isDark={isDark} />
      <Hero />
      <StoryPanels isDark={isDark} />
      <PrivacyDemo isDark={isDark} />
      <AppPreview isDark={isDark} />
      <FAQ />
      <DownloadSection />
      <LegalSection />
      <Footer isDark={isDark} onToggleTheme={toggle} />
    </div>
  );
}
