import { useScrollReveal } from '../hooks/useScrollReveal'
import profilePrivacyDark from '../assets/privacy/profile-privacy-dark.png'
import profilePrivacyLight from '../assets/privacy/profile-privacy-light.png'
import blockContactsListDark from '../assets/privacy/block-contacts-list-dark.png'
import blockContactsListLight from '../assets/privacy/block-contacts-list-light.png'

interface PrivacySectionProps {
  isDark: boolean
}

export default function PrivacySection({ isDark }: PrivacySectionProps) {
  const textRef = useScrollReveal<HTMLDivElement>()
  const phonesRef = useScrollReveal<HTMLDivElement>()
  const blockListRef = useScrollReveal<HTMLDivElement>()

  const profileImg = isDark ? profilePrivacyDark : profilePrivacyLight
  const blockListImg = isDark ? blockContactsListDark : blockContactsListLight

  const phoneClass = `rounded-[32px] overflow-hidden border ${isDark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-black/10 shadow-xl shadow-black/10'}`

  return (
    <section id="privacy" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-24 max-w-7xl mx-auto">
      <div ref={textRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Privacy &amp; peace of mind</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
          Stay off their radar.<br />
          <span className="text-mint">Block exes, stalkers, anyone.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-2xl">
          Pick people from your contacts who shouldn't have access to your profile. Once blocked, they won't show up in your Explore and you won't show up in theirs.
        </p>
      </div>

      {/* Topic 1: Profile Privacy & Safety — picture directly under this topic */}
      <div ref={phonesRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-14 sm:mb-20">
        <h3 className="font-syne font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
          Profile → Privacy &amp; Safety
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl">
          Manage your block list, control who sees your profile, and access safety settings in one place.
        </p>
        <div className="flex justify-center lg:justify-start">
          <div className={`w-52 sm:w-56 lg:w-48 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
            <img src={profileImg} alt="Profile Privacy & Safety screen" className="w-full block" loading="lazy" />
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
          <div className={`w-52 sm:w-56 lg:w-48 ${phoneClass} transition-all duration-300 hover:-translate-y-2`}>
            <img src={blockListImg} alt="Your block list — blocked contacts" className="w-full block" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
