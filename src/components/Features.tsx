import { useScrollReveal } from '../hooks/useScrollReveal'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '🧭',
    title: 'Explore',
    description: 'Swipe through profiles one at a time. Like, pass, or send a compliment with a personal message to stand out.',
  },
  {
    icon: '📍',
    title: 'Location Discovery',
    description: 'Find people near you with a customisable radius. Expand automatically if you run low on profiles.',
  },
  {
    icon: '💌',
    title: 'Compliments',
    description: 'Send a personal note alongside your like. A mutual like and compliment creates an instant match.',
  },
  {
    icon: '❤️',
    title: 'Likes Tab',
    description: 'See everyone who liked you. Like back for a match, pass, or respond with your own compliment.',
  },
  {
    icon: '✨',
    title: 'Rich Profiles',
    description: 'Photos, bio, interests, lifestyle, religion, zodiac, and goals — everything to make a real first impression.',
  },
  {
    icon: '🔄',
    title: 'Undo',
    description: 'Changed your mind? Go back to the previous profile in Explore and give it another look.',
  },
]

function FeatureCard({ icon, title, description }: Feature) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 group relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-7 hover:-translate-y-1 hover:border-mint/40 dark:hover:border-mint/30 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-12 h-12 rounded-xl bg-mint/5 dark:bg-mint/5 border border-mint/10 flex items-center justify-center text-2xl mb-5">
        {icon}
      </div>
      <h3 className="font-syne font-bold text-base mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default function Features() {
  const headingRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="features" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto">
      <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-10 sm:mb-14">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">
          Everything you need
        </p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 sm:mb-5">
          Built for <span className="text-mint">real</span> connections
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
          Every feature is designed to help you find someone genuinely compatible — and keep things safe along the way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(f => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  )
}
