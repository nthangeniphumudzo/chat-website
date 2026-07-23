import { useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  img_explore, img_explore_light,
  img_speed_date_author, img_speed_date_modal, img_speed_date_sent,
  img_chats_list, img_chats_list_light,
  img_settings, img_settings_light,
  img_safety, img_safety_light,
  img_premium,
} from '../assets/images'

interface Screen {
  darkSrc: string
  lightSrc: string
  caption: string
}

// Screens not featured elsewhere on the page — a fresh look inside the app.
const screens: Screen[] = [
  { darkSrc: img_explore, lightSrc: img_explore_light, caption: 'Browse nearby' },
  { darkSrc: img_speed_date_author, lightSrc: img_speed_date_author, caption: 'Your questions' },
  { darkSrc: img_speed_date_modal, lightSrc: img_speed_date_modal, caption: 'Answer someone' },
  { darkSrc: img_speed_date_sent, lightSrc: img_speed_date_sent, caption: 'Sent' },
  { darkSrc: img_chats_list, lightSrc: img_chats_list_light, caption: 'Messages' },
  { darkSrc: img_settings, lightSrc: img_settings_light, caption: 'Filters' },
  { darkSrc: img_safety, lightSrc: img_safety_light, caption: 'Safe Guard' },
  { darkSrc: img_premium, lightSrc: img_premium, caption: 'Premium' },
]

interface AppPreviewProps {
  isDark: boolean
}

/**
 * A plain, swipeable carousel — one screen at a time, dots underneath.
 * The user drives it; nothing moves on its own.
 */
export default function AppPreview({ isDark }: AppPreviewProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    setActive(Math.max(0, Math.min(screens.length - 1, i)))
  }

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section id="preview" className="panel overflow-hidden">
      <div
        ref={headingRef}
        className="opacity-0 translate-y-8 transition-all duration-700 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full mb-10 sm:mb-14 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-mint mb-5">A look inside</p>
        <h2 className="poster-h font-syne text-4xl sm:text-6xl lg:text-7xl mb-5">
          Take a look <span className="text-mint">inside.</span>
        </h2>
        <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-400 leading-snug max-w-lg mx-auto">
          Swipe through the app, screen by screen.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Slides — one full-width screen at a time */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {screens.map(({ darkSrc, lightSrc, caption }, i) => (
            <div key={i} className="shrink-0 w-full snap-center flex flex-col items-center px-5">
              <div className={`w-52 sm:w-60 rounded-[36px] overflow-hidden border-2 phone-bleed ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                <img src={isDark ? darkSrc : lightSrc} alt={caption} className="w-full block" draggable={false} loading="lazy" decoding="async" />
              </div>
              <p className="mt-4 text-sm font-bold text-gray-500 dark:text-gray-400">{caption}</p>
            </div>
          ))}
        </div>

        {/* Arrows — desktop convenience */}
        <button
          onClick={() => goTo(Math.max(0, active - 1))}
          aria-label="Previous screen"
          className="hidden sm:flex absolute left-2 top-[42%] -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur text-gray-600 dark:text-gray-300 hover:border-mint hover:text-mint transition-all disabled:opacity-30"
          disabled={active === 0}
        >
          ←
        </button>
        <button
          onClick={() => goTo(Math.min(screens.length - 1, active + 1))}
          aria-label="Next screen"
          className="hidden sm:flex absolute right-2 top-[42%] -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur text-gray-600 dark:text-gray-300 hover:border-mint hover:text-mint transition-all disabled:opacity-30"
          disabled={active === screens.length - 1}
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to screen ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-mint' : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
