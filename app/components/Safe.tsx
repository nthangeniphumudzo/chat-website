import { IconBadge, type IconName } from './Icon'

/* What keeps people safe, each with the symbol people already read as that
   promise: the badge for verified, the lock for kept private, the closed eye
   for unseen. */
const PROMISES: { icon: IconName; label: string }[] = [
  { icon: 'badge-check', label: 'Every profile verified' },
  { icon: 'lock', label: 'Chats can’t be screenshotted' },
  { icon: 'eye-off', label: 'Unseen by people you block' },
]

/**
 * Safety, as the feeling it buys rather than a list of protections. Every
 * claim here is one the app keeps (verified profiles, screenshot
 * blocking, silent blocking) — the FAQ has the plain-spoken version.
 */
export default function Safe() {
  return (
    <section id="safe" data-track-section="safe" className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f9fb_0%,#ecfaf4_45%,#f7f9fb_100%)] px-5 py-20 text-center dark:bg-none dark:bg-[#080808] sm:px-8 sm:py-28">
      <div className="soft-glow pointer-events-none absolute -z-10 top-0 left-1/2 h-[560px] w-[760px] max-w-[150vw] -translate-x-1/2 [--glow-alpha:0.22] dark:[--glow-alpha:0.16]" />
      <div className="mx-auto max-w-3xl">
        <div className="mb-6"><IconBadge name="shield-check" size="lg" /></div>
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-mint-ink">A safe place to start</p>
        <h2 className="poster-h font-syne mb-6 text-4xl sm:text-6xl">
          Open your heart. <span className="text-mint-ink">We’ll guard the rest.</span>
        </h2>
        <ul className="mx-auto mb-8 grid max-w-sm grid-cols-1 gap-3 text-left sm:max-w-none sm:grid-cols-3">
          {PROMISES.map(({ icon, label }) => (
            <li key={label} className="glass flex items-center gap-3 rounded-2xl p-4">
              <IconBadge name={icon} size="sm" />
              <span className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">{label}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
          So you can stop being careful — and start being yourself.
        </p>
      </div>
    </section>
  )
}
