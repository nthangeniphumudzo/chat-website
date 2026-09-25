import { useState } from 'react'
import { img_profile, img_profile_light } from '../assets/images'
import Screenshot from './Screenshot'
import Icon, { type IconName } from './Icon'

const privacyPoints: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'camera-off',
    title: 'Screenshot-proof, everywhere',
    body: 'Every capture comes out blank.',
  },
  {
    icon: 'eye-off',
    title: 'Invisible to people you block',
    body: 'They never see you. Never notified.',
  },
  {
    icon: 'sliders',
    title: 'You decide who sees you',
    body: 'Age, distance, profile — your call.',
  },
]

interface PrivacyDemoProps {
  isDark: boolean
}

export default function PrivacyDemo({ isDark }: PrivacyDemoProps) {
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
    <section id="privacy" className="panel bg-[linear-gradient(180deg,#f7f9fb_0%,#ecfaf4_45%,#f7f9fb_100%)] dark:bg-none dark:bg-[#080808] px-5 sm:px-8 lg:px-12 py-20">
      <div className="soft-glow pointer-events-none absolute -z-10 top-1/4 left-1/2 h-[720px] w-[880px] max-w-[160vw] -translate-x-1/2 [--glow-alpha:0.24] dark:[--glow-alpha:0.18]" />
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 sm:mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mint-ink mb-5">Flagship privacy</p>
          <h2 className="poster-h font-syne text-4xl sm:text-6xl lg:text-7xl mb-5">
            Try to <span className="text-mint-ink">screenshot it.</span>
          </h2>
          <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-400 leading-snug max-w-lg mx-auto">
            Go on. See what a screenshot actually captures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Interactive phone */}
          <div className="flex flex-col items-center">
            <div className="relative w-56 sm:w-64">
              <div className={`relative rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
                {/* Eager: this one is interactive, so it has to be the real
                    screenshot by the time the visitor taps the button. */}
                <Screenshot
                  src={isDark ? img_profile : img_profile_light}
                  alt="A profile as you see it in the app"
                />
                {/* What the screenshot gets */}
                <div
                  className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-300 ${captured ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  role="img"
                  aria-label="A screenshot of any screen in the app captures only a black frame"
                >
                  <p className="text-gray-300 text-sm font-medium px-8 text-center leading-relaxed">
                    This is everything their camera roll gets.{' '}
                    <span className="block mt-1 font-syne text-2xl font-bold text-white">Nothing.</span>
                  </p>
                </div>
                {/* Shutter flash */}
                <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity ${flash ? 'opacity-90 duration-75' : 'opacity-0 duration-300'}`} />
              </div>
            </div>

            <button
              onClick={takeScreenshot}
              className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm active:scale-95 transition-all duration-200 ${
                captured
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                  : 'bg-mint text-gray-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30'
              }`}
            >
              {captured ? (
                <>
                  <Icon name="eye" className="w-4 h-4" />
                  Back to what you see
                </>
              ) : (
                <>
                  <Icon name="camera" className="w-4 h-4" />
                  Take a screenshot
                </>
              )}
            </button>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs">
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
                className="flex gap-4 p-5 sm:p-6 glass rounded-2xl hover:border-mint/30 transition-colors duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-mint/5 border border-mint/10 flex items-center justify-center flex-shrink-0 text-mint-ink">
                  <Icon name={icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1.5 tracking-tight">
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
