import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  APP_STORE_DEEP_LINK,
  PLAY_STORE_DEEP_LINK,
} from '../constants'

export type OS = 'ios' | 'android' | 'unknown'

/** Apps whose built-in browser can't open the App Store or Play Store. */
export type InAppBrowser = 'TikTok' | 'Instagram' | 'Facebook' | 'Snapchat' | null

export interface Platform {
  os: OS
  inApp: InAppBrowser
  /** Whether a store-app deep link will work here. Off in in-app browsers
   *  (they block the handoff), Opera Mini (a proxy browser that can't make it)
   *  and for crawlers (which should see an ordinary https link). */
  canDeepLink: boolean
}

export const UNKNOWN_PLATFORM: Platform = { os: 'unknown', inApp: null, canDeepLink: false }

/**
 * Reads a user-agent string. The server runs this on the request (see the root
 * loader) so the download link is right in the HTML before any JS loads.
 *
 * Links shared on TikTok open inside TikTok's own browser, which can neither
 * open a new window nor hand off to the store app — a store link tapped in
 * there reports "action can't be taken". Instagram, Facebook and Snapchat
 * behave the same way.
 */
export function detectPlatform(ua: string, isBot = false): Platform {
  const os: OS = /iphone|ipad|ipod/i.test(ua) ? 'ios' : /android/i.test(ua) ? 'android' : 'unknown'

  const inApp: InAppBrowser =
    // TikTok identifies itself by its internal names, not always as "TikTok".
    /musical_ly|bytedancewebview|trill_|tiktok/i.test(ua) ? 'TikTok'
      : /instagram/i.test(ua) ? 'Instagram'
        : /fban|fbav|fb_iab|fbios/i.test(ua) ? 'Facebook'
          : /snapchat/i.test(ua) ? 'Snapchat'
            : null

  const canDeepLink = os !== 'unknown' && !inApp && !isBot && !/opera mini/i.test(ua)

  return { os, inApp, canDeepLink }
}

export interface StoreLink {
  /** What the button links to. */
  href: string
  /** The store's ordinary web listing — the fallback everywhere else. */
  web: string
  store: 'app_store' | 'google_play'
  /** Desktop only: keep the page open behind the store. */
  newTab: boolean
}

/** iPhone → App Store, everything else → Google Play (Play's web listing
 *  handles desktop fine). Deep links wherever they can work. */
export function storeLink({ os, canDeepLink }: Platform): StoreLink {
  if (os === 'ios') {
    return { href: canDeepLink ? APP_STORE_DEEP_LINK : APP_STORE_URL, web: APP_STORE_URL, store: 'app_store', newTab: false }
  }
  if (os === 'android') {
    return { href: canDeepLink ? PLAY_STORE_DEEP_LINK : GOOGLE_PLAY_URL, web: GOOGLE_PLAY_URL, store: 'google_play', newTab: false }
  }
  return { href: GOOGLE_PLAY_URL, web: GOOGLE_PLAY_URL, store: 'google_play', newTab: true }
}
