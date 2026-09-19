/* The three frustrations a visitor has most likely lived through this week,
   in their own words rather than ours — recognition first, so everything after
   reads as the relief. */
const PAINS = [
  { line: 'You match — then nobody says anything.', note: 'A match is not a conversation.' },
  { line: '“hey” … “hey” … and it dies.', note: 'Nothing to reply to, so nobody does.' },
  { line: 'Swipe, swipe, ghosted. Repeat.', note: 'Photos tell you nothing about how someone thinks.' },
]

export default function Problem() {
  return (
    <section className="bg-gray-50 px-5 py-20 dark:bg-[#080808] sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.25em] text-mint-ink">Sound familiar?</p>

        <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
          {PAINS.map(({ line, note }) => (
            <li key={line} className="py-6 text-center sm:py-8">
              <p className="font-syne text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                {line}
              </p>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400 sm:text-lg">{note}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-lg font-medium text-gray-700 dark:text-gray-200 sm:text-xl">
          Ch@t starts where other apps stall — <span className="text-mint-ink">with a real answer.</span>
        </p>
      </div>
    </section>
  )
}
