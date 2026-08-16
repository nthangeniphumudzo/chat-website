import { useState, useEffect } from 'react'
import ChatMark from './ChatMark'
import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'

const marketingLinks = [
  { href: './#how', label: 'How it works' },
  { href: './#privacy', label: 'Privacy' },
  { href: './#faq', label: 'FAQ' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const platform = usePlatform()

  /* This is now the only download link on the page, so it has to resolve to a
     real store in every state — including 'unknown', which is what both the
     server render and the client's first paint report. It used to fall back to
     the #download section, which was fine while that section had a button of
     its own; with that gone the anchor would strand a desktop visitor, and
     strand anyone who taps before hydration, in a section they can't act on.
     Non-iOS therefore lands on Play, the same rule SmartDownload has always
     used, and Play's web listing handles desktop perfectly well. */
  const isIos = platform === 'ios'
  const storeUrl = isIos ? APP_STORE_URL : GOOGLE_PLAY_URL

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 4)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(y / max, 1) : 0)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
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
        <a href="./" className="flex items-center gap-2.5 group flex-shrink-0">
          <ChatMark
            title="Ch@t"
            className="w-11 h-11 transition-transform duration-200 group-hover:scale-105"
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

        {/* The corner that used to hold the burger. Every section the menu
            linked to is on this same page, so the menu was offering a slower
            route to somewhere a scroll already goes — while the one action that
            matters was hidden on the breakpoint most visitors arrive on. The
            pill takes the slot instead and never leaves the screen, so the
            answer to "I'm convinced" is always one thumb-reach away.
            Press deep-links to the visitor's store; desktop, which has no
            store, falls back to the download section. */}
        <a
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDownload(isIos ? 'app_store' : 'google_play', 'navbar')}
          // The label doesn't name the product — the visitor is already on the
          // page — but a screen reader meeting this link out of context needs it,
          // and this is the only call to action left.
          aria-label="Download Ch@t"
          className="inline-flex flex-shrink-0 items-center rounded-full bg-mint px-5 py-2 font-syne text-sm font-bold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95"
        >
          Download
        </a>
      </div>
    </nav>
  )
}
