import { useScrollReveal } from '../hooks/useScrollReveal'
import { img_chat, img_chats_list, img_chat_light, img_chats_list_light } from '../assets/images'

const messagingFeatures = [
  'Real-time text, voice & photo messages',
  'Reply to specific messages in thread',
  'React with emojis to messages',
  'Read receipts so you know they saw it',
  'All conversations in one organised list',
]

interface MessagingSectionProps {
  isDark: boolean
}

export default function MessagingSection({ isDark }: MessagingSectionProps) {
  const textRef = useScrollReveal<HTMLDivElement>()
  const phonesRef = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="messaging"
      className="py-16 sm:py-24 px-5 sm:px-8 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center"
    >
      {/* Text */}
      <div ref={textRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Premium Messaging</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-5 sm:mb-6">
          When you match,<br />
          <span className="text-mint">really</span> connect
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
          Premium unlocks real-time messaging that goes beyond text — voice notes, photo sharing, reactions, and replies. Everything you need for a genuine conversation.
        </p>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {messagingFeatures.map(item => (
            <li key={item} className="flex items-start gap-3 py-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-mint mt-0.5 flex-shrink-0">✦</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Phones — single centered on mobile, duo on desktop */}
      <div ref={phonesRef} className="opacity-0 translate-y-8 transition-all duration-700">
        {/* Mobile: one phone */}
        <div className="flex lg:hidden justify-center">
          <div className={`w-52 rounded-[32px] overflow-hidden border ${isDark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-black/10 shadow-xl shadow-black/10'}`}>
            <img src={isDark ? img_chat : img_chat_light} alt="Chat screen" className="w-full block" loading="lazy" />
          </div>
        </div>
        {/* Desktop: duo */}
        <div className="hidden lg:flex justify-center gap-4 items-start">
          <div className={`w-44 rounded-[32px] overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${isDark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-black/10 shadow-xl shadow-black/10'}`}>
            <img src={isDark ? img_chat : img_chat_light} alt="Chat screen" className="w-full block" loading="lazy" />
          </div>
          <div className={`w-44 rounded-[32px] overflow-hidden border mt-10 transition-all duration-300 hover:-translate-y-2 ${isDark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-black/10 shadow-xl shadow-black/10'}`}>
            <img src={isDark ? img_chats_list : img_chats_list_light} alt="Chats list" className="w-full block" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
