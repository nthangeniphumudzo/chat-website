import type { CSSProperties } from 'react'
import LiveStats from './LiveStats'
import Screenshot from './Screenshot'
import { img_speed_date_author } from '../assets/images'

/* Openers that go nowhere, struck out a line at a time.
 *
 * The two rows are two different failures, in the order you'd meet them: the
 * dead message first, then the dead question you fall back on once you're
 * actually talking. Each row runs short → short → long so both rag out to the
 * right and read as lines rather than a bag of tags. "nice pics" is the pivot
 * of the whole block — it's the photo-only compliment the app exists to
 * replace, so it opens the second row. */
const OPENER_ROWS = [
  ['“hey”', '“wyd”', '“what’s your favourite colour?”'],
  ['“nice pics”', '“so… what do you do?”', '“what’s your love language?”'],
]

/* The openers arrive as plain text and are crossed off one at a time.
 *
 * The opening stillness is what makes it read as a decision rather than a page
 * still loading — long enough to take the words in before the first line
 * moves. After that each stroke lands, then rests: the pause is deliberately
 * longer than the stroke itself, so the six read as six separate judgements
 * with breathing room between them rather than one continuous sweep.
 *
 * Note what this costs — six openers a second apart is a ~8s sequence end to
 * end. STRIKE_PAUSE is the dial if that turns out to be too long to hold
 * someone who arrived from a video. */
const STRIKE_HOLD = 0.9
const STRIKE_DURATION = 0.4
const STRIKE_PAUSE = 1.0
const STRIKE_STAGGER = STRIKE_DURATION + STRIKE_PAUSE

/* One flat running order, so the sequence carries on across the line break
   rather than restarting on the second row. */
const DEAD_OPENERS = (() => {
  let order = 0
  return OPENER_ROWS.map(row =>
    /* Rounded because the raw float otherwise reaches the markup as
       "1.1800000000000002s". */
    row.map(text => ({
      text,
      delay: (STRIKE_HOLD + order++ * STRIKE_STAGGER).toFixed(2),
    })),
  )
})()

/**
 * The hero built for cold traffic — someone who arrived from a TikTok video,
 * one-handed, with about two seconds of patience.
 *
 * Three things have to happen above the fold on a phone: say what the app
 * actually does (you write three questions, they answer), show a real screen so
 * the page matches the video they just watched, and let the screen be cut off by
 * the fold so the cut itself reads as "there's more". That last part is why the
 * section is not a `.panel` on mobile — a centred full-screen box would either
 * shrink the phone to fit or clip it at the top. It grows from the top instead
 * and lets the fold do the cropping. Desktop has the room for the usual
 * centred split, so it gets one.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-20 pb-12 sm:px-8 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:pt-20 lg:pb-20">
      {/* Bold, quiet background wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] max-w-[140vw] h-[600px] bg-mint/18 dark:bg-mint/12 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          {/* Name the thing Ch@t replaces before explaining what it is.
              Recognition lands faster than a value proposition, and these are
              the exact openers a visitor has sent or been sent this week — the
              headline underneath then reads as the answer to them. This sits
              where the trust markers used to: "free" survived onto the button,
              and the verified tick is visible in the screenshot itself.

              --strike-duration is set once here and inherited by every stroke,
              so the stroke length lives in one place instead of drifting
              between this file and the stylesheet. */}
          <div
            style={{ '--strike-duration': `${STRIKE_DURATION}s` } as CSSProperties}
            className="mb-5 flex flex-col items-center gap-y-1 font-syne text-xs text-gray-400 dark:text-gray-500 sm:text-sm lg:items-start"
          >
            {/* The strike is doing all the work visually, and a screen reader
                gets none of it — so say the quiet part for it. */}
            <span className="sr-only">Instead of the usual openers:</span>
            {DEAD_OPENERS.map(row => (
              <p
                key={row[0].text}
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start"
              >
                {row.map(({ text, delay }) => (
                  <span
                    key={text}
                    className="strike-out"
                    style={{ '--strike-delay': `${delay}s` } as CSSProperties}
                  >
                    {text}
                  </span>
                ))}
              </p>
            ))}
          </div>

          {/* Short lines on purpose: the mechanic is the hook, so it leads, and
              it has to survive being skimmed at arm's length. The base size is
              set so "Three questions." still holds one line on a 375px phone;
              anything wider can afford the bigger cut. */}
          <h1 className="poster-h font-syne mb-5 text-[2.15rem] min-[400px]:text-[2.6rem] sm:text-6xl lg:text-7xl">
            Three questions.
            <br />
            <span className="text-mint">Real answers.</span>
            <br />
            Then you connect.
          </h1>

          <p className="mx-auto mb-7 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl lg:mx-0">
            You write the questions. They answer in their own words. If you
            align, you connect.
          </p>

          {/* Proof of life, directly under the claim it backs up. Absent until
              real figures land, so the layout must not depend on it. */}
          <LiveStats className="mt-1" />
        </div>

        {/* A real app screen, in the first viewport — and deliberately the
            receiving side of the mechanic rather than the composing side. A
            blank question form is the chore; a real member with a verified tick,
            their interests and their own words is the reward, which is the half
            a stranger needs to see first. It's also the one screenshot the
            visitor sees before any other, so it's the only one worth jumping
            the network queue. */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-52 overflow-hidden rounded-[40px] border-2 border-black/10 phone-bleed dark:border-white/10 sm:w-64 lg:w-80">
            <Screenshot
              src={img_speed_date_author}
              alt="A member’s profile in Ch@t — their photo, interests and languages"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
