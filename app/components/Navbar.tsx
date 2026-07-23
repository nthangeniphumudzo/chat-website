import { useState, useEffect } from 'react'
import { icon_dark, icon_light } from '../assets/images'
import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'

interface NavbarProps {
  isDark: boolean
}

const marketingLinks = [
  { href: './#how', label: 'How it works' },
  { href: './#privacy', label: 'Privacy' },
  { href: './#faq', label: 'FAQ' },
] as const

export default function Navbar({ isDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const platform = usePlatform()

  // A press deep-links to the visitor's store; desktop (no store) scrolls to the CTA.
  const storeUrl =
    platform === 'ios' ? APP_STORE_URL : platform === 'android' ? GOOGLE_PLAY_URL : null

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 4)
      if (y > 80) setMenuOpen(false)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(y / max, 1) : 0)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen
          ? 'bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-gray-800'
          : 'bg-transparent'
        }`}
    >
      {/* Reading progress */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-mint transition-transform duration-150 origin-left w-full"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo on the left — all sizes */}
        <a href="./" className="flex items-center gap-2.5 group flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Chat logo"
            className="w-11 h-11 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {marketingLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop: press deep-links to the store; desktop falls back to the CTA */}
          <a
            href={storeUrl ?? '#download'}
            onClick={() => storeUrl && trackDownload(platform === 'ios' ? 'app_store' : 'google_play', 'navbar')}
            className="hidden md:inline-flex px-5 py-2 rounded-full bg-mint text-gray-900 font-syne font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95 transition-all duration-200"
          >
            Get the app
          </a>

          {/* Mobile: burger on the right */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {marketingLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-mint active:text-mint transition-colors py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
