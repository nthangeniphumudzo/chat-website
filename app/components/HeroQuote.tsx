import { useEffect, useRef, useState } from 'react'

/** The house line, and the one most visitors see: it names the person they
 *  came here hoping to meet, in names from home. Weighted to show seven times
 *  out of ten (see pick), with the love lines sharing the rest. */
const FEATURED = 'We hope you find your Mandisa/Sandile here.'

/** How often FEATURED wins the toss. */
const FEATURED_SHARE = 0.7

/* Ten lines about love — the subject, not the product. Nothing here sells the
   app or nods at how it works; the headline above already did that, and a line
   that turns back into marketing stops being worth reading. Written in the
   site's own voice rather than borrowed from famous people: most "love quotes"
   in circulation are misattributed, and a wrong name under a line here is the
   kind of thing people screenshot. The first one is the owner's. */
const QUOTES = [
  'Don’t let them lie to you — love is a beautiful thing.',
  'Everyone deserves to be somebody’s favourite person.',
  'The right one feels like coming home.',
  'Somebody out there is hoping to find you too.',
  'Love is worth being brave for.',
  'Butterflies are not a weakness.',
  'Real love is quiet, and it stays.',
  'You’re not too much — you’re just not for everyone.',
  'Love doesn’t rush. It arrives.',
  'To be truly known is to be truly loved.',
]

/** One line, by the odds above: the house line seven times in ten, otherwise
 *  any of the love lines. Each change is its own toss rather than a walk
 *  through the list — a rotation in order would hand every line an equal turn
 *  and quietly undo the weighting. */
function pick() {
  if (Math.random() < FEATURED_SHARE) return FEATURED
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

/** How long a line holds before the next one fades in. */
const HOLD_MS = 30_000

/** Long enough to read as a crossfade, short enough not to feel like a wait. */
const FADE_MS = 500

/**
 * The line under the headline: the house line most of the time, a love line
 * the rest of it, re-drawn every thirty seconds for anyone still reading.
 *
 * Which line shows is decided in the browser, not on the server — the server
 * render has to match the first client render exactly or React replaces it, so
 * the page ships with the house line (the likeliest one anyway) and draws the
 * visitor's own the moment it hydrates.
 *
 * The box holds its own height at two lines so the phone screens below it don't
 * jump each time the text changes length.
 */
export default function HeroQuote() {
  const [line, setLine] = useState(FEATURED)
  const [shown, setShown] = useState(true)
  // What is on screen right now, readable from inside the interval without
  // making the interval depend on it — and without deciding anything inside a
  // state updater, which React is free to run more than once.
  const current = useRef(FEATURED)

  useEffect(() => {
    const show = (next: string) => {
      current.current = next
      setLine(next)
    }
    show(pick())

    const timers: ReturnType<typeof setTimeout>[] = []
    const rotate = setInterval(() => {
      // Nothing to look at on a page nobody is looking at, and a tab woken from
      // the background shouldn't flash through the lines it missed.
      if (document.visibilityState !== 'visible') return
      // Drawing the line that is already up would fade out and back into the
      // same words; hold it instead and draw again at the next turn.
      const next = pick()
      if (next === current.current) return
      setShown(false)
      timers.push(
        setTimeout(() => {
          show(next)
          setShown(true)
        }, FADE_MS),
      )
    }, HOLD_MS)

    return () => {
      clearInterval(rotate)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <p
      className="mx-auto mb-8 flex min-h-[3.5rem] max-w-md items-center justify-center text-lg leading-relaxed text-gray-600 transition-opacity duration-500 dark:text-gray-300 sm:min-h-[4rem] sm:text-xl lg:mx-0 lg:justify-start lg:text-left"
      style={{ opacity: shown ? 1 : 0 }}
      /* The line changes on its own, so a screen reader is told once, quietly,
         rather than interrupted every thirty seconds. */
      aria-live="polite"
      aria-atomic="true"
    >
      {line}
    </p>
  )
}
