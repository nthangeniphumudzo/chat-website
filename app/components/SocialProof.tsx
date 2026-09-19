import GetTheApp from './GetTheApp'
import LiveStats from './LiveStats'

interface Testimonial {
  /** First name only, and only with the member's permission. */
  name: string
  city: string
  quote: string
}

/**
 * Real members' words, added by hand. Deliberately empty: nothing here may be
 * invented or paraphrased. Every quote must be a real member's own words, used
 * with their permission. The grid only renders once there is at least one.
 */
const TESTIMONIALS: Testimonial[] = []

/**
 * "Is anyone actually on this?" — the question that stops a stranger joining an
 * app they've never heard of. Answered with live figures from the backend (see
 * useLiveStats: nothing shows unless the numbers are real) and, once collected,
 * members' own words.
 */
export default function SocialProof() {
  return (
    <section className="relative overflow-hidden px-5 py-20 text-center sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="soft-glow h-[520px] w-[760px] [--glow-alpha:0.14]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-mint-ink">Live on Ch@t</p>
        <h2 className="poster-h font-syne mb-8 text-4xl sm:text-6xl">
          Real people. <span className="text-mint-ink">Real answers.</span>
        </h2>

        <LiveStats className="mb-4" />
        <p className="mx-auto max-w-md text-base text-gray-500 dark:text-gray-400">
          Every profile is verified before it can use the app — no bots, no catfish.
        </p>

        {TESTIMONIALS.length > 0 && (
          <ul className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ name, city, quote }) => (
              <li key={name + quote} className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#101010]">
                <blockquote className="text-base leading-relaxed text-gray-800 dark:text-gray-100">“{quote}”</blockquote>
                <p className="mt-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {name} · {city}
                </p>
              </li>
            ))}
          </ul>
        )}

        <GetTheApp placement="proof" className="mt-12" />
      </div>
    </section>
  )
}
