import { useEffect, useState } from 'react'
import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'

/**
 * Always-reachable download bar pinned to the bottom of the screen on mobile.
 *
 * Paid-social visitors scroll fast and bounce fast; this keeps a single-tap
 * install under their thumb at all times. It fades in once the hero scrolls
 * away and hides again over the final download section so it never covers the
 * CTA that's already on screen there.
 */
export default function StickyDownloadBar() {
  const platform = usePlatform()
  const [show, setShow] = useState(false)

  // Always go straight to a store — never navigate to a section (that's a
  // wasted click). iPhone → App Store; everything else (Android + unknown)
  // defaults to Google Play.
  const isIos = platform === 'ios'
  const href = isIos ? APP_STORE_URL : GOOGLE_PLAY_URL
  const store = isIos ? 'app_store' : 'google_play'

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      const pastHero = y > 520
      const download = document.getElementById('download')
      let overFinalCta = false
      if (download) {
        const rect = download.getBoundingClientRect()
        // Hide once the final download section enters the viewport.
        overFinalCta = rect.top < window.innerHeight - 40
      }
      setShow(pastHero && !overFinalCta)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 md:hidden transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-2xl border border-black/10 bg-white/95 p-2.5 pl-4 shadow-xl shadow-black/10 backdrop-blur-lg dark:border-white/10 dark:bg-[#0d0d0d]/95 dark:shadow-black/40">
        <div className="min-w-0 flex-1">
          <p className="truncate font-syne text-sm font-extrabold text-gray-900 dark:text-white">
            Ch@t — free to download
          </p>
          <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
            Real people near you, ready to talk
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDownload(store, 'sticky_bar')}
          className="flex-shrink-0 rounded-full bg-mint px-5 py-2.5 font-syne text-sm font-extrabold text-gray-900 shadow-md shadow-mint/30 active:scale-95 transition-transform duration-200"
        >
          Download
        </a>
      </div>
    </div>
  )
}
