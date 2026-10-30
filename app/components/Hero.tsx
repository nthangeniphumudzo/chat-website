import GetTheApp from './GetTheApp'
import { PHOTO_LQIP } from '../assets/photo-lqip'
import opening640 from '../assets/photos/opening-640.webp'
import opening1080 from '../assets/photos/opening-1080.webp'
import opening1600 from '../assets/photos/opening-1600.webp'

/**
 * The first five seconds. It sells what people came for — someone to love —
 * not what the app does: real people in Ch@t shirts behind a headline of hope
 * and (on desktop) the call to action. How the app works is left for the app.
 *
 * Nothing else competes for the tap. Trust signals that used to sit here moved
 * into the sections built to carry them (social proof, FAQ).
 *
 * The photo is a night shot, so the hero is dark in both themes: the `dark`
 * class on the section gives everything inside it its dark-mode colours, the
 * same as if the visitor had picked dark — headline and QR card both
 * read on the photo without colours of their own.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="dark relative flex min-h-svh flex-col justify-end overflow-hidden lg:justify-center bg-[#050505] px-5 pt-24 pb-14 text-gray-100 sm:px-8 lg:pb-20"
    >
      {/* The photo. Its 24px copy is the background, so the scene's colours are
          on screen at first paint, before the full image arrives. It's a
          portrait shot: on a phone it fills the screen, with the people in the
          middle and the copy anchored to the bottom, over the pavement. A wide
          screen would crop it to a strip through their shirts, so there it
          takes the right-hand side whole and fades into the dark under the
          copy on the left. */}
      <img
        src={opening1080}
        srcSet={`${opening640} 640w, ${opening1080} 1080w, ${opening1600} 1600w`}
        sizes="(min-width: 1024px) 62vw, 100vw"
        alt="Two people in Ch@t T-shirts, seen from behind, at a lit fountain at night"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[50%_55%] lg:left-auto lg:w-[62%] lg:object-[50%_40%]"
        style={{ backgroundImage: `url(${PHOTO_LQIP.opening})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      {/* Darkens the photo where the words sit and leaves the people clear:
          the bottom on a phone, the left edge on a wide screen. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-45% to-black/10 lg:hidden" aria-hidden />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#050505] from-38% via-[#050505]/60 via-48% to-transparent to-65% lg:block" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Copy */}
        <div className="text-center lg:max-w-xl lg:text-left">
          {/* The promise, then the invitation. Sized so each line holds on a
              375px phone. */}
          <h1 className="poster-h font-syne mb-8 text-[2.3rem] text-white min-[400px]:text-[2.7rem] sm:text-6xl lg:text-7xl">
            Your person is out there.
            <br />
            <span className="text-mint-ink">Let’s find them.</span>
          </h1>

          {/* Desktop only. On a phone a download button before the visitor has
              heard the story asks too much too soon; the navbar pill and
              the buttons further down pick up once they've had the context. */}
          <div className="hidden md:block">
            <GetTheApp placement="hero" align="start" />
          </div>
        </div>
      </div>
    </section>
  )
}
