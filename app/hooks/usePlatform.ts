import { useState, useEffect } from 'react'
import { useRouteLoaderData } from 'react-router'
import { detectPlatform, type Platform } from '../lib/platform'

/**
 * The visitor's OS, and whether they're inside an app's built-in browser.
 *
 * Seeded from the user-agent the root loader read off the request, so the
 * server render and the client's first paint already agree on the real platform
 * — no hydration mismatch, and no window where an iPhone visitor is handed the
 * Google Play link because JS hasn't loaded yet. In-app browsers are slow to
 * load JS, so that window used to be widest exactly where it hurt most.
 *
 * After mount it re-reads navigator.userAgent, which only ever changes anything
 * if the page rendered without loader data (e.g. from an error boundary).
 */
export function usePlatform(): Platform {
  const data = useRouteLoaderData('root') as { ua?: string } | undefined
  const [platform, setPlatform] = useState<Platform>(() => detectPlatform(data?.ua ?? ''))

  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent))
  }, [])

  return platform
}
