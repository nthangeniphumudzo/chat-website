import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  img_speed_date_inbox,
  img_explore, img_explore_light,
  img_chat, img_chat_light,
  img_profile, img_profile_light,
} from '../assets/images'

interface TabData {
  id: string
  icon: string
  label: string
  title: string
  description: string
  imageDark: string
  imageLight: string
}

const tabs: TabData[] = [
  {
    id: 'dates',
    icon: '⚡',
    label: 'Dates',
    title: 'Open the app to answers',
    description: 'An inbox of people who read your questions and wrote back.',
    imageDark: img_speed_date_inbox,
    imageLight: img_speed_date_inbox,
  },
  {
    id: 'browse',
    icon: '🔎',
    label: 'Browse',
    title: 'Explore nearby, with context',
    description: 'Every card shows their answers — so you know before you decide.',
    imageDark: img_explore,
    imageLight: img_explore_light,
  },
  {
    id: 'inbox',
    icon: '💬',
    label: 'Inbox',
    title: 'Conversations that go somewhere',
    description: 'The first message is easy — you already know something real.',
    imageDark: img_chat,
    imageLight: img_chat_light,
  },
  {
    id: 'you',
    icon: '👤',
    label: 'You',
    title: 'Verified, and in your control',
    description: 'Everyone is verified. You decide who sees you.',
    imageDark: img_profile,
    imageLight: img_profile_light,
  },
]

interface FeatureTabsProps {
  isDark: boolean
}

export default function FeatureTabs({ isDark }: FeatureTabsProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const bodyRef = useScrollReveal<HTMLDivElement>()
  const [active, setActive] = useState(0)
  const tab = tabs[active]

  return (
    <section id="features" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto">
      <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-8 sm:mb-12 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Inside the app</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
          Four tabs. One idea:
          <br />
          <span className="text-mint">know before you match.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Tap around — this is the whole app.
        </p>
      </div>

      <div ref={bodyRef} className="opacity-0 translate-y-8 transition-all duration-700">
        {/* Tab bar */}
        <div role="tablist" aria-label="App tabs" className="flex justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-12">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                i === active
                  ? 'bg-mint text-gray-900 shadow-lg shadow-mint/25 scale-105'
                  : 'bg-gray-100 dark:bg-[#141414] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-800'
              }`}
            >
              <span aria-hidden>{t.icon}</span>
              <span className="hidden xs:inline sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div key={tab.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-fade-up">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
              {tab.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              {tab.description}
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className={`w-56 sm:w-64 lg:w-72 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
              <img
                src={isDark ? tab.imageDark : tab.imageLight}
                alt={`${tab.label} tab screenshot`}
                className="w-full block"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
