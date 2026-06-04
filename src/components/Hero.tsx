import {
  icon_dark, icon_light,
  img_explore, img_settings,
  img_explore_light, img_settings_light,
  img_speed_date_inbox,
} from '../assets/images'
import ScreenshotCarousel from './ScreenshotCarousel'

interface HeroProps {
  isDark: boolean
}

export default function Hero({ isDark }: HeroProps) {
  return (
    <section className="relative flex flex-col lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-12 px-5 sm:px-8 lg:px-24 pt-24 sm:pt-28 pb-12 max-w-7xl mx-auto">

      {/* Background glow — clipped to section via overflow-hidden on a pseudo-wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 sm:w-[400px] lg:w-[600px] h-72 sm:h-[400px] lg:h-[600px] bg-mint/10 rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/3 translate-x-1/4" />
      </div>

      {/* ── Text ── */}
      <div className="relative z-10 animate-fade-up text-center lg:text-left order-2 lg:order-none w-full">
        <div className="flex justify-center lg:justify-start mb-5">
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Chat app"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-contain shadow-xl"
          />
        </div>

        <p className="text-mint font-dm font-medium text-sm sm:text-base mb-3 tracking-wide">
          The opener that actually works
        </p>

        <div className="mx-auto mb-6 lg:mb-8 w-full max-w-sm">
          <ScreenshotCarousel />
        </div>

        <h1 className="font-syne font-extrabold text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-5">
          Meet them<br />
          before<br />
          <span className="text-mint">the first message.</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-4">
          Most matches end before they start. The opener goes nowhere. The conversation fades. Not because you weren’t right for each other — because there was nothing real to begin with.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
          Ch@t starts differently. You write three questions — your words, not a shared script. People answer them in writing before you ever connect. By the time you’re talking, you already know something true about them.
        </p>
        <p className="text-mint/90 text-sm font-medium max-w-md mx-auto lg:mx-0 mb-8">
          Right now, someone nearby is answering. What would you ask?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <a
            href="#download"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-mint text-gray-900 font-syne font-bold text-base active:scale-95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-mint/30 transition-all duration-200"
          >
            Download
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-dm text-base active:scale-95 hover:border-mint hover:text-mint transition-all duration-200"
          >
            How it works
          </a>
        </div>
      </div>

      {/* ── Phones: single on mobile, stacked trio on desktop ── */}


      <div className="hidden lg:flex relative justify-center items-end h-[560px] animate-fade-up-1">
        <div className="absolute bottom-0 right-0 z-10 translate-x-[-80px] translate-y-[80px] scale-75 opacity-50">
          <div className={`w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_settings : img_settings_light} alt="Browse — filters and safety" className="w-full block" loading="lazy" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-20 translate-x-[-40px] translate-y-[40px] scale-[0.875] opacity-75">
          <div className={`w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_explore : img_explore_light} alt="Browse — their Speed Date questions on the card" className="w-full block" loading="lazy" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-30">
          <div className={`w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={img_speed_date_inbox} alt="Dates — replies you’ve received" className="w-full block" loading="eager" />
          </div>
        </div>
      </div>

    </section>
  )
}
