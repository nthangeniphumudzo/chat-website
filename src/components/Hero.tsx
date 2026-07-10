import { useEffect, useRef, useState } from 'react'
import StoreBadges from './StoreBadges'
import avatar1 from '../assets/avatars/IMG_3097.jpg'
import avatar2 from '../assets/avatars/IMG_3185.jpg'
import avatar3 from '../assets/avatars/4a115dd1-ea95-4e48-b8f6-d53972ced8de.jpg'
import avatar4 from '../assets/avatars/86f5a1dc-87c8-40eb-bc2e-97445b708ee3.jpg'

const conversations = [
  {
    question: "What's something you'd never compromise on?",
    answer: 'My Sunday hikes. Non-negotiable ⛰️',
  },
  {
    question: 'Ambition or peace — which one wins?',
    answer: 'Peace. Took me years to say that honestly.',
  },
  {
    question: 'What made you laugh this week?',
    answer: 'My gran discovering voice notes 😂',
  },
]

type Phase = 'typing' | 'thinking' | 'answered'

/**
 * Live demo of a Speed Date exchange: the question types itself out,
 * a typing indicator appears, then the answer pops in — then the next pair.
 */
function PhoneDemo() {
  const [pair, setPair] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const timers = useRef<number[]>([])

  useEffect(() => {
    const question = conversations[pair].question
    setTyped('')
    setPhase('typing')

    let i = 0
    const typeInterval = window.setInterval(() => {
      i++
      setTyped(question.slice(0, i))
      if (i >= question.length) {
        window.clearInterval(typeInterval)
        timers.current.push(window.setTimeout(() => setPhase('thinking'), 400))
        timers.current.push(window.setTimeout(() => setPhase('answered'), 1600))
        timers.current.push(
          window.setTimeout(() => setPair(p => (p + 1) % conversations.length), 4600)
        )
      }
    }, 34)

    return () => {
      window.clearInterval(typeInterval)
      timers.current.forEach(t => window.clearTimeout(t))
      timers.current = []
    }
  }, [pair])

  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* Glow behind the phone */}
      <div className="absolute inset-0 -m-8 bg-mint/15 dark:bg-mint/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative rounded-[38px] border-2 border-black/10 dark:border-white/10 bg-white dark:bg-[#0c0c0c] phone-shadow-light dark:phone-shadow overflow-hidden">
        {/* Phone status bar */}
        <div className="flex items-center justify-center pt-3 pb-2">
          <div className="w-20 h-[22px] rounded-full bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800" />
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100 dark:border-gray-800/80">
          <div>
            <p className="font-syne font-extrabold text-base text-gray-900 dark:text-white leading-none">Speed Date</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Question 1 of 3</p>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-mint bg-mint/10 border border-mint/20 rounded-full px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse-dot" />
            Verified
          </span>
        </div>

        {/* Conversation area — fixed height so the frame never jumps */}
        <div className="px-4 py-5 h-[240px] sm:h-[260px] flex flex-col gap-3">
          {/* Your question */}
          <div className="self-end max-w-[85%] rounded-2xl rounded-br-md bg-mint text-gray-900 px-4 py-2.5 text-[13px] leading-snug font-medium">
            {typed}
            {phase === 'typing' && <span className="animate-cursor-blink">|</span>}
          </div>
          <p className="self-end text-[9px] uppercase tracking-widest text-gray-400 dark:text-gray-600 -mt-1.5">
            Your question
          </p>

          {/* Their side */}
          {phase === 'thinking' && (
            <div className="self-start flex items-center gap-2 bubble-in">
              <img src={avatar2} alt="" className="w-7 h-7 rounded-full object-cover" />
              <div className="rounded-2xl rounded-bl-md bg-gray-100 dark:bg-gray-800 px-4 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse-dot [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse-dot [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          {phase === 'answered' && (
            <>
              <div className="self-start flex items-end gap-2 bubble-in max-w-[85%]">
                <img src={avatar2} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                <div className="rounded-2xl rounded-bl-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-2.5 text-[13px] leading-snug">
                  {conversations[pair].answer}
                </div>
              </div>
              <p className="self-start text-[9px] uppercase tracking-widest text-gray-400 dark:text-gray-600 -mt-1.5 ml-9">
                Their answer — before you ever match
              </p>
            </>
          )}
        </div>

        {/* Decorative action row */}
        <div className="px-4 pb-5 flex gap-3">
          <div className="flex-1 rounded-full border border-gray-200 dark:border-gray-700 text-center py-2.5 text-xs font-semibold text-gray-400 dark:text-gray-500">
            Pass
          </div>
          <div
            className={`flex-1 rounded-full bg-mint text-gray-900 text-center py-2.5 text-xs font-bold transition-transform duration-300 ${phase === 'answered' ? 'scale-105 shadow-lg shadow-mint/30' : ''}`}
          >
            Show interest 💚
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialProof() {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-3">
      <div className="flex -space-x-2">
        {[avatar1, avatar2, avatar3, avatar4].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="App user"
            className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-[#050505]"
          />
        ))}
      </div>
      <div className="text-left">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 font-medium">4.8 on the App Store</span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">People nearby are already inside</p>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-mint/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copy + CTA */}
        <div className="text-center lg:text-left order-1">
          <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-5">
            Stop endless swiping.
            <br />
            <span className="text-mint">Start real conversations.</span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
            Get to know people through their answers before you ever match. Three questions. Honest conversations. Better connections.
          </p>

          <StoreBadges placement="hero" id="store-badges" className="lg:justify-start mb-4" />
          <p className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-xs font-medium text-gray-500 dark:text-gray-400 mb-8">
            <span>💚 Free to download</span>
            <span>🔒 Verified profiles</span>
            <span>💬 Personality before photos</span>
          </p>

          <SocialProof />
        </div>

        {/* Live demo */}
        <div className="order-2">
          <PhoneDemo />
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-5">
            ↑ This is how every Ch@t connection starts
          </p>
        </div>
      </div>
    </section>
  )
}
