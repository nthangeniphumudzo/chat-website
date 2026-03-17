import { useScrollReveal } from '../hooks/useScrollReveal'
// Instant messaging feature: img_chat / img_chat_light = conversation screen (the one with messages; keep this for “Real conversations”).
import { img_chat, img_chats_list, img_chat_light, img_chats_list_light } from '../assets/images'

const chatFeatures = [
  'Real-time text, voice & photo messages',
  'Reply to specific messages in thread',
  'React with emojis to messages',
  'Read receipts so you know they saw it',
]

const listFeature = 'All conversations in one organised list.'

interface MessagingSectionProps {
  isDark: boolean
}

export default function MessagingSection({ isDark }: MessagingSectionProps) {
  const textRef = useScrollReveal<HTMLDivElement>()
  const chatRef = useScrollReveal<HTMLDivElement>()
  const listRef = useScrollReveal<HTMLDivElement>()
  const phoneClass = `rounded-[32px] overflow-hidden border ${isDark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-black/10 shadow-xl shadow-black/10'}`

  return (
    <section id="messaging" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-24 max-w-7xl mx-auto">
      <div ref={textRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Premium Messaging</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
          When you match,<br />
          <span className="text-mint">really</span> connect
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-2xl">
          Premium unlocks real-time messaging that goes beyond text — voice notes, photo sharing, reactions, and replies.
        </p>
      </div>

      {/* Topic 1: Chat — picture directly under this topic */}
      <div ref={chatRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-14 sm:mb-20">
        <h3 className="font-syne font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
          Real conversations
        </h3>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800 mb-6 max-w-2xl">
          {chatFeatures.map(item => (
            <li key={item} className="flex items-start gap-3 py-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-mint mt-0.5 flex-shrink-0">✦</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex justify-center lg:justify-start">
          <div className={`w-52 sm:w-56 lg:w-48 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
            <img src={isDark ? img_chat : img_chat_light} alt="Chat screen" className="w-full block" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Topic 2: Chats list — picture directly under this topic */}
      <div ref={listRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <h3 className="font-syne font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
          All in one place
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">
          {listFeature}
        </p>
        <div className="flex justify-center lg:justify-start">
          <div className={`w-52 sm:w-56 lg:w-48 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
            <img src={isDark ? img_chats_list : img_chats_list_light} alt="Chats list" className="w-full block" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
