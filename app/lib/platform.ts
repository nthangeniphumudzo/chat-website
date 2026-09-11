export type OS = 'ios' | 'android' | 'unknown'

/** Apps whose built-in browser can't open the App Store or Play Store. */
export type InAppBrowser = 'TikTok' | 'Instagram' | 'Facebook' | 'Snapchat' | null

export interface Platform {
  os: OS
  inApp: InAppBrowser
}

/**
 * Reads a user-agent string. Pure, so the server (from the request header) and
 * the browser (from navigator.userAgent) reach the same answer — which is what
 * lets the download link be right in the server-rendered HTML, before any JS.
 *
 * The in-app checks matter most. Links shared on TikTok open inside TikTok's own
 * browser, and that browser can neither open a new window nor hand off to the
 * store app — a store link tapped in there just reports "action can't be
 * taken". Instagram, Facebook and Snapchat behave the same way.
 */
export function detectPlatform(ua: string): Platform {
  const os: OS = /iphone|ipad|ipod/i.test(ua) ? 'ios' : /android/i.test(ua) ? 'android' : 'unknown'

  const inApp: InAppBrowser =
    // TikTok identifies itself by its internal names, not always as "TikTok".
    /musical_ly|bytedancewebview|trill_|tiktok/i.test(ua) ? 'TikTok'
      : /instagram/i.test(ua) ? 'Instagram'
        : /fban|fbav|fb_iab|fbios/i.test(ua) ? 'Facebook'
          : /snapchat/i.test(ua) ? 'Snapchat'
            : null

  return { os, inApp }
}
