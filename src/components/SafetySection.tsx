import { useScrollReveal } from '../hooks/useScrollReveal'

interface SafetyCard {
  icon: string
  title: string
  description: string
}

const safetyCards: SafetyCard[] = [
  {
    icon: '🛡️',
    title: 'Safe Guard',
    description: 'Block or report anyone directly from their profile. We keep it confidential — they won\'t know.',
  },
  {
    icon: '🔒',
    title: 'Privacy Settings',
    description: 'Control who sees your age, distance, and profile. Enable screenshot protection for extra peace of mind.',
  },
  {
    icon: '✅',
    title: 'Everyone Verified',
    description: 'Every user is verified — no one can use Chat without passing verification. When you see Rihanna on Chat, you\'re talking to Rihanna. No catfishing, no fake profiles.',
  },
  {
    icon: '🆘',
    title: 'Safety Center',
    description: 'Tips, resources, and direct access to support — all in one place whenever you need it.',
  },
]

function SafetyCard({ icon, title, description }: SafetyCard) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 hover:border-mint/30"
    >
      <div className="w-11 h-11 rounded-xl bg-mint/5 border border-mint/10 flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-syne font-bold text-sm text-gray-900 dark:text-gray-100 mb-1.5">
          {title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function SafetySection() {
  const headingRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="safety" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto">
      <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-10 sm:mb-12">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Privacy &amp; Safety</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 sm:mb-5">
          Your safety is <span className="text-mint">built in</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
          Every user is verified before they can use Chat — so the person you're talking to is always who they say they are. Plus full control over who sees you, who can contact you, and how to report anything that doesn't feel right.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {safetyCards.map(card => (
          <SafetyCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  )
}
