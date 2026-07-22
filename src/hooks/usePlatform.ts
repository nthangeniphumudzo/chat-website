import { useState, useEffect } from 'react'

type Platform = 'ios' | 'android' | 'unknown'

/**
 * SSR-safe platform detection. Starts as 'unknown' (matching the server
 * pre-render and the client's first paint, so hydration is clean), then
 * resolves the real platform after mount.
 */
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('unknown')

  useEffect(() => {
    const ua = navigator.userAgent
    setPlatform(
      /iphone|ipad|ipod/i.test(ua) ? 'ios' : /android/i.test(ua) ? 'android' : 'unknown'
    )
  }, [])

  return platform
}
