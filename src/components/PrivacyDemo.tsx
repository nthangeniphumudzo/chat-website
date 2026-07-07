import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { img_chat, img_chat_light } from '../assets/images'

const privacyPoints = [
  {
    icon: '📵',
    title: 'Screenshot-proof, everywhere',
    body: 'Every screen is covered — messages, photos, profiles. A capture comes out blank or black.',
  },
  {
    icon: '🙈',
    title: 'Invisible to people you block',
    body: 'Block exes or anyone from your contacts. They never see you, you never see them — and they are never notified.',
  },
  {
    icon: '🎛️',
    title: 'You decide who sees you',
    body: 'Age, distance, profile visibility — all under your control from the Privacy & Safety hub.',
  },
]

interface PrivacyDemoProps {
  isDark: boolean
}

export default function PrivacyDemo({ isDark }: PrivacyDemoProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const bodyRef = useScrollReveal<HTMLDivElement>()
  const [captured, setCaptured] = useState(false)
  const [flash, setFlash] = useState(false)

  const takeScreenshot = () => {
    if (captured) {
      setCaptured(false)
      return
    }
    setFlash(true)
    window.setTimeout(() => {
      setFlash(false)
      setCaptured(true)
    }, 180)
  }

  return (
    <section id="privacy" className="py-16 sm:py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-10 sm:mb-14 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Flagship privacy</p>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
            Go on. <span className="text-mint">Try to screenshot it.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            What you share in Ch@t stays in Ch@t. Press the button and see exactly what a screenshot of any screen captures.
          </p>
        </div>

        <div ref={bodyRef} className="opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Interactive phone */}
          <div className="flex flex-col items-center">
            <div className="relative w-56 sm:w-64">
              <div className={`relative rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
                <img
                  src={isDark ? img_chat : img_chat_light}
                  alt="A conversation as you see it in the app"
                  className="w-full block"
                  loading="lazy"
                />
                {/* What the screenshot gets */}
                <div
                  className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-300 ${captured ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  role="img"
                  aria-label="A screenshot of any screen in the app captures only a black frame"
                >
                  <p className="text-gray-500 text-xs font-medium px-8 text-center leading-relaxed">
                    This is everything their camera roll gets.
                    <br />
                    <span className="text-gray-600">Nothing.</span>
                  </p>
                </div>
                {/* Shutter flash */}
                <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity ${flash ? 'opacity-90 duration-75' : 'opacity-0 duration-300'}`} />
              </div>
            </div>

            <button
              onClick={takeScreenshot}
              className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-syne font-bold text-sm active:scale-95 transition-all duration-200 ${
                captured
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                  : 'bg-mint text-gray-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30'
              }`}
            >
              {captured ? '👀 Back to what you see' : '📸 Take a screenshot'}
            </button>
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 text-center max-w-xs">
              {captured
                ? 'Blank or black — on every screen, every time. We built it that way on purpose.'
                : 'This is the real behaviour, on every screen of the app.'}
            </p>
          </div>

          {/* Privacy points */}
          <div className="flex flex-col gap-4">
            {privacyPoints.map(({ icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 hover:border-mint/30 transition-colors duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-mint/5 border border-mint/10 flex items-center justify-center text-xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="font-syne font-bold text-base text-gray-900 dark:text-gray-100 mb-1.5 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
