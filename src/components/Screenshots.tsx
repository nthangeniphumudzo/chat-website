import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  img_explore, img_chat, img_chats_list, img_settings, img_profile, img_safety,
  img_explore_light, img_chat_light, img_chats_list_light, img_settings_light, img_profile_light, img_safety_light,
  img_speed_date_inbox, img_speed_date_author, img_speed_date_sent, img_speed_date_modal,
} from '../assets/images'

interface ScreenItem {
  darkSrc: string
  lightSrc: string
  caption: string
}

const screens: ScreenItem[] = [
  { darkSrc: img_speed_date_inbox, lightSrc: img_speed_date_inbox, caption: 'Dates — home' },
  { darkSrc: img_speed_date_author, lightSrc: img_speed_date_author, caption: 'Dates — your questions' },
  { darkSrc: img_speed_date_sent, lightSrc: img_speed_date_sent, caption: 'Dates — sent' },
  { darkSrc: img_speed_date_modal, lightSrc: img_speed_date_modal, caption: 'Browse — respond to their questions' },
  { darkSrc: img_explore, lightSrc: img_explore_light, caption: 'Browse' },
  { darkSrc: img_chats_list, lightSrc: img_chats_list_light, caption: 'Inbox' },
  { darkSrc: img_chat, lightSrc: img_chat_light, caption: 'Messaging' },
  { darkSrc: img_profile, lightSrc: img_profile_light, caption: 'You' },
  { darkSrc: img_settings, lightSrc: img_settings_light, caption: 'Filters & safety' },
  { darkSrc: img_safety, lightSrc: img_safety_light, caption: 'Safe Guard' },
]

interface ScreenshotsProps {
  isDark: boolean
}

export default function Screenshots({ isDark }: ScreenshotsProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }

  return (
    <div
      id="screens"
      className="py-16 sm:py-24 bg-gray-50 dark:bg-[#0d0d0d] border-y border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 sm:mb-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-mint mb-3 sm:mb-4">In-app experience</p>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Every screen, <span className="text-mint">crafted</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mt-3 sm:mt-4">
              A quick tour: Dates when you open the app (inbox of answers), writing your three questions, sent answers, answering someone from Browse when their card shows what they asked, Inbox with Primary and Archived, a conversation, You, filters, and safety.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={() => scroll('left')} aria-label="Scroll left" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-mint hover:text-mint transition-all duration-200">←</button>
            <button onClick={() => scroll('right')} aria-label="Scroll right" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-mint hover:text-mint transition-all duration-200">→</button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-5 sm:px-8 lg:px-12 pb-4">
        {screens.map(({ darkSrc, lightSrc, caption }) => (
          <div key={caption} className="flex-shrink-0 w-36 sm:w-44 lg:w-48 group">
            <div className={`rounded-[24px] sm:rounded-[28px] overflow-hidden border transition-all duration-300 group-hover:-translate-y-2 ${isDark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-black/10 shadow-xl shadow-black/10'}`}>
              <img src={isDark ? darkSrc : lightSrc} alt={caption} className="w-full block" loading="lazy" />
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2 sm:mt-3 font-medium">{caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
