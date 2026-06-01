import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import appStoreBadge from '../assets/app-store-badge.svg'
import googlePlayBadge from '../assets/google-play-badge.svg'
import { img_chat } from '../assets/images'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/xeFze9Fv'

export default function DownloadSection() {
  const ref = useScrollReveal<HTMLDivElement>()
  const androidUrl = GOOGLE_PLAY_URL
  const [showIosInstructions, setShowIosInstructions] = useState(false)

  return (
    <section id="download" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-mint/10 dark:bg-mint/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 relative z-10 max-w-xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Get the app</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-5 sm:mb-6">
          <span className="text-mint">Chat</span> on your phone
        </h2>

        <div className="mx-auto mb-8 max-w-xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_35px_80px_-40px_rgba(15,23,42,0.5)] dark:border-white/10 dark:bg-[#090909] sm:mb-10">
          <img
            src={img_chat}
            alt="Chat app screenshot"
            className="h-[380px] w-full object-cover"
            loading="eager"
          />
        </div>

        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 sm:mb-10">
          The same flow you see here: Dates when you open it, then Browse, Inbox, and You.
        </p>

        <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-start sm:gap-6 justify-center">
          <div className="flex flex-col gap-4 w-full sm:w-[360px]">
            <button
              type="button"
              onClick={() => setShowIosInstructions((current) => !current)}
              aria-expanded={showIosInstructions}
              aria-controls="ios-download-instructions"
              className="relative flex items-center justify-center px-5 py-4 rounded-3xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 w-full opacity-90 hover:border-mint hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <img
                src={appStoreBadge}
                alt="TestFlight iOS beta"
                className="w-auto object-contain dark:invert"
                style={{ height: '40px' }}
              />
              <span aria-hidden="true" className="absolute right-4 text-mint">
                {showIosInstructions ? '▴' : '▾'}
              </span>
              <span className="sr-only">Toggle TestFlight instructions</span>
            </button>

            {showIosInstructions && (
              <div
                id="ios-download-instructions"
                className="rounded-3xl border border-mint/20 bg-mint/5 p-6 text-left text-sm text-gray-700 dark:text-gray-200"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Install Chat on iOS via TestFlight</h3>
                <p className="mb-3">
                  To test the beta iOS app with TestFlight, install Apple TestFlight from the App Store if you don't already have it.
                  Then tap the public invite link below, accept the invite, and install the beta build.
                </p>
                <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                  <li>Install Apple TestFlight from the App Store.</li>
                  <li>Open the public TestFlight invite link for Chat.</li>
                  <li>Accept the invite and install the beta build.</li>
                </ol>
                <a
                  href={TESTFLIGHT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-mint px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-mint/90 transition-colors"
                >
                  Download on TestFlight
                </a>
              </div>
            )}
          </div>

          <StoreButton
            href={androidUrl}
            badge={googlePlayBadge}
            alt="Get Chat on Google Play"
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
    </a>
  )
}
