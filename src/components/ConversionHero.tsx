import googlePlayBadge from '../assets/google-play-badge.svg'
import appStoreBadge from '../assets/app-store-badge.svg'
import avatar1 from '../assets/avatars/IMG_3097.jpg'
import avatar2 from '../assets/avatars/IMG_3185.jpg'
import avatar3 from '../assets/avatars/4a115dd1-ea95-4e48-b8f6-d53972ced8de.jpg'
import avatar4 from '../assets/avatars/86f5a1dc-87c8-40eb-bc2e-97445b708ee3.jpg'
import ScreenshotCarousel from './ScreenshotCarousel'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

const avatars = [avatar1, avatar2, avatar3, avatar4]

function trackDownload(store: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'download_click', { store })
  }
}

function StoreButton({ href, badge, badgeAlt, store }: { href: string; badge: string; badgeAlt: string; store: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownload(store)}
      className="h-11 w-36 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <img src={badge} alt={badgeAlt} className="h-full w-full object-contain" />
    </a>
  )
}

export default function ConversionHero() {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-mint/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: text + CTA ── */}
          <div className="text-center lg:text-left">

            {/* Descriptor — answers "what is this?" instantly */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/20">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              <span className="text-xs font-medium text-mint tracking-wide">
                The dating app that starts with conversation
              </span>
            </div>

            {/* Headline — emotional hook */}
            <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-5">
              Tired of endless swiping?<br />
              <span className="text-mint">Meet someone worth talking to.</span>
            </h1>

            {/* UVP — how it works in one line */}
            <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Answer three questions. Get a glimpse of who someone is
              <span className="text-gray-700 dark:text-gray-200 font-medium"> before you ever match</span>.
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="App user"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-[#050505]"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                People nearby are already answering today's questions
              </p>
            </div>

            {/* Star rating */}
            <div className="flex items-center justify-center lg:justify-start gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">Rated 4.8 on the App Store</span>
            </div>

            {/* Store CTAs — single primary action */}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Get it now — available on both
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <StoreButton href={GOOGLE_PLAY_URL} badge={googlePlayBadge} badgeAlt="Get it on Google Play" store="google_play" />
              <StoreButton href={APP_STORE_URL} badge={appStoreBadge} badgeAlt="Download on the App Store" store="app_store" />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600">Free · No credit card · Verified profiles</p>

          </div>

          {/* ── Right: phone mockup — shows the product immediately ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-56 sm:w-64 lg:w-72 rounded-[38px] overflow-hidden border-2 border-gray-200 dark:border-white/10 shadow-2xl shadow-black/20 dark:shadow-black/60">
              <ScreenshotCarousel />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
