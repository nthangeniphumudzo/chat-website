// no hooks needed
import { useScrollReveal } from '../hooks/useScrollReveal'
import { img_chat } from '../assets/images'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

export default function DownloadSection() {
  const ref = useScrollReveal<HTMLDivElement>()

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

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-sm mx-auto sm:max-w-none">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#00e6a0] text-gray-900 font-syne font-bold text-base active:scale-95 hover:bg-[#00c88a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,230,160,0.35)] transition-all duration-200 shadow-[0_4px_16px_rgba(0,230,160,0.3)]"
          >
            <AppleIcon className="w-5 h-5 flex-shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-dm font-medium opacity-80 uppercase tracking-wider">Download on the</span>
              <span>App Store</span>
            </span>
          </a>

          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gray-900 dark:bg-[#f0f0f0] text-white dark:text-gray-900 font-syne font-bold text-base active:scale-95 hover:bg-gray-800 dark:hover:bg-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
          >
            <GooglePlayIcon className="w-5 h-5 flex-shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-dm font-medium opacity-70 uppercase tracking-wider">Get it on</span>
              <span>Google Play</span>
            </span>
          </a>
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

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.3.17.64.24.99.19l12.6-7.27-2.7-2.7-10.89 9.78zm-1.97-20.52C1.07 3.55 1 3.89 1 4.26v15.48c0 .37.07.71.21 1.02l.09.08 8.67-8.67v-.2L1.3 3.16l-.09.08zM20.54 10.7l-2.46-1.42-3.06 3.06 3.06 3.06 2.48-1.43c.71-.41.71-1.87-.02-2.27zm-18.35 12.5l.08-.05 12.61-7.28-2.69-2.7-10 10.03z" />
    </svg>
  )
}
