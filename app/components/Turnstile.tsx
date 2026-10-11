import { useEffect, useRef } from 'react'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

/** Loaded once per page, however many widgets ask for it. */
let scriptPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('turnstile_script_failed'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

interface TurnstileProps {
  siteKey: string
  action: string
  /** Handed a fresh token whenever one is issued. */
  onToken: (token: string) => void
  onError?: () => void
  /** Change this to throw the current token away and ask for another. */
  resetKey?: number
  className?: string
}

/**
 * Cloudflare's "are you a person" check, which the advisor needs before it will
 * start a conversation.
 *
 * It usually passes without the visitor doing anything — the widget watches the
 * browser rather than asking for traffic lights. It is mounted rather than
 * hidden because a token is short-lived: the page asks for one when it is about
 * to be used, and asks again (via resetKey) whenever the backend says the one
 * it got is no longer good.
 */
export default function Turnstile({ siteKey, action, onToken, onError, resetKey = 0, className = '' }: TurnstileProps) {
  const holder = useRef<HTMLDivElement | null>(null)
  const widgetId = useRef<string | null>(null)
  // Kept in a ref so re-rendering the page doesn't tear the widget down and
  // make the visitor wait for a second check.
  const callbacks = useRef({ onToken, onError })
  callbacks.current = { onToken, onError }

  useEffect(() => {
    let cancelled = false

    loadScript()
      .then(() => {
        if (cancelled || !holder.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(holder.current, {
          sitekey: siteKey,
          action,
          callback: (token: string) => callbacks.current.onToken(token),
          'error-callback': () => callbacks.current.onError?.(),
          'expired-callback': () => window.turnstile?.reset(widgetId.current ?? undefined),
          theme: 'auto',
          appearance: 'interaction-only',
        })
      })
      .catch(() => callbacks.current.onError?.())

    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
  }, [siteKey, action])

  useEffect(() => {
    if (resetKey > 0 && widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
  }, [resetKey])

  return <div ref={holder} className={className} />
}
