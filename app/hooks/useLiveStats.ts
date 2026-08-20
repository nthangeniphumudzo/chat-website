import { useEffect, useState } from 'react'
import { API_BASE } from '../constants'

export interface LiveStats {
  onlineNow: number
  messagesToday: number
  matchesToday: number
}

/**
 * Design override, off by default. Real figures are used everywhere — including
 * localhost, via the dev proxy in vite.config.ts — so this exists only to see
 * the layout against numbers the live API isn't currently producing: five
 * digits, or a zero in a slot that happens to be populated today.
 *
 * Never commit this as true. Numbers presented as live activity when nothing is
 * measuring them are fabricated social proof.
 */
export const USE_PLACEHOLDER = false

/* Proportioned off real production ratios the backend reported — matches run at
   roughly 5% of messages. Designing against 13% made the third figure wider
   than it will ever really be. */
const PLACEHOLDER: LiveStats = {
  onlineNow: 1247,
  messagesToday: 3108,
  matchesToday: 156,
}

/* Contract: docs/live-stats-api.md
   Development goes through Vite's same-origin proxy because the API only sends
   CORS headers for the production origin; see vite.config.ts. */
const ENDPOINT = import.meta.env.DEV
  ? '/__api/public/live-stats'
  : `${API_BASE}/public/live-stats`

/* Above the server's 30s cache TTL, so a poll can actually return a new figure
   rather than the same cached one twice — which would leave the count-up
   sitting still. Also ~45x under the 60/min per-IP rate limit. */
const REFRESH_MS = 45_000

/* "Online now" is a claim about this minute. The server counts a user as online
   if seen in the last 5 minutes, so figures older than that stop being true —
   if refreshes keep failing past this point, drop the strip rather than leave a
   stale number standing under a pulsing live dot. */
const MAX_STALE_MS = 5 * 60_000

/** Rejects anything that isn't a real, non-negative, finite count. */
function readCount(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : null
}

function parse(raw: unknown): LiveStats | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const onlineNow = readCount(r.online_now)
  const messagesToday = readCount(r.messages_today)
  const matchesToday = readCount(r.matches_today)
  if (onlineNow === null || messagesToday === null || matchesToday === null) return null
  return { onlineNow, messagesToday, matchesToday }
}

/**
 * Live activity for the hero's social-proof strip.
 *
 * Returns null until real numbers arrive, and keeps returning null if the
 * endpoint is down, blocked, slow, or serving something unexpected. The strip
 * renders nothing in that state — an absent stat costs a little credibility,
 * an invented one costs all of it.
 */
export function useLiveStats(): LiveStats | null {
  const [stats, setStats] = useState<LiveStats | null>(null)

  useEffect(() => {
    if (USE_PLACEHOLDER) {
      /* Mirrors the real path's latency so the count-up doesn't play while the
         loading overlay is still covering the page. */
      const t = setTimeout(() => setStats(PLACEHOLDER), 600)
      return () => clearTimeout(t)
    }

    const controller = new AbortController()
    let lastOk = 0

    /* 429 (rate limited) and 503 (counters unavailable) both mean "nothing to
       show, try again next poll". Error bodies use a different envelope to the
       success body, so they are never parsed — the status and the three fields
       are the only things trusted. */
    const load = async () => {
      try {
        const res = await fetch(ENDPOINT, {
          signal: controller.signal,
          headers: { accept: 'application/json' },
        })
        if (res.ok) {
          const next = parse(await res.json())
          if (next) {
            lastOk = Date.now()
            setStats(next)
            return
          }
        }
      } catch {
        /* Offline, ad-blocked, CORS, or not deployed yet. */
      }
      /* Reached only on a failed or unusable response. Hold the last good
         figures briefly so a blip doesn't make the strip flicker, but never let
         them outlive the window that made them true. */
      if (lastOk && Date.now() - lastOk > MAX_STALE_MS) {
        lastOk = 0
        setStats(null)
      }
    }

    load()
    const timer = setInterval(load, REFRESH_MS)
    return () => {
      controller.abort()
      clearInterval(timer)
    }
  }, [])

  return stats
}
