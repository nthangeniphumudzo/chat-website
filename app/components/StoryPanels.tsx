import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Screenshot from './Screenshot'
import {
  img_write_questions, img_write_questions_light,
  img_chat, img_chat_light,
  img_speed_date_inbox,
} from '../assets/images'

interface Step {
  eyebrow: string
  title: string
  line: string
  imageDark?: string
  imageLight?: string
  alt?: string
  /** Render a custom visual (e.g. the live demo) instead of a screenshot. */
  custom?: ReactNode
  reverse?: boolean
}

const steps: Step[] = [
  {
    eyebrow: 'Step 02',
    title: 'Reply in your own words',
    line: 'They read your questions and reply — a real answer, never a cold "hey".',
    imageDark: img_chat,
    imageLight: img_chat_light,
    alt: 'Replying to their questions',
    reverse: true,
  },
  {
    eyebrow: 'Step 03',
    title: 'The dashboard you see after',
    line: "Every answer, waiting for you the moment you open the app.",
    imageDark: img_speed_date_inbox,
    imageLight: img_speed_date_inbox,
    alt: 'Your dashboard of answers',
  },
]

/** Screen 2 — the "It starts with a question" beat, shown with a real app screen. */
function DemoPanel({ isDark }: { isDark: boolean }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <section id="how" className="panel px-5 sm:px-8 overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-mint/10 rounded-full blur-[120px] pointer-events-none" />

      <div
        ref={ref}
        className="reveal relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mint mb-5">Step 01 · How Ch@t works</p>
          <h2 className="poster-h font-syne text-4xl sm:text-6xl lg:text-7xl mb-5">
            It starts with
            <br />
            <span className="text-mint">a question.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 leading-snug max-w-md mx-auto lg:mx-0">

            Go beyond the picture and share what matters to you. Choose three questions that reveal how you think, what you value, and the person behind the profile — in your own words.          </p>
        </div>

        {/* Real app screen — writing your three questions */}
        <div className="flex justify-center">
          <div className={`w-60 sm:w-72 lg:w-80 rounded-[40px] overflow-hidden border-2 phone-bleed ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            {/* First screen below the hero — eager, so it's already there when
                the user's first scroll arrives rather than starting then. */}
            <Screenshot
              src={isDark ? img_write_questions : img_write_questions_light}
              alt="Writing your three questions"
              eager
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeaturePanelProps extends Step {
  isDark: boolean
}

function FeaturePanel({ eyebrow, title, line, imageDark, imageLight, alt, custom, reverse, isDark }: FeaturePanelProps) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <section className="panel px-5 sm:px-8 overflow-hidden">
      {/* Colored wash offset to the image side */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mint/10 rounded-full blur-[120px] pointer-events-none ${reverse ? 'left-0 -translate-x-1/3' : 'right-0 translate-x-1/3'}`} />

      <div
        ref={ref}
        className={`reveal relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
      >
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mint mb-5">{eyebrow}</p>
          <h2 className="poster-h font-syne text-4xl sm:text-5xl lg:text-6xl mb-5">{title}</h2>
          <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 leading-snug max-w-md mx-auto lg:mx-0">
            {line}
          </p>
        </div>

        {/* Visual — a real app screen, or a custom node like the live demo */}
        <div className="flex justify-center">
          {custom ?? (
            <div className={`w-60 sm:w-72 lg:w-80 rounded-[40px] overflow-hidden border-2 phone-bleed ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              {/* The story panels are the narrative spine of the page and sit
                  close behind the hero, so they load up front rather than
                  racing the visitor's scroll. They're ~20K each. */}
              <Screenshot src={(isDark ? imageDark : imageLight) ?? ''} alt={alt ?? ''} eager />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

interface StoryPanelsProps {
  isDark: boolean
}

export default function StoryPanels({ isDark }: StoryPanelsProps) {
  return (
    <>
      <DemoPanel isDark={isDark} />
      {steps.map(step => (
        <FeaturePanel key={step.title} {...step} isDark={isDark} />
      ))}
    </>
  )
}
