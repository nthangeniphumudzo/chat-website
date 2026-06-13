import { useScrollReveal } from '../hooks/useScrollReveal'
import { img_chat, img_chats_list, img_chat_light, img_chats_list_light } from '../assets/images'

interface MessagingSectionProps {
  isDark: boolean
}

export default function MessagingSection({ isDark }: MessagingSectionProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const phone1Ref = useScrollReveal<HTMLDivElement>()
  const phone2Ref = useScrollReveal<HTMLDivElement>()

  const phoneClass = `w-full rounded-[38px] overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 ${
    isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'
  }`

  return (
    <section id="messaging" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-24 max-w-7xl mx-auto">

      <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16 text-center lg:text-left">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">When you both match</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
          The conversation starts<br />
          <span className="text-mint">where most never do.</span>
        </h2>
      </div>

      {/* Two phones — the star of the section */}
      <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:gap-12 max-w-xs sm:max-w-md lg:max-w-2xl mx-auto lg:mx-0">

        <div ref={phone1Ref} className="opacity-0 translate-y-8 transition-all duration-700">
          <div className={phoneClass}>
            <img src={isDark ? img_chat : img_chat_light} alt="Chat screen" className="w-full block" loading="lazy" />
          </div>
          <p className="mt-3 sm:mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
            A conversation with somewhere to go
          </p>
        </div>

        <div ref={phone2Ref} className="opacity-0 translate-y-8 transition-all duration-700 mt-8 sm:mt-12">
          <div className={phoneClass}>
            <img src={isDark ? img_chats_list : img_chats_list_light} alt="Chats list" className="w-full block" loading="lazy" />
          </div>
          <p className="mt-3 sm:mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
            Everyone you matched with, in one place
          </p>
        </div>

      </div>
    </section>
  )
}
