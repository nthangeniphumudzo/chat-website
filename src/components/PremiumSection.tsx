import { useScrollReveal } from '../hooks/useScrollReveal'
import { img_premium } from '../assets/images'

const premiumFeatures = [
  'Instant messaging (text, voice, photo)',
  'Same plan rules for Speed Date and Browse when you hit a limit',
  '1 Boost per week (when Boost is enabled)',
  'Roses and plan extras where the product includes them',
  'Advanced filters on Browse',
  'Control your profile visibility',
  'Unlimited boost purchases',
]

interface PremiumSectionProps {
  isDark: boolean
}

export default function PremiumSection({ isDark }: PremiumSectionProps) {
  const textRef = useScrollReveal<HTMLDivElement>()
  const cardRef = useScrollReveal<HTMLDivElement>()

  return (
    <div
      id="premium"
      className="bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-[#0d0d0d] dark:to-[#0a1a12] border-y border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left */}
        <div ref={textRef} className="opacity-0 translate-y-8 transition-all duration-700">
          <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Go Premium</p>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-5 sm:mb-6">
            More room to<br /><span className="text-mint">move first</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-md mb-6 sm:mb-8">
            Chat is free to try. Premium unlocks the full stack — messaging, filters, Boost when you use it, and the extra headroom on Speed Date and Browse when your plan says so.
          </p>
          {/* Phone — hidden on mobile to save space, shown on lg */}
          <div className="hidden lg:inline-block">
            <div className={`w-44 rounded-[32px] overflow-hidden border ${isDark ? 'border-white/10 shadow-2xl shadow-black/50' : 'border-black/10 shadow-xl shadow-black/10'}`}>
              <img src={img_premium} alt="Premium profile" className="w-full block" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Right: premium card */}
        <div ref={cardRef} className="opacity-0 translate-y-8 transition-all duration-700">
          <div className="relative rounded-2xl border border-mint/20 bg-white/60 dark:bg-mint/[0.03] backdrop-blur-sm p-6 sm:p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-mint/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <span className="inline-block bg-mint text-gray-900 font-syne font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 sm:mb-5">
                Premium
              </span>
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl tracking-tight mb-1 text-gray-900 dark:text-white">
                Pay As You Go
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 sm:mb-6">Week Package</p>
              <ul className="divide-y divide-gray-100 dark:divide-mint/10">
                {premiumFeatures.map(item => (
                  <li key={item} className="flex items-center gap-3 py-2.5 sm:py-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className="mt-6 sm:mt-8 w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-mint text-gray-900 font-syne font-bold text-sm active:scale-95 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 transition-all duration-200"
              >
                Download
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
