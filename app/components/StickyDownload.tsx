import { useEffect, useState } from 'react'
import DownloadLink from './DownloadLink'

/**
 * A download bar pinned to the bottom of the screen on phones, in thumb reach.
 *
 * It stays out of the way while a full-size download button is already on
 * screen — the hero's at the top, the final one at the bottom — and slides in
 * everywhere between, so someone convinced halfway down never has to scroll to
 * act. Server-rendered hidden; it only needs to exist once the visitor scrolls.
 */
export default function StickyDownload() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const targets = ['hero-cta', 'download']
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0 || !('IntersectionObserver' in window)) return

    const hero = document.getElementById('hero-cta')
    const visible = new Set<Element>()
    let heroPassed = false
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
        // Only once the hero CTA has scrolled *up* past the top — not while
        // it's still below the fold on a short screen.
        if (e.target === hero) heroPassed = !e.isIntersecting && e.boundingClientRect.bottom <= 0
      }
      setShow(heroPassed && visible.size === 0)
    })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <div
      inert={!show}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 pt-3 backdrop-blur transition-transform duration-300 dark:border-gray-800 dark:bg-[#050505]/95 md:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm leading-tight">
          <span className="block font-semibold text-gray-900 dark:text-gray-100">Ch@t · the speed-dating app</span>
          <span className="text-gray-500 dark:text-gray-400">Free on iPhone and Android</span>
        </p>
        <DownloadLink
          placement="sticky"
          aria-label="Download Ch@t"
          className="inline-flex min-h-11 flex-shrink-0 items-center rounded-full bg-mint px-5 text-sm font-semibold text-gray-900 active:scale-95"
        >
          Download
        </DownloadLink>
      </div>
    </div>
  )
}
