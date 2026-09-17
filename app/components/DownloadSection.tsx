import { useState } from 'react'

const sampleQuestions = [
  "What's a belief you've changed your mind about?",
  'Early mornings or late nights?',
  "What's something small that makes your day?",
  'What would you do with a free year?',
  "What's a green flag people overlook?",
  'What are you unreasonably good at?',
]

export default function DownloadSection() {
  const [picked, setPicked] = useState<string[]>([])
  const done = picked.length === 3

  const toggle = (q: string) => {
    setPicked(prev =>
      prev.includes(q) ? prev.filter(p => p !== q) : prev.length < 3 ? [...prev, q] : prev
    )
  }

  return (
    <section id="download" className="panel items-center px-5 sm:px-8 text-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="soft-glow w-[600px] sm:w-[940px] h-[500px] sm:h-[640px] [--glow-alpha:0.17]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-mint-ink mb-5">One last thing</p>
        <h2 className="poster-h font-syne text-4xl sm:text-6xl lg:text-7xl mb-6">
          What would your
          <br />
          <span className="text-mint-ink">three questions be?</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
          Try it — pick three. In the app you'd write your own, and people nearby would start answering them.
        </p>

        {/* Question picker */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-6">
          {sampleQuestions.map(q => {
            const selected = picked.includes(q)
            const slot = picked.indexOf(q)
            return (
              <button
                key={q}
                onClick={() => toggle(q)}
                aria-pressed={selected}
                className={`min-h-11 text-xs sm:text-sm font-medium rounded-full px-4 py-2.5 border transition-all duration-200 active:scale-95 ${
                  selected
                    ? 'bg-mint text-gray-900 border-mint shadow-md shadow-mint/25'
                    : done
                      ? 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700'
                      : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-mint hover:text-mint-ink'
                }`}
              >
                {selected && <span className="font-bold mr-1.5">{slot + 1}.</span>}
                {q}
              </button>
            )
          })}
        </div>

        {/* Slots + payoff */}
        <div className="flex items-center justify-center gap-2 mb-8" aria-hidden>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i < picked.length ? 'w-10 bg-mint' : 'w-6 bg-gray-200 dark:bg-gray-800'}`}
            />
          ))}
        </div>

        <p
          className={`text-base sm:text-lg font-medium leading-relaxed mb-8 transition-all duration-500 ${
            done ? 'text-gray-800 dark:text-gray-100 opacity-100' : 'text-gray-500 dark:text-gray-400 opacity-100'
          }`}
        >
          {done
            ? "Good three. People nearby are already answering questions like these — see what they'd say to yours."
            : `Pick ${3 - picked.length} more — or download and write your own.`}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Free to download — no credit card required
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          For support:{' '}
          <a href="mailto:chat@phcreations.co.za" className="inline-block py-[14px] -my-[14px] text-mint-ink hover:underline">
            chat@phcreations.co.za
          </a>
        </p>
      </div>
    </section>
  )
}
