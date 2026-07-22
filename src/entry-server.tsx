import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Build-time render. The above-the-fold tree (Navbar + Hero) renders to static
 * HTML; the lazy, below-the-fold sections resolve to their Suspense fallback
 * (null) and load on the client. Result: the hero paints instantly from HTML,
 * then the page hydrates.
 */
export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
