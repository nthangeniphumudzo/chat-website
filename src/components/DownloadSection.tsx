import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePlatform } from '../hooks/usePlatform'
import { img_chat } from '../assets/images'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

export default function DownloadSection() {
  const ref = useScrollReveal<HTMLDivElement>()
  const platform = usePlatform()

  return (
    <section id="download" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-mint/10 dark:bg-mint/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 relative z-10 max-w-xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">One last thing</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-5 sm:mb-6">
          What would your<br />
          <span className="text-mint">three questions be?</span>
        </h2>

        <div className="mx-auto mb-8 max-w-xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_35px_80px_-40px_rgba(15,23,42,0.5)] dark:border-white/10 dark:bg-[#090909] sm:mb-10">
          <img
            src={img_chat}
            alt="Chat app screenshot"
            className="h-[380px] w-full object-cover"
            loading="eager"
          />
        </div>

        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
          The ones that would actually tell you if someone is worth your time. The questions no bio ever answers.
        </p>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 sm:mb-10">
          People nearby are already writing theirs. Some of them are already answering yours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          {platform !== 'ios' && (
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-200" aria-label="Get it on Google Play">
            <svg viewBox="0 0 180 53" className="h-10 w-auto" role="img" aria-label="Google Play Store">
              <rect width="180" height="53" rx="6" fill="#000000" />
              <rect x="0.5" y="0.5" width="179" height="52" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.5" fill="none" />
              <g transform="translate(12, 10)">
                <path d="M0 3.5L18 16.5L0 29.5V3.5Z" fill="url(#dsPlayGradient)" />
                <path d="M0 3.5L18 16.5L23 11.5L5 0L0 3.5Z" fill="#00F076" />
                <path d="M23 11.5L18 16.5L23 21.5L28 16.5L23 11.5Z" fill="#FFD400" />
                <path d="M0 29.5L18 16.5L23 21.5L5 33L0 29.5Z" fill="#F33E48" />
                <path d="M0 3.5L5 0L28 16.5L5 33L0 29.5V3.5Z" fill="url(#dsPlayOverlay)" fillOpacity="0.1" />
                <defs>
                  <linearGradient id="dsPlayGradient" x1="0" y1="16.5" x2="18" y2="16.5">
                    <stop stopColor="#00D4FF" />
                    <stop offset="1" stopColor="#00F076" />
                  </linearGradient>
                  <linearGradient id="dsPlayOverlay" x1="14" y1="0" x2="14" y2="33">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </g>
              <text x="52" y="18" fill="#FFFFFF" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">GET IT ON</text>
              <text x="52" y="36" fill="#FFFFFF" fontSize="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">Google Play</text>
            </svg>
          </a>
          )}
          {platform !== 'android' && (
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-200" aria-label="Download on the App Store">
            <svg viewBox="0 0 180 53" className="h-10 w-auto" role="img" aria-label="Apple App Store">
              <rect width="180" height="53" rx="6" fill="#000000" />
              <rect x="0.5" y="0.5" width="179" height="52" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.5" fill="none" />
              <g transform="translate(14, 10)">
                <path d="M15.5 8.5C14.2 8.5 12.7 9.3 11.8 10.4C11 11.4 10.3 12.9 10.5 14.4C11.9 14.5 13.4 13.6 14.2 12.5C15 11.5 15.6 10 15.5 8.5ZM18.7 14.7C16.6 14.6 14.8 15.9 13.8 15.9C12.8 15.9 11.2 14.8 9.5 14.8C6.9 14.9 4.5 16.1 3.2 18.2C0.5 22.4 2.5 28.7 5.1 32C6.4 33.7 7.9 35.5 9.8 35.5C11.6 35.4 12.3 34.3 14.4 34.3C16.5 34.3 17.1 35.5 19 35.4C21 35.4 22.3 33.7 23.6 32C25.1 30.1 25.7 28.2 25.7 28.1C25.7 28 22.4 26.8 22.4 23C22.4 19.7 25 18.2 25.1 18.1C23.4 15.6 20.8 14.8 18.7 14.7Z" fill="#FFFFFF" />
              </g>
              <text x="48" y="18" fill="#FFFFFF" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.3">Download on the</text>
              <text x="48" y="36" fill="#FFFFFF" fontSize="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">App Store</text>
            </svg>
          </a>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-600 font-medium">
          Free to download — no credit card required
        </p>

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

