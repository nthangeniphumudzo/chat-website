import { useEffect, useState } from 'react'
import { usePlatform } from '../hooks/usePlatform'

/** Fired by a download button tapped inside an in-app browser (see DownloadLink). */
export const OPEN_IN_BROWSER_EVENT = 'chat:open-in-browser'

/**
 * For visitors inside TikTok's (or Instagram's, Facebook's, Snapchat's) own
 * browser, which can't hand off to the App Store or Play Store: a store link
 * tapped in there goes nowhere. So instead of a download that silently fails,
 * we say so, and show the way out: open this same page in the phone's real
 * browser, where the button works.
 *
 * A slim bar sits at the bottom from the start, so the tip is seen before
 * anyone taps and gets let down. Tapping any download button opens the full
 * steps. Rendered on the server too, since the platform comes from the request.
 *
 * Tracked: the steps and both escape buttons carry data-track, and the address
 * is stamped with ?via=<app> so arrivals in the real browser are counted too —
 * the admin's Website Behaviour page shows the whole way out, step by step.
 */
export default function InAppBrowserHint() {
  const { inApp, os } = usePlatform()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Stamp the address with ?via=tiktok (or the app's name). Whichever way the
  // visitor gets out (the ••• menu, Copy link, Open in Chrome) carries the
  // current address, so their browser visit arrives marked as an escape and
  // the Website Behaviour page can count it. Any ?ref= promo code stays.
  useEffect(() => {
    if (!inApp) return
    const url = new URL(location.href)
    if (url.searchParams.get('via')) return
    url.searchParams.set('via', inApp.toLowerCase())
    history.replaceState(history.state, '', url)
  }, [inApp])

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener(OPEN_IN_BROWSER_EVENT, show)
    return () => window.removeEventListener(OPEN_IN_BROWSER_EVENT, show)
  }, [])

  if (!inApp) return null

  // This same page, query string included, so ?ref= and ?via= survive the move.
  const pageUrl = () => `https://${location.host}${location.pathname}${location.search}`

  // Android: ask for Chrome directly. Some in-app browsers allow this handoff,
  // some refuse it; the manual steps stay on screen either way.
  const openInChrome = () => {
    location.href = `intent://${location.host}${location.pathname}${location.search}#Intent;scheme=https;package=com.android.chrome;end`
  }

  const copyLink = async () => {
    const url = pageUrl()
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // In-app browsers often block the clipboard API; the old way still works.
      const field = document.createElement('textarea')
      field.value = url
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const browser = os === 'ios' ? 'Safari' : 'your browser'

  return (
    <div
      data-track-section="inapp-hint"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      className="fixed inset-x-0 bottom-0 z-[60] px-3"
    >
      <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-2xl shadow-black/40 dark:border-gray-800 dark:bg-[#121212] dark:text-gray-100">
        {!open ? (
          <button
            type="button"
            data-track="inapp:show-steps"
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left"
          >
            <span aria-hidden className="text-xl">↗</span>
            <span className="flex-1 text-sm leading-snug">
              <span className="font-semibold">Want the app?</span> {inApp} can’t open the app store. Open this page in{' '}
              {browser} first.
            </span>
            <span className="rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-gray-900">How?</span>
          </button>
        ) : (
          <div className="p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="font-syne text-lg font-bold leading-tight">
                {inApp} can’t open the app store
              </p>
              <button
                type="button"
                data-track="inapp:close"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="-mr-1 -mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Open this page in {browser} and the download button will work. It takes five seconds:
            </p>
            <ol className="mb-5 space-y-2.5 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-mint text-xs font-bold text-gray-900">1</span>
                <span>
                  Tap <span className="rounded-md bg-gray-100 px-1.5 py-0.5 font-bold tracking-widest dark:bg-gray-800">•••</span> at the
                  top right of the screen
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-mint text-xs font-bold text-gray-900">2</span>
                <span>
                  Choose <span className="font-semibold">“Open in browser”</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-mint text-xs font-bold text-gray-900">3</span>
                <span>
                  Tap <span className="font-semibold">Download app</span> there
                </span>
              </li>
            </ol>
            <div className="flex gap-2">
              {os === 'android' && (
                <button
                  type="button"
                  data-track="inapp:open-chrome"
                  onClick={openInChrome}
                  className="flex-1 rounded-full bg-mint px-4 py-3 text-sm font-semibold text-gray-900 active:scale-95"
                >
                  Open in Chrome
                </button>
              )}
              <button
                type="button"
                data-track="inapp:copy-link"
                onClick={copyLink}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold active:scale-95 ${
                  os === 'android'
                    ? 'border border-gray-300 dark:border-gray-700'
                    : 'bg-mint text-gray-900'
                }`}
              >
                {copied ? 'Copied ✓' : 'Copy link'}
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-gray-500">
              Or paste the link into {browser}.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
