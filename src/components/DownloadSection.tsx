// no hooks needed
import { useScrollReveal } from '../hooks/useScrollReveal'
import { img_chat } from '../assets/images'
import appStoreBadge from '../assets/app-store-badge.svg'
import googlePlayBadge from '../assets/google-play-badge.svg'

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

        <div className="hidden lg:flex flex-row gap-5 justify-center w-full">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <img src={appStoreBadge} alt="Download on the App Store" className="h-14 object-contain dark:invert" />
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <img src={googlePlayBadge} alt="Get it on Google Play" className="h-14 object-contain dark:invert" />
          </a>
        </div>

        <p className="hidden lg:block mt-4 text-xs text-gray-400 dark:text-gray-600 font-medium">
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

