import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { icon_dark, icon_light } from '../assets/images'

export type NavbarVariant = 'marketing' | 'subpage'

interface NavbarProps {
  isDark: boolean
  onToggle: () => void
  /** `marketing`: home page nav. `subpage`: compact nav (e.g. account deletion). */
  variant?: NavbarVariant
}

const marketingLinks = [
  { to: '/#features', label: 'Features' },
  { to: '/#screens', label: 'Screenshots' },
  { to: '/#safety', label: 'Safety' },
  { to: '/#privacy', label: 'Privacy' },
  { to: '/#premium', label: 'Premium' },
] as const

export default function Navbar({ isDark, onToggle, variant = 'marketing' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y > 80) setMenuOpen(false)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const showFullLinks = variant === 'marketing'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/95 dark:bg-[#050505]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Chat logo"
            className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-syne font-extrabold text-xl tracking-tight text-mint">Chat</span>
        </Link>

        {showFullLinks ? (
          <ul className="hidden md:flex items-center gap-8">
            {marketingLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="hidden md:block flex-1" aria-hidden="true" />
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-base hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <Link
            to="/#download"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-mint text-gray-900 font-syne font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 transition-all duration-200"
          >
            Download beta
          </Link>

          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {showFullLinks &&
            marketingLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-mint active:text-mint transition-colors py-3.5 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                {label}
              </Link>
            ))}
          <Link
            to="/#download"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-mint text-gray-900 font-syne font-bold text-sm active:scale-95 transition-transform"
          >
            Download beta
          </Link>
        </div>
      </div>
    </nav>
  )
}
