import { useEffect, useState } from 'react'
import { LanguageMark, type LanguageCode } from './LanguageMarks'

/* Ch@t is an African app and the hero should say so before anyone reads a
   word of copy. English leads so the sentence lands as a greeting first, then
   the other ten official languages cycle through the same spot — a visitor
   who waits a few seconds sees their own language in it. */
const GREETINGS = [
  { code: 'en', lang: 'English', text: "Welcome, we're glad you're here." },
  { code: 'zu', lang: 'isiZulu', text: 'Siyakwamukela, siyajabula ukuthi ulapha.' },
  { code: 'xh', lang: 'isiXhosa', text: 'Wamkelekile, siyavuya ukuba ulapha.' },
  { code: 'af', lang: 'Afrikaans', text: 'Welkom, ons is bly jy is hier.' },
  { code: 'nso', lang: 'Sepedi', text: 'Re a go amogela, re thabela gore o le gona.' },
  { code: 'tn', lang: 'Setswana', text: 'Re a go amogela, re itumelela go bo o le teng.' },
  { code: 'st', lang: 'Sesotho', text: 'Re a o amohela, re thabela hore o be teng.' },
  { code: 'ts', lang: 'Xitsonga', text: 'Ha ku amukela, ha tsaka leswi u nga kona.' },
  { code: 'ss', lang: 'siSwati', text: 'Siyakwemukela, siyajabula kutsi ulapha.' },
  { code: 've', lang: 'Tshivenda', text: 'Ro ni tanganedza, ri takalela u ni vhona.' },
  { code: 'nr', lang: 'isiNdebele', text: 'Siyakwamukela, sithabile bona ulapha.' },
] as const

/* Five seconds a language: long enough to actually read the phrase, look at
   the mark, and register it before it moves on. */
const INTERVAL = 5000

export default function Greeting() {
  // Always starts at English so the server-rendered markup matches the first
  // client render; the rotation only begins once the effect runs.
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null

    const start = () => {
      timer ??= setInterval(() => setIndex(n => (n + 1) % GREETINGS.length), INTERVAL)
    }
    const stop = () => {
      if (timer !== null) clearInterval(timer)
      timer = null
    }

    // Nothing is waiting on this timer, so a backgrounded tab shouldn't burn
    // battery re-rendering a greeting nobody can see.
    const onVisibility = () => (document.hidden ? stop() : start())

    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="flex justify-center mb-7">
      {/* The rotation is decoration — a screen reader gets the greeting once,
          in English, instead of eleven live-region announcements. */}
      <span className="sr-only">Welcome, we're glad you're here.</span>

      {/* No badge, no chrome: the greeting is set in the display serif so it
          reads as an epigraph to the headline below it rather than a boxed
          label. Every phrase sits in the same grid cell, so the block is sized
          to the longest one up front and never reflows mid-cycle. */}
      <div aria-hidden="true" className="grid max-w-[92vw]">
        {GREETINGS.map(({ code, lang, text }, n) => (
          <span
            key={code}
            lang={code}
            /* The mark carries the language; the name stays available on hover
               for anyone who wants to know what they're looking at. */
            title={lang}
            className={`col-start-1 row-start-1 flex items-center justify-center gap-3 font-syne text-sm sm:text-lg text-gray-500 dark:text-gray-400 transition-opacity duration-700 motion-reduce:transition-none ${
              n === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <LanguageMark code={code} className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-mint flex-shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
