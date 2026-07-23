import { icon_dark, icon_light } from '../assets/images'

const legalLinks = [
  { label: 'Terms of Service', href: '#legal' },
  { label: 'Privacy Policy', href: '#legal' },
  { label: 'Child safety', href: './child-safety/' },
  { label: 'Account Deletion', href: './account-deletion/' },
  { label: 'Support', href: './support/' },
  { label: 'Community Guidelines', href: '#legal' },
  { label: 'Cookie Policy', href: '#legal' },
  { label: 'Contact', href: 'mailto:chat@phcreations.com' },
]

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/phcreationsltd',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@phcreationschat',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1EdB9qb8E2/',
    path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  },
]

interface FooterProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Footer({ isDark, onToggleTheme }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10 flex flex-col items-center gap-5 sm:gap-6">

        <a href="./" className="flex items-center gap-2.5 group">
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Chat logo"
            className="w-7 h-7 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socials.map(({ name, href, path }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ch@t on ${name}`}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-mint hover:border-mint hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden>
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Appearance toggle — tucked down here so the top bar stays clean */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle light or dark mode"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-mint hover:text-mint transition-all duration-200"
        >
          <span className="text-sm">{isDark ? '☀️' : '🌙'}</span>
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>

        <ul className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-x-5 sm:gap-x-6 gap-y-3 sm:gap-y-2 text-center">
          {legalLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-mint dark:hover:text-mint active:text-mint transition-colors duration-200 py-1 inline-block"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="max-w-2xl text-center space-y-2 px-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            <span className="font-medium text-gray-600 dark:text-gray-300">Globally recognised</span>{' '}
            through TransUnion verification. Our Data Protection Officer (DPO) helps ensure privacy and data
            protection meet international expectations.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            PH CREATION SOFTWARE is registered with the{' '}
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Companies and Intellectual Property Commission (CIPC)
            </span>{' '}
            in South Africa.
          </p>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
          © {new Date().getFullYear()} PH CREATION SOFTWARE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
