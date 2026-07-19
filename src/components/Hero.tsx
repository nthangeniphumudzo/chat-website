import SmartDownload from './SmartDownload'

export default function Hero() {
  return (
    <section className="panel items-center text-center px-5 sm:px-8 pt-20 pb-10">
      {/* Bold, quiet background wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] max-w-[140vw] h-[600px] bg-mint/18 dark:bg-mint/12 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="poster-h font-syne text-5xl sm:text-7xl lg:text-8xl mb-7">
          People near you
          <br />
          are ready to
          <br />
          <span className="text-mint">connect.</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-2xl leading-relaxed mb-10 max-w-xl mx-auto">
          Get to know them through their answers — long before you ever match.
        </p>

        <SmartDownload placement="hero" id="store-badges" className="justify-center" />
      </div>

      {/* Scroll cue pinned to the bottom of the stage */}
      <a
        href="#how"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-mint transition-colors"
      >
        See how
        <span className="animate-bounce text-base">↓</span>
      </a>
    </section>
  )
}
