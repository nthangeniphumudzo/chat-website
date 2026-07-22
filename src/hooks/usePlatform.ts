type Platform = 'ios' | 'android' | 'unknown'

export function usePlatform(): Platform {
  const ua = navigator.userAgent
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios'
  if (/android/i.test(ua)) return 'android'
  return 'unknown'
}
