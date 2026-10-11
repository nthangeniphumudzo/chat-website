import { useEffect, useState } from 'react'
import Sparkle from './Sparkle'

/**
 * The floating card that points at the Relationship Advisor.
 *
 * It takes the place the download card used to hold — bottom of the screen, in
 * thumb reach — because that spot is what gets noticed, and the new thing is
 * what needs noticing now. The download button lives in the header at every
 * width, so the two never compete.
 *
 * The sparkle in the corner is the only claim made about how the advisor
 * works. The words stay on what the visitor gets.
 *
 * Shown by scroll position alone, like the card before it: out of the way in
 * the hero, back for the rest of the page. There is no dismiss — it is the
 * page's one introduction to a space most visitors don't know exists yet.
 */
export default function AdvisorPromo() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        // Only once the hero has scrolled *up* past the top — not while it is
        // still on screen.
        setShow(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0)
      }
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <div
      inert={!show}
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-[130%]'
      }`}
    >
      <div className="relative mx-auto max-w-sm lg:mr-6 lg:ml-auto">
        <a
          href="/advisor"
          className="block w-full cursor-pointer rounded-[22px] bg-[#ededf0]/95 p-3 pl-4 text-gray-900 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.45),0_4px_12px_-6px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-transform duration-150 active:scale-[0.985] dark:bg-[#2c2c2e]/95 dark:text-white dark:shadow-[0_20px_44px_-14px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.07)]"
        >
          <span className="flex w-full items-center gap-3">
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-mint-ink">
                New
              </span>
              <span className="mt-0.5 block truncate text-[17px] font-semibold leading-tight">Relationship advisor</span>
              <span className="block truncate text-[13px] leading-tight text-gray-500 dark:text-gray-400">
                Talk it through, any time
              </span>
            </span>

            <span className="flex-shrink-0 rounded-full bg-mint px-5 py-1.5 text-[17px] font-semibold text-gray-900">
              Try it
            </span>
          </span>
        </a>

        {/* The corner star: what it is, without the page having to say it. */}
        <Sparkle className="pointer-events-none absolute -left-1 -top-1.5 h-6 w-6 text-mint drop-shadow-[0_2px_6px_rgba(0,230,160,0.55)]" />
      </div>
    </div>
  )
}
