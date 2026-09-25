interface Feature {
  name: string
  /** A short qualifier under the name, where the difference is in the detail. */
  note?: string
  /** Whether the typical swipe app has it. Ch@t has every feature listed. */
  others: boolean
}

/* Grouped so the page reads "everything you'd expect" before "what you won't
   find elsewhere". The `others` column describes the big swipe apps in
   general, and gives them the tick wherever they broadly have the feature —
   a comparison that shortchanges competitors is one a visitor can disprove. */
const GROUPS: { title: string; features: Feature[] }[] = [
  {
    title: 'Meeting',
    features: [
      { name: 'SpeedDate', note: 'Read their answers to your questions before you match', others: false },
    ],
  },
  {
    title: 'Chatting',
    features: [
      { name: 'Voice and video calls', others: true },
      { name: 'Voice notes', others: true },
      { name: 'GIFs', others: true },
      { name: 'Reply to a message', others: true },
      { name: 'React to messages', others: true },
      { name: 'Delete sent messages', note: 'Gone for both of you, even after they’ve read it', others: false },
      { name: 'Share your location', note: 'Right in the chat', others: false },
    ],
  },
  {
    title: 'Safety',
    features: [
      { name: 'Block your contacts', note: 'People you know never see you', others: true },
      { name: 'Real face in profile photos', others: true },
      { name: 'Every profile verified', note: 'Required, not optional', others: false },
      { name: 'Explicit photos blocked', note: 'They can’t be sent at all', others: false },
      { name: 'Screenshots blocked', note: 'On every screen, by default', others: false },
    ],
  },
]

function Mark({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-mint text-gray-900">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
      <span className="sr-only">Yes</span>
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden>
        <path d="M7 7l10 10M17 7L7 17" />
      </svg>
      <span className="sr-only">No</span>
    </span>
  )
}

/** Why Ch@t, feature by feature, against the typical swipe app. */
export default function Compare() {
  return (
    <section id="compare" className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f9fb_0%,#ecfaf4_45%,#f7f9fb_100%)] px-5 py-20 dark:bg-none dark:bg-[#080808] sm:px-8 sm:py-28">
      {/* The glass above it needs something to hold. */}
      <div className="soft-glow pointer-events-none absolute -z-10 top-40 left-1/2 h-[720px] w-[880px] max-w-[160vw] -translate-x-1/2 [--glow-alpha:0.26] dark:[--glow-alpha:0.20]" />
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-mint-ink">Why Ch@t is different</p>
          <h2 className="poster-h font-syne text-4xl sm:text-6xl">
            Everything you expect. <span className="text-mint-ink">And then some.</span>
          </h2>
        </div>

        <div className="glass overflow-hidden rounded-3xl">
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th scope="col" className="px-4 py-4 sm:px-6">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="w-20 bg-mint/10 px-2 py-4 text-center font-bold text-mint-ink sm:w-28">Ch@t</th>
                <th scope="col" className="w-20 px-2 py-4 text-center font-semibold text-gray-500 dark:text-gray-400 sm:w-28">Other apps</th>
              </tr>
            </thead>
            {GROUPS.map(({ title, features }) => (
              <tbody key={title}>
                <tr>
                  <th scope="colgroup" colSpan={3} className="px-4 pt-6 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 sm:px-6">
                    {title}
                  </th>
                </tr>
                {features.map(({ name, note, others }) => (
                  <tr key={name} className="border-t border-gray-100 dark:border-gray-800/60">
                    <th scope="row" className="px-4 py-3.5 font-semibold text-gray-900 dark:text-gray-100 sm:px-6">
                      {name}
                      {note && <span className="mt-0.5 block text-xs font-normal text-gray-500 dark:text-gray-400 sm:text-sm">{note}</span>}
                    </th>
                    <td className="bg-mint/10 px-2 py-3.5 text-center">
                      <Mark yes />
                    </td>
                    <td className="px-2 py-3.5 text-center">
                      <Mark yes={others} />
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          “Other apps” means popular swipe-based dating apps. Features vary by app and plan.
        </p>
      </div>
    </section>
  )
}
