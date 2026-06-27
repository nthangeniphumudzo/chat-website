import { useScrollReveal } from '../hooks/useScrollReveal'

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
