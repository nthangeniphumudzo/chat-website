import { useState } from 'react'
import { usePlatform } from '../hooks/usePlatform'
import { useTheme } from '../hooks/useTheme'
import { icon_light, icon_dark } from '../assets/images'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

function AppleIcon() {
  return (
    <svg viewBox="0 0 14 17" className="w-3 h-3 fill-current" aria-hidden="true">
      <path d="M9.27 2.03C9.8 1.38 10.16.51 10.06 0c-.77.06-1.7.52-2.24 1.17C7.3 1.74 6.9 2.63 7.01 3.44c.85.07 1.73-.38 2.26-1.41zm.63 1.33c-1.26-.07-2.33.71-2.93.71-.61 0-1.53-.68-2.53-.66C3.1 3.43 1.77 4.2 1.05 5.44-.4 7.92.53 11.57 1.96 13.56c.7.99 1.53 2.1 2.62 2.06 1.04-.04 1.45-.67 2.71-.67 1.27 0 1.63.67 2.73.65 1.13-.02 1.84-1.01 2.53-2 .8-1.14 1.13-2.25 1.15-2.31-.03-.01-2.2-.84-2.22-3.34-.02-2.09 1.71-3.09 1.79-3.14-.98-1.44-2.5-1.6-3.07-1.65z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 12 13" className="w-3 h-3" aria-hidden="true">
      <path d="M0 1.5L9 6.5L0 11.5V1.5Z" fill="#00C853" />
      <path d="M0 1.5L9 6.5L11.5 4L3 0L0 1.5Z" fill="#00E676" />
      <path d="M11.5 4L9 6.5L11.5 9L14 6.5L11.5 4Z" fill="#FFD600" />
      <path d="M0 11.5L9 6.5L11.5 9L3 13L0 11.5Z" fill="#FF1744" />
    </svg>
  )
}

export default function FloatingDownloadBar() {
  const [dismissed, setDismissed] = useState(false)
  const platform = usePlatform()
  const { isDark } = useTheme()

  if (dismissed || platform === 'unknown') return null

  const isIOS = platform === 'ios'
  const storeUrl = isIOS ? APP_STORE_URL : GOOGLE_PLAY_URL
  const storeName = isIOS ? 'App Store' : 'Google Play'

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 lg:hidden">
      <div className="max-w-sm mx-auto rounded-2xl overflow-hidden bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-gray-200/60 dark:border-white/10">

        {/* Store label row */}
        <div className="flex items-center justify-between px-3 pt-2 pb-0">
          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
            {isIOS ? <AppleIcon /> : <PlayIcon />}
            <span className="text-[10px] font-medium tracking-wide">{storeName}</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 -mr-1"
          >
            <svg viewBox="0 0 12 12" className="w-3 h-3 fill-current" aria-hidden="true">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          </button>
        </div>

        {/* Main row */}
        <div className="flex items-center gap-3 px-3 py-2.5">
          {/* App icon */}
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Ch·t app icon"
            className="w-12 h-12 rounded-xl flex-shrink-0 shadow-sm"
          />

          {/* App info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate leading-tight">Ch·t</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">Dating · Speed Date · Messaging</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Free</p>
          </div>

          {/* Get button */}
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-[13px] font-bold text-blue-500 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-white/20 active:scale-95 transition-all duration-150"
            aria-label={`Download Ch·t on ${storeName}`}
          >
            Get
          </a>
        </div>
      </div>
    </div>
  )
}
