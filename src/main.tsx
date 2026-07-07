import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from './constants'
import './index.css'

// Fire-and-forget visitor tracking — must never throw or block rendering
fetch('https://chatlivecontainer.wonderfulbeach-a47f64a5.southafricanorth.azurecontainerapps.io/api/website-visitors/track', {
  method: 'POST',
  keepalive: true,
}).catch(() => {})

// Promo code tracking — attribute visit to the right promoter via ?ref=CODE
;(function () {
  const ref = new URLSearchParams(window.location.search).get('ref')
  if (ref) sessionStorage.setItem('promoRef', ref)

  const activeRef = ref || sessionStorage.getItem('promoRef')
  if (!activeRef) return

  const url = `https://chatlivecontainer.wonderfulbeach-a47f64a5.southafricanorth.azurecontainerapps.io/api/promo-codes/${encodeURIComponent(activeRef)}/track`

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url)
  } else {
    fetch(url, { method: 'POST', keepalive: true }).catch(() => {})
  }
})()

// First-visit store redirect — new mobile visitors go straight to their app store.
// Uses a plain navigation (not replace) so the site stays in history and "back"
// returns here; the localStorage flag makes every later visit load the site normally.
;(function () {
  const REDIRECT_KEY = 'storeRedirectDone'
  try {
    if (localStorage.getItem(REDIRECT_KEY)) return
    const ua = navigator.userAgent
    const target = /iphone|ipad|ipod/i.test(ua)
      ? APP_STORE_URL
      : /android/i.test(ua)
        ? GOOGLE_PLAY_URL
        : null
    if (!target) return
    localStorage.setItem(REDIRECT_KEY, '1')
    window.location.href = target
  } catch {
    // localStorage unavailable (private mode etc.) — skip redirect rather than risk a loop
  }
})()
/* eslint-disable @typescript-eslint/no-non-null-assertion */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
