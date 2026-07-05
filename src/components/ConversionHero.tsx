import googlePlayBadge from '../assets/google-play-badge.svg'
import appStoreBadge from '../assets/app-store-badge.svg'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

function trackDownload(store: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'download_click', { store })
  }
}

export default function ConversionHero() {
  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 px-5 sm:px-8 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-mint/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* The hook — this is the only thing that needs to land */}
        <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05] mb-6">
          Three real questions.
          <br />One real connection
        </h1>

        {/* One quiet line — sets up the scroll */}
        <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl leading-relaxed mb-12 max-w-md mx-auto">
          Meet new people through guided speed dates designed to spark genuine conversations—not endless swiping.
        </p>

        {/* The one action */}
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-4">
          Available on both
        </p>
        <div id="store-badges" className="flex items-center justify-center gap-4">
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload('google_play')}
            className="h-11 w-36 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img src={googlePlayBadge} alt="Get it on Google Play" className="h-full w-full object-contain" />
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload('app_store')}
            className="h-11 w-36 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img src={appStoreBadge} alt="Download on the App Store" className="h-full w-full object-contain" />
          </a>
        </div>
        <p className="text-xs font-medium text-mint mt-4">
          Free to download · No ads, ever
        </p>

      </div>
    </section>
  )
}
