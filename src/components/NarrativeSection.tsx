import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  img_speed_date_modal,
  img_explore, img_explore_light,
  img_speed_date_inbox,
} from '../assets/images'
import ScreenshotCarousel from './ScreenshotCarousel'

interface StepData {
  num: string
  heading: string
  body: string
  imageDark: string
  imageLight: string
  imageAlt: string
  imageOnLeft: boolean
  carousel?: boolean
}

const steps: StepData[] = [
  {
    num: '01',
    heading: 'Someone reads and decides to reply.',
    body: 'Not a swipe. They read, they thought, they wrote something back. That choice means more than a hundred matches.',
    imageDark: img_explore,
    imageLight: img_explore_light,
    imageAlt: 'Browse — Speed Date questions on the card',
    imageOnLeft: true,
    carousel: true,
  },
  {
    num: '02',
    heading: 'You ask something that actually matters.',
    body: 'Three questions. Your words, no shared script. They filter every match for you — forever.',
    imageDark: img_speed_date_modal,
    imageLight: img_speed_date_modal,
    imageAlt: 'Writing your Speed Date questions',
    imageOnLeft: false,
  },
  {
    num: '03',
    heading: 'You open the app to answers, not strangers.',
    body: "Your Dates tab loads. Real words, in their voice. The first message isn't awkward — because it isn't really the first thing.",
    imageDark: img_speed_date_inbox,
    imageLight: img_speed_date_inbox,
    imageAlt: 'Speed Date inbox — answers waiting',
    imageOnLeft: true,
  },
]

interface NarrativeSectionProps {
  isDark: boolean
}

interface StepProps extends StepData {
  isDark: boolean
}

function Step({ num, heading, body, imageDark, imageLight, imageAlt, imageOnLeft, carousel, isDark }: StepProps) {
  const imgRef = useScrollReveal<HTMLDivElement>()
  const textRef = useScrollReveal<HTMLDivElement>()

  const phoneEl = (
    <div ref={imgRef} className="opacity-0 translate-y-8 transition-all duration-700 flex justify-center">
      {carousel ? (
        <div className="w-56 sm:w-64 lg:w-72">
          <ScreenshotCarousel />
        </div>
      ) : (
        <div className={`w-56 sm:w-64 lg:w-72 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
          <img
            src={isDark ? imageDark : imageLight}
            alt={imageAlt}
            className="w-full block"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )

  const textEl = (
    <div ref={textRef} className="opacity-0 translate-y-8 transition-all duration-700 flex flex-col justify-center">
      <span className="num-3d font-syne font-extrabold text-6xl lg:text-7xl text-mint/20 dark:text-mint/15 leading-none select-none mb-5">
        {num}
      </span>
      <h3 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
        {heading}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-sm">
        {body}
      </p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      {imageOnLeft ? (
        <>
          <div>{phoneEl}</div>
          <div>{textEl}</div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1">{textEl}</div>
          <div className="order-1 lg:order-2">{phoneEl}</div>
        </>
      )}
    </div>
  )
}

export default function NarrativeSection({ isDark }: NarrativeSectionProps) {
  const labelRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

        <div ref={labelRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-16 sm:mb-24 text-center">

          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            How a real conversation starts
          </p>
          <p className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight tracking-tight max-w-2xl mx-auto">
            Every other app starts with a face.<br />
            <span className="text-mint">This one starts with a question.</span>
          </p>
        </div>

        <div className="space-y-20 sm:space-y-28 lg:space-y-32">
          {steps.map(step => (
            <Step key={step.num} {...step} isDark={isDark} />
          ))}
        </div>

      </div>
    </section>
  )
}
