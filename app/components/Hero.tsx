import Greeting from './Greeting'
import SmartDownload from './SmartDownload'

export default function Hero() {
  return (
    <section className="panel items-center text-center px-5 sm:px-8 pt-20 pb-10">
      {/* Bold, quiet background wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] max-w-[140vw] h-[600px] bg-mint/18 dark:bg-mint/12 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <Greeting />

        <h1 className="poster-h font-syne text-5xl sm:text-7xl lg:text-8xl mb-7">
          Don't just see someone.
          <br />
          <span className="text-mint">Meet them.</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-2xl leading-relaxed mb-10 max-w-xl mx-auto">
          There's more to someone than a picture.
          Discover how they think, what matters to them, and if there's something worth exploring — before you connect.        </p>

        <SmartDownload placement="hero" id="store-badges" className="justify-center" />
      </div>

      {/* Scroll cue pinned to the bottom of the stage */}

    </section>
  )
}
