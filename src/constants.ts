export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
export const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

export function trackDownload(store: string, placement: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'download_click', { store, placement })
  }
}
