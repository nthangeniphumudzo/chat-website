import { useState, useEffect } from 'react'
import ChatMark from './ChatMark'
import DownloadLink from './DownloadLink'
import { useStickyDismissed } from '../hooks/useStickyDismissed'

const marketingLinks = [
  { href: './#how', label: 'How it works' },
  { href: './#privacy', label: 'Privacy' },
  { href: './#faq', label: 'FAQ' },
] as const

export default function Navbar() {
  const { dismissed } = useStickyDismissed()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

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
                className="inline-flex min-h-11 items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop keeps a download pill in the corner so the answer to "I'm
            convinced" never needs a scroll. Phones get that from the floating
            card instead (StickyDownload), in thumb reach — two of them on one
            small screen would only compete. Send the card away, though, and the
            pill takes over up here, so the app is never more than a tap away. */}
        <DownloadLink
          placement="navbar"
          // The label doesn't name the product — the visitor is already on the
          // page — but a screen reader meeting this link out of context needs it,
          // and the pill is the one CTA visible from anywhere on the page.
          aria-label="Download Ch@t"
          className={`${dismissed ? 'inline-flex' : 'hidden'} md:inline-flex min-h-11 flex-shrink-0 items-center rounded-full bg-mint px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95`}
        >
          Download
        </DownloadLink>
      </div>
    </nav>
  )
}
