import { useState, useEffect } from 'react'

type Platform = 'ios' | 'android' | 'unknown'

/**
 * SSR-safe platform detection. Starts 'unknown' on both server and the client's
 * first paint (clean hydration), then resolves the real platform after mount.
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
