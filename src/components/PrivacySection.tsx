import { useScrollReveal } from '../hooks/useScrollReveal'
import { img_chat, img_chat_light, img_safety, img_safety_light } from '../assets/images'
import blockContactsListDark from '../assets/privacy/block-contacts-list-dark.png'
import blockContactsListLight from '../assets/privacy/block-contacts-list-light.png'

interface PrivacySectionProps {
  isDark: boolean
}

export default function PrivacySection({ isDark }: PrivacySectionProps) {
  const textRef = useScrollReveal<HTMLDivElement>()
  const screenshotProtectionRef = useScrollReveal<HTMLDivElement>()
  const introRef = useScrollReveal<HTMLDivElement>()
  const phonesRef = useScrollReveal<HTMLDivElement>()
  const blockListRef = useScrollReveal<HTMLDivElement>()

  const privacyHubImg = isDark ? img_safety : img_safety_light
  const blockListImg = isDark ? blockContactsListDark : blockContactsListLight
  const chatImg = isDark ? img_chat : img_chat_light

  const phoneClass = `rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`

  return (
    <section id="privacy" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-24 max-w-7xl mx-auto">
      <div ref={textRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-6 sm:mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-mint">Privacy &amp; peace of mind</p>
      </div>

      {/* Screenshot protection — directly under section label */}
      <div ref={screenshotProtectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-14 sm:mb-20 pb-14 sm:pb-16 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-syne font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
          Protection on every screen
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2 max-w-2xl">
          While you use Ch@t, you see the full experience — messages, photos, and context. If someone tries to capture a screenshot or screen recording of <span className="text-gray-700 dark:text-gray-300 font-medium">any</span> screen, that capture comes out <span className="text-gray-700 dark:text-gray-300 font-medium">blank or black</span>, so your private moments are not saved to their camera roll.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
          We built it that way on purpose: your privacy is not an afterthought.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 lg:gap-12 max-w-md sm:max-w-none mx-auto lg:mx-0 lg:max-w-3xl">
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-xs font-medium uppercase tracking-widest text-mint mb-3">In the app</p>
            <div className={`w-52 sm:w-60 lg:w-64 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
              <img
                src={chatImg}
                alt="Chat conversation as you see it while using the app"
                className="w-full block"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
              What a screenshot captures
            </p>
            <div className={`w-52 sm:w-60 lg:w-64 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
              <div
                className="w-full bg-black block aspect-[472/1024]"
                role="img"
                aria-label="Any screen in the app: screenshots and recordings show a blank or black frame instead of your content"
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={introRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16">
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
          Stay off their radar.<br />
          <span className="text-mint">Block exes, stalkers, anyone.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-2xl">
          Pick people from your contacts who shouldn't have access to your profile. Once blocked, they won't show up in Browse and you won't show up in theirs.
        </p>
      </div>

      {/* Topic 1: You → Privacy & Safety — same screens as the in-app tour (screenshots/safety-*) */}
      <div ref={phonesRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-14 sm:mb-20">
        <h3 className="font-syne font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
          You → Privacy &amp; Safety
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">
          From the You tab, open Privacy &amp; Safety to manage your block list, who can see you, and safety tools in one place.
        </p>
        <div className="flex justify-center lg:justify-start">
          <div className={`w-52 sm:w-60 lg:w-64 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
            <img
              src={privacyHubImg}
              alt="Privacy and safety settings on the You tab"
              className="w-full block"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Topic 2: Your block list — picture directly under this topic */}
      <div ref={blockListRef} className="opacity-0 translate-y-8 transition-all duration-700">
        <h3 className="font-syne font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
          Your block list
        </h3>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800 mb-6 max-w-2xl">
          <li className="flex items-start gap-3 py-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-mint mt-0.5 flex-shrink-0">✦</span>
            Block or unblock anytime — they won't be notified
          </li>
          <li className="flex items-start gap-3 py-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-mint mt-0.5 flex-shrink-0">✦</span>
            Search by name or number to find contacts quickly
          </li>
        </ul>
        <div className="flex justify-center lg:justify-start">
          <div className={`w-52 sm:w-60 lg:w-64 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
            <img src={blockListImg} alt="Your block list — blocked contacts" className="w-full block" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
