import { useState, useEffect } from 'react'
import { useRouteLoaderData } from 'react-router'
import { detectPlatform, UNKNOWN_PLATFORM, type Platform } from '../lib/platform'

/**
 * The visitor's OS, whether they're inside an app's built-in browser, and
 * whether store deep links will work for them.
 *
 * Worked out once, on the server, from the request (see the root loader) — so
 * the server render and the client's first paint agree, the download link is
 * right before JS loads, and the crawler check (isbot) never ships to the
 * browser. Falls back to navigator.userAgent only if the page rendered without
 * loader data, e.g. from an error boundary.
 */
export function usePlatform(): Platform {
  const data = useRouteLoaderData('root') as { platform?: Platform } | undefined
  const [fallback, setFallback] = useState<Platform | null>(null)

  useEffect(() => {
    if (!data?.platform) setFallback(detectPlatform(navigator.userAgent))
  }, [data?.platform])

  return data?.platform ?? fallback ?? UNKNOWN_PLATFORM
}
