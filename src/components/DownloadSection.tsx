import { useScrollReveal } from '../hooks/useScrollReveal'
import appStoreBadge from '../assets/app-store-badge.svg'
import googlePlayBadge from '../assets/google-play-badge.svg'

const EAS_BUILD_ANDROID =
  'https://expo.dev/accounts/nthangeniph/projects/Chat/builds/28010399-6f18-4fb5-987b-a05f9db98425'

const BETA_VERSION_LABEL = 'Beta version 1.0.2'

export default function DownloadSection() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="download" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-mint/10 dark:bg-mint/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 relative z-10 max-w-xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Beta version</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 sm:mb-5">
          Try <span className="text-mint">Chat</span> before everyone else
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
          This is an early beta — you get the real app to try on your phone. It’s free to install; you can explore everything and go Premium when you’re ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center">
          <div
            className="flex flex-col items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 w-full sm:w-auto opacity-80"
            aria-label="iOS beta coming soon"
          >
            <img
              src={appStoreBadge}
              alt=""
              className="w-auto object-contain dark:invert opacity-50"
              style={{ height: '40px' }}
            />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Coming soon</span>
          </div>
          <StoreButton
            href={EAS_BUILD_ANDROID}
            badge={googlePlayBadge}
            alt="Get the Chat beta via Google Play"
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
  href: string
  badge: string
  alt: string
  darkInvert?: boolean
  badgeHeight?: number
}

function StoreButton({ href, badge, alt, darkInvert, badgeHeight = 40 }: StoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 hover:border-mint hover:-translate-y-0.5 active:scale-95 transition-all duration-200 w-full sm:w-auto"
    >
      <img
        src={badge}
        alt={alt}
        className={`w-auto object-contain ${darkInvert ? 'dark:invert' : ''}`}
        style={{ height: `${badgeHeight}px` }}
      />
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{BETA_VERSION_LABEL}</span>
    </a>
  )
}
