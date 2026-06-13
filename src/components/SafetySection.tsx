import { useScrollReveal } from '../hooks/useScrollReveal'

interface SafetyCard {
  icon: string
  title: string
  description: string
}

const safetyCards: SafetyCard[] = [
  {
    icon: '🛡️',
    title: 'Block or report silently',
    description: 'One tap, directly from someone\'s profile. We keep it confidential — they\'ll never know you reported them. Your peace of mind, without the confrontation.',
  },
  {
    icon: '🔒',
    title: 'You control who sees you',
    description:
      'Set who can see your age, distance, and profile. And remember — every screen is screenshot-protected. Whatever you share in Ch@t stays in Ch@t, not someone\'s camera roll.',
  },
  {
    icon: '✅',
    title: 'The person you see is the person you get.',
    description: 'Nobody uses Ch@t without passing verification. That face on the card? That\'s them. Not a photo from five years ago. Not a stranger. Them. Verified.',
  },
  {
    icon: '🆘',
    title: 'Safety is a tap away',
    description: 'Tips, resources, and direct access to real support — all inside the app. Because safety shouldn\'t feel buried.',
  },
]

function SafetyCard({ icon, title, description }: SafetyCard) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 hover:border-mint/30"
    >
      <div className="w-12 h-12 rounded-xl bg-mint/5 border border-mint/10 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-syne font-bold text-base text-gray-900 dark:text-gray-100 mb-1.5 tracking-tight">
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
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Safety &amp; trust</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 sm:mb-5">
          The person you're talking to<br />
          <span className="text-mint">is actually them.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
          No one can use Ch@t without passing verification first. The profile you're reading is real. The questions they wrote are theirs. You can control who sees you, report without confrontation, and every screenshot or recording across the whole app shows blank — so what you share stays yours.
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
