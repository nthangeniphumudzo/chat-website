import { useState } from 'react'
import { IconBadge, type IconName } from './Icon'

/* The worries that make someone leave to "look it up later", answered here so
   they don't have to. This is the one place on the page that gets specific
   about the app; everywhere else tells the story. */
/* `id` is what the behaviour tracker records for a tap (faq:<id>), so the
   question's wording can change without breaking its history. */
const faqs: { id: string; icon: IconName; q: string; a: string }[] = [
  {
    id: 'safe',
    icon: 'shield-check',
    q: 'Is it safe?',
    a: 'Every profile is verified and must show a real face, and only phone-verified members can see you. Your exact location is never shared — people see your city and roughly how far away you are, never where you are. Explicit photos can’t be sent, screenshots come out blank, and you can report anyone or block them silently — they’re never notified.',
  },
  {
    id: 'different',
    icon: 'sparkles',
    q: 'I’ve tried dating apps before. Why would this be different?',
    a: 'Most apps start with a face and leave the rest to luck. On Ch@t you get to know how someone thinks before you decide — so when you start talking, you already have a reason to.',
  },
  {
    id: 'first-message',
    icon: 'message',
    q: 'What if I’m not good at first messages?',
    a: 'You won’t need one. Every conversation on Ch@t starts from something they’ve already told you, so it’s never a cold “hey”.',
  },
  {
    id: 'near-me',
    icon: 'map-pin',
    q: 'Will there be people near me?',
    a: 'Ch@t is local by design — you meet real people in your city, not across the country. And your exact location stays private: people only see your city and a rough distance.',
  },
  {
    id: 'free',
    icon: 'gift',
    q: 'Is Ch@t really free?',
    a: 'Yes — free to download and free to meet people. Premium adds extras, but you never need it to find someone.',
  },
]

function FaqItem({ id, icon, q, a, open, onToggle }: { id: string; icon: IconName; q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="glass rounded-2xl overflow-hidden transition-colors duration-200 hover:border-mint/30">
      <button
        onClick={onToggle}
        data-track={`faq:${id}`}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
      >
        <span className="flex items-center gap-3 font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 tracking-tight">
          <IconBadge name={icon} size="sm" />
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
          <p className="pl-[4.25rem] pr-5 sm:pl-[4.5rem] sm:pr-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" data-track-section="faq" className="relative overflow-hidden py-16 sm:py-24 px-5 sm:px-8 max-w-3xl mx-auto">
      <div className="soft-glow pointer-events-none absolute -z-10 -top-20 left-1/2 h-[560px] w-[760px] max-w-[150vw] -translate-x-1/2 [--glow-alpha:0.26] dark:[--glow-alpha:0.14]" />
      <div className="mb-8 sm:mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-mint-ink mb-4">Before you ask</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
          Fair questions, <span className="text-mint-ink">straight answers.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((f, i) => (
          <FaqItem key={f.id} {...f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </div>
    </section>
  )
}
