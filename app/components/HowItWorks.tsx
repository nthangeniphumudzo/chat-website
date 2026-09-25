import Screenshot from './Screenshot'
import {
  img_write_questions, img_write_questions_light,
  img_speed_date_inbox,
  img_chat, img_chat_light,
} from '../assets/images'

const STEPS = [
  {
    title: 'Ask three questions',
    line: 'Sign up and write your own — or let Ch@t suggest some from your bio.',
    dark: img_write_questions,
    light: img_write_questions_light,
    alt: 'Writing your three questions',
  },
  {
    title: 'Read their answers',
    line: 'People nearby answer in their own words. No camera, no pressure.',
    dark: img_speed_date_inbox,
    light: img_speed_date_inbox,
    alt: 'A member’s answers to your three questions',
  },
  {
    title: 'Decide',
    line: 'Interested? Start chatting. Not feeling it? Pass and move on.',
    dark: img_chat,
    light: img_chat_light,
    alt: 'A conversation that started from their answers',
  },
]

/**
 * Three steps, no more. The test from the brief: after this section a visitor
 * should be able to explain Ch@t to a friend in one breath.
 */
export default function HowItWorks({ isDark }: { isDark: boolean }) {
  return (
    <section id="how" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-mint-ink">How a SpeedDate works</p>
          <h2 className="poster-h font-syne text-4xl sm:text-6xl">
            Three steps. <span className="text-mint-ink">That’s it.</span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
          {STEPS.map(({ title, line, dark, light, alt }, i) => (
            <li key={title} className="flex flex-col items-center text-center">
              <span aria-hidden className="num-3d font-syne text-7xl font-extrabold leading-none text-mint-ink sm:text-8xl">
                {i + 1}
              </span>
              <h3 className="mt-3 font-syne text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
              <p className="mt-2 max-w-xs text-base leading-relaxed text-gray-500 dark:text-gray-400">{line}</p>
              <div className="mt-6 w-48 overflow-hidden rounded-[32px] border-2 border-black/10 phone-bleed dark:border-white/10 sm:w-52">
                <Screenshot src={isDark ? dark : light} alt={alt} />
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
