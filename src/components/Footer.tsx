import { icon_dark, icon_light } from '../assets/images'

const legalLinks = [
  { label: 'Terms of Service', href: '#legal' },
  { label: 'Privacy Policy', href: '#legal' },
  { label: 'Account Deletion', href: './account-deletion/' },
  { label: 'Community Guidelines', href: '#legal' },
  { label: 'Cookie Policy', href: '#legal' },
  { label: 'Contact', href: 'mailto:chat@phcreations.com' },
]

interface FooterProps {
  isDark: boolean
}

export default function Footer({ isDark }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10 flex flex-col items-center gap-5 sm:gap-6">

        <a href="./" className="flex items-center gap-2.5 group">
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Chat logo"
            className="w-7 h-7 object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-syne font-extrabold text-lg tracking-tight text-mint">Chat</span>
        </a>

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
