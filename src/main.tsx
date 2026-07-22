import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { preloadImages } from './preloadImages'
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

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const rootEl = document.getElementById('root')!
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Production build ships pre-rendered HTML → hydrate it (hero is already on
// screen before this runs). Dev serves an empty root → create a fresh one.
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, tree)
} else {
  ReactDOM.createRoot(rootEl).render(tree)
}

// Warm every screenshot into cache once the hero is up, so scrolling is instant.
preloadImages()
