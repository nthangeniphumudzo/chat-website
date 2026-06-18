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

// DEBUG: platform check removed so it renders on desktop too — restore when done
export default function FloatingDownloadBar() {
  const [dismissed, setDismissed] = useState(false)
  const platform = usePlatform()
  const { isDark } = useTheme()

  if (dismissed) return null

  const isIOS = platform === 'ios'
  const storeUrl = isIOS ? APP_STORE_URL : GOOGLE_PLAY_URL
  const storeName = isIOS ? 'App Store' : 'Google Play'

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-5">
      <div className="max-w-sm mx-auto">
        <div className="rounded-[20px] p-px bg-gradient-to-br from-mint/60 via-mint/30 to-transparent shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <div className="rounded-[18.5px] overflow-hidden bg-[#161616] dark:bg-white">

            <div className="h-0.5 w-full bg-gradient-to-r from-mint via-mint/80 to-transparent" />

            {/* Store label row */}
            <div className="flex items-center justify-between px-3.5 pt-2.5 pb-0">
              <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                {isIOS ? <AppleIcon /> : <PlayIcon />}
                <span className="text-[10px] font-semibold tracking-widest uppercase">{storeName}</span>
              </div>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="text-gray-400 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-700 transition-colors p-1 -mr-0.5"
              >
                <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true">
                  <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </button>
            </div>

            {/* Main content row */}
            <div className="flex items-center gap-3 px-3.5 py-3">
              <img
                src={isDark ? icon_dark : icon_light}
                alt="app icon"
                className="w-12 h-12 rounded-xl flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white dark:text-gray-900 leading-tight">{isIOS ? 'ch@t' : 'Chat'}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">Dating · Speed Date · Messaging</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Free</p>
              </div>

              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-5 py-1.5 rounded-full bg-mint text-gray-900 text-[13px] font-bold hover:brightness-110 active:scale-95 transition-all duration-150"
                aria-label={`Download on ${storeName}`}
              >
                {isIOS ? 'GET' : 'Install'}
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
