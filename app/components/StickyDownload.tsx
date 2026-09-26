import { useEffect, useState } from 'react'
import DownloadLink from './DownloadLink'
import { usePlatform } from '../hooks/usePlatform'
import { useTheme } from '../hooks/useTheme'
import { AppStoreGlyph, GooglePlayGlyph } from './StoreBadge'
import { icon_light, icon_dark } from '../assets/images'

/**
 * A floating download card on phones, in thumb reach, built to the anatomy of
 * the stores' own install banners — the ones that appear over TikTok and every
 * other app: a soft grey pane, a large app icon, the store's name above the
 * app's name, the category line under it, and a pill on the right.
 *
 * People have tapped that exact shape a hundred times, which is the whole
 * point: it reads as an install prompt rather than as a website's advert, and
 * the store mark says where the tap goes before a word is read.
 *
 * Scrolling is the only thing that shows or hides it, and there is no way to
 * dismiss it: it stays out of the way wherever a download button of its own is
 * already within reach — the hero at the top, the download section at the
 * bottom — and slides back in everywhere between, so the app is never more than
 * a tap away. Server-rendered hidden; it only needs to exist once the visitor
 * scrolls.
 */
export default function StickyDownload() {
  const [show, setShow] = useState(false)
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

  // An iPhone gets Apple's badge; everything else goes to Play, which is also
  // where a phone we can't place is sent.
  const isIOS = platform.os === 'ios'

  const open = show

  return (
    <div
      inert={!open}
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 transition-transform duration-300 md:hidden ${
        open ? 'translate-y-0' : 'pointer-events-none translate-y-[130%]'
      }`}
    >
      <div className="relative mx-auto max-w-sm">
        {/* The card *is* the button — a thumb landing anywhere on it goes to the
            store, which is how the app-install prompts people already know
            behave. The badge inside is the signature, not the hit area, so
            nobody has to aim for it. The whole card dips on press.

            Lifted off the page rather than tinted onto it: an opaque surface a
            step away from the background (plain white on white, a lighter grey
            on near-black), a hairline edge, and a soft drop shadow underneath.
            The shadow does the floating; the edge keeps it legible where the
            section behind it is the same colour. */}
        <DownloadLink
          placement="sticky"
          aria-label={isIOS ? 'Download Ch@t on the App Store' : 'Get Ch@t on Google Play'}
          className="dl-card block w-full cursor-pointer rounded-[22px] bg-[#ededf0]/95 p-2.5 text-gray-900 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.45),0_4px_12px_-6px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-transform duration-150 active:scale-[0.985] dark:bg-[#2c2c2e]/95 dark:text-white dark:shadow-[0_20px_44px_-14px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.07)]"
        >
          <span className="flex w-full items-center gap-3">
            <img
              src={isDark ? icon_dark : icon_light}
              alt=""
              className="h-14 w-14 flex-shrink-0 rounded-[13px] ring-1 ring-gray-900/10 dark:ring-white/10"
            />

            <span className="min-w-0 flex-1">
              {/* The store, said the way the store says it. */}
              <span className="flex items-center gap-1.5 text-[13px] leading-tight text-gray-500 dark:text-gray-400">
                {isIOS
                  ? <AppStoreGlyph className="h-[13px] w-[13px] flex-shrink-0" />
                  : <GooglePlayGlyph className="h-[13px] w-[13px] flex-shrink-0" />}
                <span className="truncate">{isIOS ? 'App Store' : 'Google Play'}</span>
              </span>
              <span className="mt-0.5 block truncate text-[17px] font-semibold leading-tight">Ch@t</span>
              <span className="block truncate text-[13px] leading-tight text-gray-500 dark:text-gray-400">
                Dating, SpeedDate, Chat
              </span>
            </span>

            {/* Not a button — the whole card is the link. It is shaped like the
                store's own Get pill because that is where a thumb goes looking. */}
            <span className="flex-shrink-0 rounded-full bg-mint px-6 py-1.5 text-[17px] font-semibold text-gray-900">
              Get
            </span>
          </span>
        </DownloadLink>
      </div>
    </div>
  )
}
