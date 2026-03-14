import { useScrollReveal } from '../hooks/useScrollReveal'
import appStoreBadge from '../assets/app-store-badge.svg'
import googlePlayBadge from '../assets/google-play-badge.svg'

export default function DownloadSection() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="download" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-mint/10 dark:bg-mint/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 relative z-10 max-w-xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Download Today</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 sm:mb-5">
          Find your <span className="text-mint">Chat</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
          Free to download and explore. Premium when you're ready to take it further.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <StoreButton
            badge={appStoreBadge}
            alt="Download on the App Store"
            darkInvert
          />
          <StoreButton
            badge={googlePlayBadge}
            alt="Get it on Google Play"
            badgeHeight={52}
          />
        </div>

        <p className="mt-6 sm:mt-8 text-sm text-gray-400 dark:text-gray-600">
          For support:{' '}
          <a href="mailto:chat@phcreations.com" className="text-mint hover:underline">
            chat@phcreations.com
          </a>
        </p>
      </div>
    </section>
  )
}

interface StoreButtonProps {
  badge: string
  alt: string
  darkInvert?: boolean
  badgeHeight?: number
}

function StoreButton({ badge, alt, darkInvert, badgeHeight = 40 }: StoreButtonProps) {
  return (
    <a
      href="#"
      className="flex items-center justify-center px-5 py-3.5 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 hover:border-mint hover:-translate-y-0.5 active:scale-95 transition-all duration-200 w-full sm:w-auto"
    >
      <img
        src={badge}
        alt={alt}
        className={`w-auto object-contain ${darkInvert ? 'dark:invert' : ''}`}
        style={{ height: `${badgeHeight}px` }}
      />
    </a>
  )
}
