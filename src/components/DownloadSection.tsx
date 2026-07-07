import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import StoreBadges from './StoreBadges'

const sampleQuestions = [
  "What's a belief you've changed your mind about?",
  'Early mornings or late nights?',
  "What's something small that makes your day?",
  'What would you do with a free year?',
  "What's a green flag people overlook?",
  'What are you unreasonably good at?',
]

export default function DownloadSection() {
  const ref = useScrollReveal<HTMLDivElement>()
  const [picked, setPicked] = useState<string[]>([])
  const done = picked.length === 3

  const toggle = (q: string) => {
    setPicked(prev =>
      prev.includes(q) ? prev.filter(p => p !== q) : prev.length < 3 ? [...prev, q] : prev
    )
  }

  return (
    <section id="download" className="py-20 sm:py-28 px-5 sm:px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-mint/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 relative z-10 max-w-2xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">One last thing</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
          What would your
          <br />
          <span className="text-mint">three questions be?</span>
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
                className={`text-xs sm:text-sm font-medium rounded-full px-4 py-2.5 border transition-all duration-200 active:scale-95 ${
                  selected
                    ? 'bg-mint text-gray-900 border-mint shadow-md shadow-mint/25'
                    : done
                      ? 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700'
                      : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-mint hover:text-mint'
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
            done ? 'text-gray-800 dark:text-gray-100 opacity-100' : 'text-gray-500 dark:text-gray-400 opacity-80'
          }`}
        >
          {done
            ? "Good three. People nearby are already answering questions like these — see what they'd say to yours."
            : `Pick ${3 - picked.length} more — or download and write your own.`}
        </p>

        <div className={`inline-block transition-all duration-500 ${done ? 'scale-105' : ''}`}>
          <div className={done ? 'rounded-3xl ring-2 ring-mint/50 ring-offset-4 ring-offset-white dark:ring-offset-[#050505] p-1' : 'p-1'}>
            <StoreBadges placement="final_cta" />
          </div>
        </div>

        <p className="mt-5 text-xs text-gray-400 dark:text-gray-600 font-medium">
          Free to download — no credit card required
        </p>
        <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
          For support:{' '}
          <a href="mailto:chat@phcreations.com" className="text-mint hover:underline">
            chat@phcreations.com
          </a>
        </p>
      </div>
    </section>
  )
}
