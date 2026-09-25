import { useEffect, useState } from 'react'
import DownloadLink from './DownloadLink'
import { usePlatform } from '../hooks/usePlatform'
import { useTheme } from '../hooks/useTheme'
import { useStickyDismissed } from '../hooks/useStickyDismissed'
import { AppStoreBadge, GooglePlayBadge } from './StoreBadge'
import { icon_light, icon_dark } from '../assets/images'

/**
 * A floating download card on phones, in thumb reach — the app icon, the name
 * and the store's own badge, in the shape people already know from an app's
 * install prompt (TikTok's, Instagram's, every app that has a web page).
 *
 * The badge is the point: an iPhone sees Apple's "Download on the App Store",
 * an Android phone sees Google's "GET IT ON Google Play". A visitor recognises
 * those before they read a word, and each one says exactly where the tap goes.
 *
 * It stays out of the way in the hero, where the visitor is still finding out
 * what Ch@t is, and at the final download section, which has its own button.
 * It slides in everywhere between, so someone convinced halfway down never has
 * to scroll to act — and the × sends it away, which brings a download button
 * up into the header in its place (see useStickyDismissed), so the app stays
 * one tap away without the card in the way.
 * Server-rendered hidden; it only needs to exist once the visitor scrolls.
 */
export default function StickyDownload() {
  const [show, setShow] = useState(false)
  const { dismissed, dismiss } = useStickyDismissed()
  const platform = usePlatform()
  const { isDark } = useTheme()

  useEffect(() => {
    const targets = ['hero', 'download']
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0 || !('IntersectionObserver' in window)) return

    const hero = document.getElementById('hero')
    const visible = new Set<Element>()
    let heroPassed = false
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
        // Only once the hero has scrolled *up* past the top — not while it's
        // still on screen.
        if (e.target === hero) heroPassed = !e.isIntersecting && e.boundingClientRect.bottom <= 0
      }
      setShow(heroPassed && visible.size === 0)
    })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  if (dismissed) return null

  // An iPhone gets Apple's badge; everything else goes to Play, which is also
  // where a phone we can't place is sent.
  const isIOS = platform.os === 'ios'

  const open = show && !dismissed

  return (
    <div
      inert={!open}
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 transition-transform duration-300 md:hidden ${
        open ? 'translate-y-0' : 'pointer-events-none translate-y-[130%]'
      }`}
    >
      <div className="relative mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/95 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-md dark:border-white/10 dark:bg-[#141414]/95">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm active:scale-95 dark:border-white/10 dark:bg-[#1f1f1f] dark:text-gray-400"
        >
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>

        <img
          src={isDark ? icon_dark : icon_light}
          alt=""
          className="h-11 w-11 flex-shrink-0 rounded-xl shadow-sm"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate font-syne text-base font-bold leading-tight text-gray-900 dark:text-white">Ch@t</p>
          <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">Dating · Free</p>
        </div>

        <DownloadLink
          placement="sticky"
          aria-label={isIOS ? 'Download Ch@t on the App Store' : 'Get Ch@t on Google Play'}
          className="inline-flex min-h-11 flex-shrink-0 items-center text-sm font-semibold text-gray-900 active:scale-95 dark:text-white"
        >
          {isIOS ? <AppStoreBadge className="h-9 w-[108px]" /> : <GooglePlayBadge className="h-9 w-[121px]" />}
        </DownloadLink>
      </div>
    </div>
  )
}
