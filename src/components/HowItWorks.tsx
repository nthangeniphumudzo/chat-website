import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  img_speed_date_modal,
  img_explore, img_explore_light,
  img_speed_date_inbox,
} from '../assets/images'

const STEP_DURATION = 5000

interface StepData {
  num: string
  heading: string
  body: string
  imageDark: string
  imageLight: string
  imageAlt: string
}

const steps: StepData[] = [
  {
    num: '01',
    heading: 'Write your three questions',
    body: 'Your words. They filter every match.',
    imageDark: img_speed_date_modal,
    imageLight: img_speed_date_modal,
    imageAlt: 'Writing your Speed Date questions',
  },
  {
    num: '02',
    heading: 'People nearby answer them',
    body: 'One honest reply beats a hundred swipes.',
    imageDark: img_explore,
    imageLight: img_explore_light,
    imageAlt: 'Browse — your questions on the card',
  },
  {
    num: '03',
    heading: 'Open the app to answers',
    body: 'The first message already happened.',
    imageDark: img_speed_date_inbox,
    imageLight: img_speed_date_inbox,
    imageAlt: 'Speed Date inbox — answers waiting',
  },
]

interface HowItWorksProps {
  isDark: boolean
}

export default function HowItWorks({ isDark }: HowItWorksProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const bodyRef = useScrollReveal<HTMLDivElement>()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance; pauses for a while after the user picks a step themselves
  useEffect(() => {
    if (paused) {
      const resume = window.setTimeout(() => setPaused(false), 12000)
      return () => window.clearTimeout(resume)
    }
    const t = window.setInterval(() => setActive(a => (a + 1) % steps.length), STEP_DURATION)
    return () => window.clearInterval(t)
  }, [paused])

  const pick = (i: number) => {
    setActive(i)
    setPaused(true)
  }

  return (
    <section id="how" className="py-16 sm:py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-10 sm:mb-14 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">How it works</p>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight max-w-2xl mx-auto">
            Every other app starts with a face.
            <br />
            <span className="text-mint">This one starts with a question.</span>
          </h2>
        </div>

        <div ref={bodyRef} className="opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Steps — tap to explore */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            {steps.map((step, i) => {
              const isActive = i === active
              return (
                <button
                  key={step.num}
                  onClick={() => pick(i)}
                  aria-pressed={isActive}
                  className={`relative text-left rounded-2xl border p-5 sm:p-6 transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'border-mint/40 bg-white dark:bg-[#101010] shadow-lg shadow-mint/5'
                      : 'border-transparent hover:border-gray-200 dark:hover:border-gray-800 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className={`font-syne font-extrabold text-2xl leading-none ${isActive ? 'text-mint' : 'text-gray-300 dark:text-gray-700'}`}>
                      {step.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-syne font-bold text-lg sm:text-xl text-gray-900 dark:text-white tracking-tight mb-1.5">
                        {step.heading}
                      </h3>
                      <p className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-all duration-300 ${isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 lg:max-h-24 lg:opacity-100'}`}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                  {/* Progress bar for the active step */}
                  {isActive && !paused && (
                    <span
                      key={`${active}-progress`}
                      className="absolute bottom-0 left-0 h-0.5 bg-mint step-progress"
                      style={{ animationDuration: `${STEP_DURATION}ms` }}
                    />
                  )}
                  {isActive && paused && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint/60" />}
                </button>
              )
            })}

            <a
              href="#download"
              className="mt-4 self-center lg:self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-mint text-gray-900 font-syne font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95 transition-all duration-200"
            >
              Write your three questions — free
              <span aria-hidden>↓</span>
            </a>
          </div>

          {/* Phone that follows the active step */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-56 sm:w-64 lg:w-72">
              <div className={`rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
                {steps.map((step, i) => (
                  <img
                    key={step.num}
                    src={isDark ? step.imageDark : step.imageLight}
                    alt={step.imageAlt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={`w-full block transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
