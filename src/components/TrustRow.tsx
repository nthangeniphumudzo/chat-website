import { useScrollReveal } from '../hooks/useScrollReveal'
import avatar1 from '../assets/avatars/IMG_3097.jpg'
import avatar2 from '../assets/avatars/IMG_3185.jpg'
import avatar3 from '../assets/avatars/4a115dd1-ea95-4e48-b8f6-d53972ced8de.jpg'
import avatar4 from '../assets/avatars/86f5a1dc-87c8-40eb-bc2e-97445b708ee3.jpg'

const items = [
  { icon: '🆓', title: 'Free to download', body: 'No credit card. No trial. No paywall to meet people.' },
  { icon: '✅', title: 'Verified profiles', body: 'Every profile goes through verification. No catfishing, no bots.' },
  { icon: '📵', title: 'Screenshot-protected', body: 'Everything you share is covered. Screenshots return a blank frame.' },
  { icon: '📍', title: 'People near you', body: 'Discovery is local. Real people in your city, not across the country.' },
]

export default function TrustRow() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8 border-t border-gray-100 dark:border-gray-800/60">
      <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 max-w-5xl mx-auto">
        {/* Social proof — earned by scrolling all the way here */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex -space-x-2">
            {[avatar1, avatar2, avatar3, avatar4].map((src, i) => (
              <img key={i} src={src} alt="App user" className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-[#050505]" />
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">People nearby are already inside</p>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-400 ml-1">4.8 on the App Store</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs font-medium uppercase tracking-widest text-mint mb-10">
          Before you ask
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-gray-50 dark:bg-[#0d0d0d] border border-gray-100 dark:border-gray-800">
              <span className="text-3xl">{icon}</span>
              <h3 className="font-syne font-bold text-gray-900 dark:text-white text-base">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
