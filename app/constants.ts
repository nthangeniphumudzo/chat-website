/* The live backend. Shared by the visitor/promo tracking in routes/home.tsx and
   the hero's live-stats strip, so the host is written down once. */
export const API_BASE =
  'https://chatlivecontainer.wonderfulbeach-a47f64a5.southafricanorth.azurecontainerapps.io/api'

export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
export const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

/* Links that open the store *app* directly, with no web page in between.

   apps.apple.com answers an iPhone with nothing but a 301 to exactly this
   itms-appss:// address — so linking to the https URL costs a DNS lookup, a TLS
   handshake and a request to Apple's servers just to be told where to go, which
   on mobile data is the second or three where the button felt dead. Going
   straight here skips it; the App Store opens at once.

   Android's equivalent is an intent URL. Chrome and Samsung Internet open the
   Play Store app with it, and fall back to the web listing themselves if they
   can't (browser_fallback_url) — instead of downloading Play's 1 MB web page
   first, as the https link does whenever the handoff doesn't happen. */
export const APP_STORE_DEEP_LINK = 'itms-appss://apps.apple.com/us/app/ch-t/id6763358775'
export const PLAY_STORE_DEEP_LINK =
  'intent://details?id=com.phcreations.chat#Intent;scheme=market;package=com.android.vending;' +
  `S.browser_fallback_url=${encodeURIComponent(GOOGLE_PLAY_URL)};end`

/** `inApp` names the app whose built-in browser the tap came from, if any — so
 *  analytics can show how many TikTok visitors reach the button. */
export function trackDownload(store: string, placement: string, inApp: string | null = null) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'download_click', { store, placement, in_app: inApp ?? 'none' })
  }
}
