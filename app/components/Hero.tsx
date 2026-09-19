import type { CSSProperties } from 'react'
import GetTheApp from './GetTheApp'
import Screenshot from './Screenshot'
import {
  img_write_questions_light,
  img_speed_date_inbox,
  img_chat_light,
} from '../assets/images'

/* One SpeedDate, start to finish, as three real app screens.
 *
 * The brief asked for a looping video of a speed date in progress. A SpeedDate
 * on Ch@t isn't live — it's three questions, written answers, then a decision —
 * so the honest "video" is those three moments playing in turn. They're
 * crossfaded in CSS rather than shipped as a video file: no extra download, no
 * autoplay rules, and the first frame is on screen at first paint.
 *
 * Light-theme screens in both themes on purpose. The theme is only known after
 * hydration, and swapping the hero's image then would re-fetch the one picture
 * the visitor is looking at. The inbox screen only exists in light anyway. */
const REEL = [
  { src: img_write_questions_light, label: 'You ask', alt: 'Writing three questions in Ch@t' },
  { src: img_speed_date_inbox, label: 'They answer', alt: 'A member’s answers to three questions, with Pass and Interested buttons' },
  { src: img_chat_light, label: 'You decide', alt: 'A conversation that started from those answers' },
]

/* Seconds each screen holds. Long enough to read the headline beside it once;
   the whole loop is REEL_STEP × 3. */
const REEL_STEP = 3.5

/**
 * The first five seconds. It has to answer "what is this?" and "why is it
 * different?" before anyone scrolls — so: an outcome headline, one sentence of
 * how, one call to action, and the mechanic playing out on a real phone screen.
 *
 * Nothing else competes for the tap. Trust signals that used to sit here moved
 * into the sections built to carry them (social proof, FAQ).
 */
export default function Hero() {
  const reelVars = { '--reel-duration': `${REEL_STEP * REEL.length}s` } as CSSProperties

  return (
    <section className="relative overflow-hidden px-5 pt-24 pb-14 sm:px-8 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:pt-20 lg:pb-20">
      {/* Bold, quiet background wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="soft-glow absolute -top-60 left-1/2 -translate-x-1/2 w-[1180px] max-w-[190vw] h-[880px] [--glow-alpha:0.2] dark:[--glow-alpha:0.14]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          {/* The outcome, not the feature. Sized so each line holds on a 375px
              phone. */}
          <h1 className="poster-h font-syne mb-5 text-[2.3rem] min-[400px]:text-[2.7rem] sm:text-6xl lg:text-7xl">
            Skip the endless texting.
            <br />
            <span className="text-mint-ink">Know if you click first.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl lg:mx-0">
            Mzansi’s #1 speed-dating app, where you speed date before you chat:
            ask three questions, read their real answers, then decide.
          </p>

          <GetTheApp placement="hero" align="start" id="hero-cta" />
        </div>

        {/* The mechanic, playing on a real phone screen. */}
        <div className="flex flex-col items-center lg:items-end">
          <div className="lg:w-80 flex flex-col items-center" style={reelVars}>
            <div className="relative w-56 overflow-hidden rounded-[40px] border-2 border-black/10 phone-bleed dark:border-white/10 sm:w-64 lg:w-80">
              {REEL.map(({ src, alt }, i) => (
                <div
                  key={src}
                  className={i === 0 ? 'relative' : `reel-frame-${i} absolute inset-0`}
                  aria-hidden={i > 0}
                >
                  <Screenshot src={src} alt={i === 0 ? alt : ''} priority={i === 0} />
                </div>
              ))}
            </div>

            {/* Step captions, lit in time with the screen they describe. */}
            <ol className="mt-5 flex gap-2 text-xs font-semibold sm:text-sm" aria-label="How a SpeedDate works">
              {REEL.map(({ label }, i) => (
                <li
                  key={label}
                  className="reel-label rounded-full px-3 py-1.5"
                  /* Negative, so every label starts mid-cycle in the right state
                     rather than waiting out a delay lit. */
                  style={{ '--reel-delay': `${i === 0 ? 0 : (i - REEL.length) * REEL_STEP}s` } as CSSProperties}
                >
                  {i + 1}. {label}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
