import { useScrollReveal } from '../hooks/useScrollReveal'

interface Step {
  num: string
  heading: string
  body: string
}

const steps: Step[] = [
  {
    num: '01',
    heading: 'You ask something that actually matters to you.',
    body: 'Three questions — your words, no shared script. The person who answers them well is already telling you something. The person who can\'t is telling you something too. You write them once. They filter for you forever.',
  },
  {
    num: '02',
    heading: 'Someone reads them and decides to reply.',
    body: 'Not a swipe. Not a like on a photo. They read what you asked — thought about it — and wrote something back. That choice alone means more than a hundred matches on other apps. Real words. In their voice. Before you ever connect.',
  },
  {
    num: '03',
    heading: 'You open the app to answers, not strangers.',
    body: 'Your Dates tab loads and the conversation has already started. You know how they think before you say hello. The first message isn\'t awkward — because it isn\'t really the first thing.',
  },
]

function Step({ num, heading, body }: Step) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 flex gap-6 sm:gap-10 lg:gap-14"
    >
      <div className="flex-shrink-0 pt-1">
        <span className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-mint/20 dark:text-mint/15 leading-none select-none">
          {num}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-syne font-extrabold text-xl sm:text-2xl lg:text-3xl text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight tracking-tight">
          {heading}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
          {body}
        </p>
      </div>
    </div>
  )
}

export default function NarrativeSection() {
  const labelRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

        <div ref={labelRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-14 sm:mb-20 lg:mb-24">
          <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">
            How a real conversation starts
          </p>
          <p className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight tracking-tight max-w-2xl">
            Every other app starts with a face.<br />
            <span className="text-mint">This one starts with a question.</span>
          </p>
        </div>

        <div className="space-y-14 sm:space-y-20 lg:space-y-24">
          {steps.map(step => (
            <Step key={step.num} {...step} />
          ))}
        </div>

        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-gray-200 dark:border-gray-800">
          <p className="font-syne font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-3">
            What would your three questions be?
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-xl">
            The ones that would actually tell you if someone is worth your time. That's the only thing you need to decide before you download.
          </p>
        </div>

      </div>
    </section>
  )
}
