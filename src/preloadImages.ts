import * as imgs from './assets/images'

// Every screenshot the page renders. We warm the browser cache right after the
// first paint so that by the time the visitor scrolls, each image is already
// downloaded and renders instantly — instead of fetching on demand mid-scroll.
const urls = [
  imgs.img_write_questions, imgs.img_write_questions_light,
  imgs.img_chat, imgs.img_chat_light,
  imgs.img_speed_date_inbox,
  imgs.img_profile, imgs.img_profile_light,
  imgs.img_explore, imgs.img_explore_light,
  imgs.img_speed_date_author, imgs.img_speed_date_modal, imgs.img_speed_date_sent,
  imgs.img_chats_list, imgs.img_chats_list_light,
  imgs.img_settings, imgs.img_settings_light,
  imgs.img_safety, imgs.img_safety_light,
  imgs.img_premium,
]

export function preloadImages() {
  if (typeof window === 'undefined') return

  // Back off on weak connections: warming ~550KB up front would just starve a
  // struggling pipe. There, images load on demand as the user scrolls instead.
  const conn = (navigator as unknown as {
    connection?: { saveData?: boolean; effectiveType?: string }
  }).connection
  if (conn?.saveData) return
  if (conn?.effectiveType && /(^|\b)(slow-2g|2g|3g)\b/.test(conn.effectiveType)) return

  const warm = () => {
    for (const src of urls) {
      const img = new Image()
      img.decoding = 'async'
      img.src = src // browser downloads + caches; no DOM insertion needed
    }
  }

  // Wait for the browser to be idle so preloading never competes with the
  // hero's first paint.
  const ric = (window as unknown as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void
  }).requestIdleCallback

  if (ric) ric(warm, { timeout: 1500 })
  else window.setTimeout(warm, 300)
}
