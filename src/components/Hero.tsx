import {
  icon_dark, icon_light,
  img_explore, img_match, img_settings,
  img_explore_light, img_settings_light,
} from '../assets/images'

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
      <div className="relative z-10 animate-fade-up text-center lg:text-left order-1 lg:order-none w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mint/20 bg-mint/5 text-mint text-xs font-medium uppercase tracking-widest mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
          Now available
        </div>

        <div className="flex justify-center lg:justify-start mb-5">
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Chat app icon"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-contain shadow-xl"
          />
        </div>

        <h1 className="font-syne font-extrabold text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-5">
          Meaningful<br />
          <span className="text-mint">Connections</span>,<br />
          Real Conversations.
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
          Swipe, compliment, and chat with people who match what you're looking for. When you both connect — the conversation begins.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <a
            href="#download"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-mint text-gray-900 font-syne font-bold text-base active:scale-95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-mint/30 transition-all duration-200"
          >
            Download For Free
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-dm text-base active:scale-95 hover:border-mint hover:text-mint transition-all duration-200"
          >
            See Features
          </a>
        </div>
      </div>

      {/* ── Phones: single on mobile, stacked trio on desktop ── */}
      <div className="flex lg:hidden justify-center order-2 w-full pt-4 animate-fade-up-1">
        <div className={`w-56 rounded-[36px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
          <img src={isDark ? img_explore : img_explore_light} alt="Explore" className="w-full block" loading="eager" />
        </div>
      </div>

      <div className="hidden lg:flex relative justify-center items-end h-[560px] animate-fade-up-1">
        <div className="absolute bottom-0 right-0 z-10 translate-x-[-80px] translate-y-[80px] scale-75 opacity-50">
          <div className={`w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_settings : img_settings_light} alt="Explore Settings" className="w-full block" loading="lazy" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-20 translate-x-[-40px] translate-y-[40px] scale-[0.875] opacity-75">
          <div className={`w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={img_match} alt="Match screen" className="w-full block" loading="lazy" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-30">
          <div className={`w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_explore : img_explore_light} alt="Explore" className="w-full block" loading="eager" />
          </div>
        </div>
      </div>

    </section>
  )
}
