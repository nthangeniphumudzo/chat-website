import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'Is Ch@t really free?',
    a: 'Yes — free to download and free to meet people. Premium adds extras, but the core works without it.',
  },
  {
    q: 'Are the profiles real people?',
    a: 'Every profile is verified before it can use the app. No bots, no catfishing, no old photos.',
  },
  {
    q: 'Can someone screenshot my chats or photos?',
    a: 'No. Every screen is protected — captures come out blank. Nothing reaches their camera roll.',
  },
  {
    q: 'How is this different from swiping apps?',
    a: 'They start with a face. Ch@t starts with your questions — so the first message is never a cold "hey".',
  },
  {
    q: 'Who can see my profile?',
    a: 'You decide. Control your visibility, and block anyone from your contacts — silently.',
  },
  {
    q: 'Is it only for people near me?',
    a: 'Yes — local by design. Real people in your city, not across the country.',
  },
]

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#101010] overflow-hidden transition-colors duration-200 hover:border-mint/30">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
      >
        <span className="font-syne font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 tracking-tight">
          {q}
        </span>
        <span
          aria-hidden
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
            open ? 'rotate-45 border-mint text-mint bg-mint/10' : 'border-gray-300 dark:border-gray-700 text-gray-400'
          }`}
        >
          +
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const listRef = useScrollReveal<HTMLDivElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-16 sm:py-24 px-5 sm:px-8 max-w-3xl mx-auto">
      <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-8 sm:mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Before you ask</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
          Fair questions, <span className="text-mint">straight answers.</span>
        </h2>
      </div>

      <div ref={listRef} className="opacity-0 translate-y-8 transition-all duration-700 flex flex-col gap-3">
        {faqs.map((f, i) => (
          <FaqItem key={f.q} {...f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </div>
    </section>
  )
}
