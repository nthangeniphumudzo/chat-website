import { useState, useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'
import type { InAppBrowser } from '../lib/platform'

interface DownloadLinkProps {
  placement: string
  className: string
  children: ReactNode
  'aria-label'?: string
}

/**
 * Every "get the app" button on the page goes through here, so there is one
 * place that knows how to reach a store from wherever the visitor is standing.
 *
 * - iPhone → App Store, everything else → Google Play (Play's web listing
 *   handles desktop fine).
 * - Phones open the store in the same tab. A new tab adds nothing on mobile,
 *   and in-app browsers can't open one at all — `target="_blank"` there is
 *   exactly what produced TikTok's "action can't be taken".
 * - Inside an in-app browser (TikTok, Instagram, …) no web page can hand off to
 *   the store app, so instead of letting the tap fail we show how to get into a
 *   real browser, where the same button works.
 *
 * The href is correct in the server-rendered HTML (the platform comes from the
 * request's user-agent), so a tap that lands before JS has loaded still goes to
 * the right store rather than dead-ending.
 */
export default function DownloadLink({ placement, className, children, ...rest }: DownloadLinkProps) {
  const { os, inApp } = usePlatform()
  const [helpOpen, setHelpOpen] = useState(false)

  const isIos = os === 'ios'
  const href = isIos ? APP_STORE_URL : GOOGLE_PLAY_URL
  const store = isIos ? 'app_store' : 'google_play'

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackDownload(store, placement, inApp)
    if (inApp) {
      e.preventDefault()
      setHelpOpen(true)
    }
  }

  return (
    <>
      <a
        href={href}
        // Only desktop gets a new tab, so the page stays open behind the store.
        target={os === 'unknown' && !inApp ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
        {...rest}
      >
        {children}
      </a>
      {helpOpen && inApp && (
        <InAppBrowserHelp
          app={inApp}
          isIos={isIos}
          storeHref={href}
          onClose={() => setHelpOpen(false)}
        />
      )}
    </>
  )
}

interface HelpProps {
  app: Exclude<InAppBrowser, null>
  isIos: boolean
  storeHref: string
  onClose: () => void
}

/** Bottom sheet: how to leave the in-app browser, plus a copy-link fallback. */
function InAppBrowserHelp({ app, isIos, storeHref, onClose }: HelpProps) {
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')
  const sheetRef = useRef<HTMLDivElement>(null)

  const storeName = isIos ? 'App Store' : 'Play Store'
  const browserName = isIos ? 'Safari' : 'Chrome'

  useEffect(() => {
    sheetRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    // Hold the page still behind the sheet.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const copyLink = async () => {
    // The current URL, so a ?ref= promo code survives the trip to the browser.
    const ok = await copyText(window.location.href)
    setCopied(ok ? 'done' : 'failed')
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center" role="presentation">
      {/* Points at the corner where the app keeps its ⋯ menu. */}
      <div aria-hidden className="in-app-arrow pointer-events-none fixed right-4 top-3 z-[91] text-3xl text-mint">
        ↗
      </div>

      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="in-app-help-title"
        tabIndex={-1}
        className="relative w-full max-w-md rounded-t-[28px] bg-white px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-gray-900 shadow-2xl outline-none dark:bg-[#111] dark:text-gray-100"
      >
        <div aria-hidden className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />

        <h2 id="in-app-help-title" className="font-syne text-2xl font-bold leading-tight">
          Open this page in {browserName} to download
        </h2>
        <p className="mt-2 text-base leading-snug text-gray-600 dark:text-gray-400">
          {app}’s built-in browser can’t open the {storeName}. It takes two taps to fix:
        </p>

        <ol className="mt-5 space-y-3">
          <Step n={1}>
            Tap <strong>⋯</strong> in the top-right corner
          </Step>
          <Step n={2}>
            Choose <strong>“Open in browser”</strong>
          </Step>
          <Step n={3}>
            Tap <strong>Download</strong> again — it’ll open the {storeName}
          </Step>
        </ol>

        <button
          onClick={copyLink}
          className="mt-6 w-full rounded-full bg-mint px-6 py-3.5 font-syne text-base font-bold text-gray-900 transition active:scale-[0.98]"
        >
          {copied === 'done' ? `Link copied — paste it into ${browserName}` : 'Copy link instead'}
        </button>
        {copied === 'failed' && (
          <p className="mt-3 select-all break-all rounded-xl bg-gray-100 px-4 py-3 text-center text-sm dark:bg-gray-800">
            {window.location.href}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between text-sm">
          {/* The direct route, for the in-app browsers that do let it through. */}
          <a href={storeHref} className="font-semibold text-mint-dark underline-offset-2 hover:underline dark:text-mint">
            Try the {storeName} anyway
          </a>
          <button onClick={onClose} className="font-semibold text-gray-500 dark:text-gray-400">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base leading-snug">
      <span className="mt-px flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-mint text-sm font-bold text-gray-900">
        {n}
      </span>
      <span>{children}</span>
    </li>
  )
}

/** Clipboard API where allowed; in-app browsers often block it, so fall back to
 *  the older selection-based copy before giving up. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  } catch {
    return false
  }
}
