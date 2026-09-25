import { useState } from 'react'

/* The worries that make someone leave to "look it up later", answered here so
   they don't have to. First four are the brief's objections, in its order. */
const faqs = [
  {
    q: 'Do I have to video call or chat live?',
    a: 'No. A SpeedDate is written: people answer your three questions in their own time, and you read the answers when you’re ready. No camera, no awkward silences.',
  },
  {
    q: 'Is it safe?',
    a: 'Every profile is verified and must show a real face. Explicit photos can’t be sent, screenshots come out blank, and you can block anyone — silently. They’re never notified.',
  },
  {
    q: 'Is Ch@t really free?',
    a: 'Yes — free to download and free to meet people. Premium adds extras, but the core works without it.',
  },
  {
    q: 'Will there be people near me?',
    a: 'Ch@t is local by design — you meet real people in your city, not across the country.',
  },
  {
    q: 'How is this different from swiping apps?',
    a: 'They start with a face. Ch@t starts with your questions — so the first message is never a cold "hey".',
  },
  {
    q: 'Who can see my profile?',
    a: 'You decide. Control your visibility, and block anyone from your contacts — silently.',
  },
]

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="glass rounded-2xl overflow-hidden transition-colors duration-200 hover:border-mint/30">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
      >
        <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 tracking-tight">
          {q}
        </span>
        <span
          aria-hidden
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
            open ? 'rotate-45 border-mint text-mint-ink' : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'
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
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden py-16 sm:py-24 px-5 sm:px-8 max-w-3xl mx-auto">
      <div className="soft-glow pointer-events-none absolute -z-10 -top-20 left-1/2 h-[560px] w-[760px] max-w-[150vw] -translate-x-1/2 [--glow-alpha:0.26] dark:[--glow-alpha:0.14]" />
      <div className="mb-8 sm:mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-mint-ink mb-4">Before you ask</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
          Fair questions, <span className="text-mint-ink">straight answers.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((f, i) => (
          <FaqItem key={f.q} {...f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </div>
    </section>
  )
}
