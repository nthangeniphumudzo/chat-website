import GetTheApp from './GetTheApp'

/**
 * A launch offer, shown as a badge above the final call to action — e.g.
 * { label: 'Founding members', detail: 'Join this week and get a month of Premium free' }.
 * Null until there is a real one. An offer the app doesn't honour at sign-up
 * would cost more trust than it wins installs.
 */
const OFFER: { label: string; detail: string } | null = null

/**
 * The reason to act now rather than "later", which on a landing page means
 * never. Without an event or an offer to point at, the urgency is the mechanic
 * itself: questions posted tonight can have answers by the time you next look.
 */
export default function FinalCTA() {
  return (
    <section id="download" className="panel items-center overflow-hidden px-5 text-center sm:px-8">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="soft-glow h-[500px] w-[600px] [--glow-alpha:0.17] sm:h-[640px] sm:w-[940px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        {OFFER && (
          <p className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-2 text-sm">
            <span className="font-bold text-mint-ink">{OFFER.label}</span>
            <span className="text-gray-700 dark:text-gray-200">{OFFER.detail}</span>
          </p>
        )}

        <h2 className="poster-h font-syne mb-6 text-4xl sm:text-6xl lg:text-7xl">
          Ask your three questions
          <br />
          <span className="text-mint-ink">tonight.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl">
          Sign up, write them, and see who answers. It’s free.
        </p>

        <GetTheApp placement="final" />

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          For support:{' '}
          <a href="mailto:chat@phcreations.co.za" className="inline-block py-[14px] -my-[14px] text-mint-ink hover:underline">
            chat@phcreations.co.za
          </a>
        </p>
      </div>
    </section>
  )
}
