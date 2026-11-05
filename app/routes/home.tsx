import type { Route } from "./+types/home";
import { useTheme } from "../hooks/useTheme";
import { usePlatform } from "../hooks/usePlatform";
import { useVisitTracking } from "../hooks/useVisitTracking";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroPoster from "../components/HeroPoster";
import Story from "../components/Story";
import SocialProof from "../components/SocialProof";
import Safe from "../components/Safe";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import StickyDownload from "../components/StickyDownload";
import AdvisorPromo from "../components/AdvisorPromo";
import InAppBrowserHint from "../components/InAppBrowserHint";
import LegalSection from "../components/LegalSection";
import Footer from "../components/Footer";

const OG_IMAGE = "https://www.chatphcreations.co.za/og-image.png";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Ch@t — Your Person Is Out There | Free Dating App for Real Love" },
    { tagName: "link", rel: "canonical", href: "https://www.chatphcreations.co.za/" },
    {
      name: "description",
      content:
        "Your person is out there. Ch@t is a free dating app for finding real love — get to know how someone thinks before you meet, with verified people near you. Download for iOS and Android.",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Ch@t" },
    { property: "og:url", content: "https://www.chatphcreations.co.za/" },
    { property: "og:title", content: "Ch@t — Your person is out there. Let’s find them." },
    {
      property: "og:description",
      content:
        "A free dating app for finding real love. Free on iOS & Android.",
    },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_ZA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Ch@t — Your person is out there. Let’s find them." },
    {
      name: "twitter:description",
      content:
        "A free dating app for finding real love. Free on iOS & Android.",
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

/**
 * The floating card that points at the Relationship Advisor. Hidden for now;
 * the advisor itself (/advisor) is untouched. Set to true to bring it back.
 */
const SHOW_ADVISOR_PROMO = false;

export default function Home() {
  const { isDark, toggle } = useTheme();
  const { inApp } = usePlatform();

  useVisitTracking();

  return (
    // Bottom padding on phones keeps the sticky download bar (or, inside
    // TikTok and co., the open-in-browser bar) off the footer.
    <div className={`min-h-screen ${inApp ? "pb-28" : "pb-20 md:pb-0"} bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden`}>
      <Navbar />
      {HERO === "direct" ? <Hero /> : <HeroPoster />}
      <Story />
      <SocialProof />
      <Safe />
      <FAQ />
      <FinalCTA />
      <LegalSection />
      <Footer isDark={isDark} onToggleTheme={toggle} />
      <StickyDownload />
      <InAppBrowserHint />
      {SHOW_ADVISOR_PROMO && <AdvisorPromo />}
    </div>
  );
}
