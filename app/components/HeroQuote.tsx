import { useEffect, useState } from 'react'

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

/** How long a line holds before the next one fades in. */
const HOLD_MS = 30_000

/** Long enough to read as a crossfade, short enough not to feel like a wait. */
const FADE_MS = 500

/**
 * The line under the headline: a love quote, a different one for each visitor,
 * changing every thirty seconds for anyone still reading.
 *
 * Which line shows is decided in the browser, not on the server — the server
 * render has to match the first client render exactly or React replaces it, so
 * the page ships with the first quote and picks the visitor's own the moment it
 * hydrates. Rotation starts from there and runs in order, so nobody sees the
 * same line twice in a row.
 *
 * The box holds its own height at two lines so the phone screens below it don't
 * jump each time the text changes length.
 */
export default function HeroQuote() {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * QUOTES.length))

    const timers: ReturnType<typeof setTimeout>[] = []
    const rotate = setInterval(() => {
      // Nothing to look at on a page nobody is looking at, and a tab woken from
      // the background shouldn't flash through the lines it missed.
      if (document.visibilityState !== 'visible') return
      setShown(false)
      timers.push(
        setTimeout(() => {
          setIndex(i => (i + 1) % QUOTES.length)
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
      {QUOTES[index]}
    </p>
  )
}
