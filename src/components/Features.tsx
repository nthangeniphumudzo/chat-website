import { useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '⚡',
    title: 'Speed Date',
    description:
      'The first screen you see isn\'t profiles — it\'s answers. People nearby read your three questions and wrote something back. Real words, in their voice, before you ever connect. That\'s your Dates tab. That\'s where Ch@t starts.',
  },
  {
    icon: '🔎',
    title: 'Browse',
    description:
      'When you\'re ready to explore, Browse shows who\'s nearby. The difference: their Speed Date questions are right there on the card. You already know what they care about before you decide. Not just a face — context.',
  },
  {
    icon: '💬',
    title: 'Inbox',
    description:
      'After a mutual match — from Dates or Browse — your thread starts here. The first message isn\'t awkward because it isn\'t really the first thing. You already know something real about each other.',
  },
  {
    icon: '👤',
    title: 'You',
    description:
      'Your profile, your photos, your preferences — and verification that makes sure the person on the other side is exactly who they say they are. No surprises. No strangers pretending.',
  },
  {
    icon: '📍',
    title: 'Near you',
    description: 'Discovery radius that adjusts as you use it. Close enough to be real, wide enough to find the right person — not just the nearest one.',
  },
  {
    icon: '🔄',
    title: 'Undo',
    description: 'Changed your mind on Browse? Step back and look again. Some people are worth a second read.',
  },
]

function ScreenshotFlagship() {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 relative mb-6 sm:mb-8 rounded-2xl overflow-hidden border-2 border-mint/35 dark:border-mint/25 bg-gradient-to-br from-mint/[0.12] via-white to-white dark:from-mint/[0.08] dark:via-[#121212] dark:to-[#0a0a0a] shadow-lg shadow-mint/5 dark:shadow-black/40"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(52,211,153,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(52,211,153,0.12),transparent)]" />
      <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
        <div className="flex-shrink-0 mb-6 lg:mb-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-mint mb-3">Flagship privacy</p>
          <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl bg-mint/15 dark:bg-mint/10 border border-mint/25 flex items-center justify-center text-4xl sm:text-[2.75rem] shadow-inner shadow-mint/10">
            📵
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-gray-50 tracking-tight leading-tight mb-3 sm:mb-4">
            What you share here<br />
            <span className="text-mint">stays here.</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            Every screen in the app is covered. If someone tries to screenshot or record — your messages, photos, anything — what they get is <span className="font-medium text-gray-800 dark:text-gray-200">a blank or black frame</span>. Not your words. Not your face. Nothing. We built it that way on purpose.
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: Feature) {
  const revealRef = useScrollReveal<HTMLDivElement>()
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width   // 0..1
    const ny = (e.clientY - rect.top) / rect.height    // 0..1
    setTilt({ x: (ny - 0.5) * -20, y: (nx - 0.5) * 26 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div
      ref={revealRef}
      className="opacity-0 translate-y-8 transition-all duration-700"
      style={{ perspective: '500px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="group relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-7 hover:border-mint/40 dark:hover:border-mint/30 overflow-hidden h-full"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Dynamic glare that tracks cursor */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${50 + tilt.y * 2.5}% ${50 - tilt.x * 2.5}%, rgba(0,230,160,0.07), transparent 65%)` }}
        />

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
    </div>
  )
}

export default function Features() {
  const headingRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="features" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto">
      <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-10 sm:mb-14">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">
          Inside the app
        </p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 sm:mb-5">
          Four tabs. One idea:<br />
          <span className="text-mint">know before you match.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
          Everything in Chat is built so you arrive at a conversation knowing something real. Plus — <span className="text-gray-700 dark:text-gray-200 font-medium">every screen is protected</span>: screenshots and recordings show a blank or black frame, not your chats or photos. What happens here stays here.
        </p>
      </div>

      <ScreenshotFlagship />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(f => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  )
}
