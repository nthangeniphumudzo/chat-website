import { useEffect } from 'react'
import { API_BASE } from '../constants'

/** Counts the visit and attributes it to a promo code, for any landing page. */
export function useVisitTracking() {
  useEffect(() => {
    // Fire-and-forget visitor tracking. The flag tells the first-visit store
    // redirect in root.tsx this visit is already counted, so it doesn't count
    // it twice on its way out.
    (window as unknown as { __chatTracked?: boolean }).__chatTracked = true
    fetch(`${API_BASE}/website-visitors/track`, { method: 'POST', keepalive: true }).catch(() => {})

    // Promo code tracking — attribute the visit via ?ref=CODE
    try {
      const ref = new URLSearchParams(window.location.search).get('ref')
      if (ref) sessionStorage.setItem('promoRef', ref)
      const activeRef = ref || sessionStorage.getItem('promoRef')
      if (activeRef) {
        const url = `${API_BASE}/promo-codes/${encodeURIComponent(activeRef)}/track`
        if (navigator.sendBeacon) navigator.sendBeacon(url)
        else fetch(url, { method: 'POST', keepalive: true }).catch(() => {})
      }
    } catch {
      /* ignore */
    }
  }, [])
}
