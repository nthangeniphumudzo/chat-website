import { useEffect, useRef, useState } from 'react'
import avatar2 from '../assets/avatars/IMG_3185.webp'

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
 * Lives on its own story screen, not the hero — its motion needs room to breathe.
 */
export default function SpeedDateDemo() {
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
