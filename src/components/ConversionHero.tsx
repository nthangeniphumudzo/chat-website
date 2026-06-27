import { usePlatform } from '../hooks/usePlatform'
import googlePlayBadge from '../assets/google-play-badge.svg'
import appStoreBadge from '../assets/app-store-badge.svg'
import avatar1 from '../assets/avatars/IMG_3097.jpg'
import avatar2 from '../assets/avatars/IMG_3185.jpg'
import avatar3 from '../assets/avatars/4a115dd1-ea95-4e48-b8f6-d53972ced8de.jpg'
import avatar4 from '../assets/avatars/86f5a1dc-87c8-40eb-bc2e-97445b708ee3.jpg'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

const avatars = [avatar1, avatar2, avatar3, avatar4]

function StoreButton({ href, badge, badgeAlt }: { href: string; badge: string; badgeAlt: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-11 w-36 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <img src={badge} alt={badgeAlt} className="h-full w-full object-contain" />
    </a>
  )
}

export default function ConversionHero() {
  const platform = usePlatform()

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 px-5 sm:px-8 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[300px] bg-mint/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Social proof row */}
        <div className="flex items-center justify-center gap-3 mb-6">
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
            People near you are already inside
          </p>
        </div>

        {/* Star rating */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">Rated 4.8 on the App Store</span>
        </div>

        {/* Headline */}
        <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-5">
          Stop swiping.<br />
          <span className="text-mint">Start connecting.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
          Three questions. A glimpse of who someone is
          <span className="text-gray-700 dark:text-gray-200 font-medium"> before you ever say hello</span>.
        </p>

        {/* Store CTAs */}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          Get it now — available on both
        </p>
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6">
          <StoreButton href={GOOGLE_PLAY_URL} badge={googlePlayBadge} badgeAlt="Get it on Google Play" />
          <StoreButton href={APP_STORE_URL} badge={appStoreBadge} badgeAlt="Download on the App Store" />
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-600">Free · No credit card · Verified profiles</p>

      </div>
    </section>
  )
}
