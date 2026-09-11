/* The live backend. Shared by the visitor/promo tracking in routes/home.tsx and
   the hero's live-stats strip, so the host is written down once. */
export const API_BASE =
  'https://chatlivecontainer.wonderfulbeach-a47f64a5.southafricanorth.azurecontainerapps.io/api'

export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
export const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

/** `inApp` names the app whose built-in browser the tap came from, if any — so
 *  analytics can show how many TikTok visitors reach the button. */
export function trackDownload(store: string, placement: string, inApp: string | null = null) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'download_click', { store, placement, in_app: inApp ?? 'none' })
  }
}
