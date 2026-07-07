import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'Is Ch@t really free?',
    a: 'Yes — free to download and free to meet people. No credit card, no trial, no ads. Premium exists for extras like advanced filters and Boost, but the core experience works without it.',
  },
  {
    q: 'Are the profiles real people?',
    a: 'Every single profile passes verification before it can use the app. The face on the card is the person you\'ll talk to — no bots, no catfishing, no five-year-old photos.',
  },
  {
    q: 'Can someone screenshot my chats or photos?',
    a: 'No. Every screen in the app is protected — screenshots and screen recordings come out blank or black. Your words and photos never end up in someone\'s camera roll.',
  },
  {
    q: 'How is this different from swiping apps?',
    a: 'Other apps start with a face; Ch@t starts with your three questions. People answer them in their own words before you ever match, so the first message is never a cold "hey".',
  },
  {
    q: 'Who can see my profile?',
    a: 'You decide. Control who sees your age, distance, and profile — and block anyone straight from your contacts. Blocked people never see you, and they\'re never notified.',
  },
  {
    q: 'Is it only for people near me?',
    a: 'Discovery is local by design — real people in your city, not across the country. Your radius adjusts as you use it: close enough to be real, wide enough to find the right person.',
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
