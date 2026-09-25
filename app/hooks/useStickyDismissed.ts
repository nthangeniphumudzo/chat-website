import { useState, useEffect, useCallback } from 'react'

/** Where a dismissal is remembered — for this tab only, so a fresh visit gets
 *  the card again but the visitor who waved it away isn't nagged all the way
 *  down the page. */
const KEY = 'chat-sticky-dismissed'

/** Fired the moment the card is sent away, so the header can put its own
 *  download button up in the same tick rather than on the next render. */
const EVENT = 'chat:sticky-dismissed'

/**
 * Whether the visitor has sent the floating download card away.
 *
 * Two components care: the card itself, which hides, and the header, which
 * brings its download button out on phones so the app is still one tap away.
 * They share it through sessionStorage and a window event rather than through
 * state lifted to the page, which would re-render everything on the way down.
 */
export function useStickyDismissed() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) setDismissed(true)
    } catch {
      /* storage unavailable: the card simply stays */
    }
    const onDismiss = () => setDismissed(true)
    window.addEventListener(EVENT, onDismiss)
    return () => window.removeEventListener(EVENT, onDismiss)
  }, [])

  const dismiss = useCallback(() => {
    setDismissed(true)
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* storage unavailable: dismissed for this page view only */
    }
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return { dismissed, dismiss }
}
