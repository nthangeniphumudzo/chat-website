import { API_BASE } from '../constants'
import { detectPlatform } from './platform'

/**
 * First-party behaviour tracking: where visitors stay, how far they scroll,
 * what they tap, and where they get stuck. Batches go to the backend
 * (/website-heatmap/events), which keeps them for 30 days and serves them to
 * the admin's Website Behaviour page.
 *
 * What it reads from the markup:
 *  - `data-track-section="name"` — a part of the page. The section crossing the
 *    middle of the screen is the one being read; time there is its dwell.
 *  - `data-track="label"` — a name for a tappable thing, so a click reads as
 *    "download:hero" rather than "a". Untagged buttons and links fall back to
 *    their aria-label or short text.
 *  - `data-track-private` — nothing inside it is ever labelled with its text
 *    (the advisor chat). Form fields are never read at all.
 *
 * No cookies and no personal data: the session id is random and lives in
 * sessionStorage, so it ends with the tab.
 *
 * Batches go out with sendBeacon as text/plain, a "simple" cross-origin request:
 * no CORS preflight, and the browser still delivers it while the page closes.
 */

type EventType = 'pageview' | 'section_view' | 'scroll_depth' | 'click' | 'rage_click' | 'exit'

interface HeatmapEvent {
  type: EventType
  section?: string
  target?: string
  /** Click position within its section (or the page), 0–1. */
  x?: number
  y?: number
  /** Scroll depth, 0–100. */
  depth?: number
  durationMs?: number
  /** A click on something that does nothing — a sign of a stuck visitor. */
  dead?: boolean
}

const ENDPOINT = `${API_BASE}/website-heatmap/events`
const FLUSH_MS = 10_000
const MAX_BATCH = 50
const DEPTHS = [25, 50, 75, 90, 100]
/** Three clicks this close together, in time and space, read as frustration. */
const RAGE_CLICKS = 3
const RAGE_WINDOW_MS = 700
const RAGE_RADIUS_PX = 30
/** Dwell shorter than this is a scroll past, not a read. */
const MIN_DWELL_MS = 500

const INTERACTIVE =
  'a,button,input,select,textarea,label,summary,details,[role="button"],[role="link"],[role="tab"],[tabindex],[data-track],[data-download]'

let started = false
let sessionId = ''
let ctx: Record<string, unknown> = {}
let queue: HeatmapEvent[] = []

// Per page view.
let path = ''
/** Time the page was actually on screen; away time (in the store, another app) doesn't count. */
let activeMs = 0
let visibleSince = 0
let maxDepth = 0
let depthsHit = new Set<number>()
let current: { name: string; since: number } | null = null
let observer: IntersectionObserver | null = null
let recent: { t: number; x: number; y: number }[] = []
let rageFired = 0

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem('chat-hm-sid')
    if (!id) {
      id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
      sessionStorage.setItem('chat-hm-sid', id)
    }
    return id
  } catch {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  }
}

function device(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth
  return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop'
}

function push(e: HeatmapEvent) {
  queue.push(e)
  if (queue.length >= MAX_BATCH) flush()
}

function flush() {
  if (!queue.length) return
  const events = queue.splice(0, MAX_BATCH)
  const body = JSON.stringify({ sessionId, path, ctx, events })
  try {
    if (navigator.sendBeacon?.(ENDPOINT, body)) return
  } catch {
    /* fall through */
  }
  fetch(ENDPOINT, {
    method: 'POST',
    body,
    keepalive: true,
    headers: { 'Content-Type': 'text/plain' },
  }).catch(() => {})
}

const round = (n: number) => Math.round(Math.min(1, Math.max(0, n)) * 1000) / 1000

function sectionOf(el: Element | null): HTMLElement | null {
  return (el?.closest('[data-track-section]') as HTMLElement | null) ?? null
}

/** A readable name for what was tapped, without ever reading form contents. */
function labelOf(el: Element): string {
  const tagged = el.closest('[data-track]') as HTMLElement | null
  if (tagged) return tagged.dataset.track!.slice(0, 80)

  const interactive = el.closest(INTERACTIVE) as HTMLElement | null
  const node = interactive ?? (el as HTMLElement)
  const tag = node.tagName.toLowerCase()
  if (/^(input|textarea|select)$/.test(tag) || node.closest('[data-track-private],[contenteditable]')) return tag

  const name = node.getAttribute('aria-label') || node.id || (interactive ? node.textContent?.trim() : '')
  return name ? `${tag}:${name.replace(/\s+/g, ' ').slice(0, 40)}` : tag
}

function isInteractive(el: Element): boolean {
  if (el.closest(INTERACTIVE)) return true
  // React handlers leave no attribute behind; a pointer cursor is the tell.
  try {
    return getComputedStyle(el).cursor === 'pointer'
  } catch {
    return false
  }
}

function onClick(e: MouseEvent) {
  const el = e.target as Element | null
  if (!el || !(el instanceof Element)) return

  const section = sectionOf(el)
  const box = section?.getBoundingClientRect()
  const x = box ? (e.clientX - box.left) / box.width : e.clientX / window.innerWidth
  const y = box
    ? (e.clientY - box.top) / box.height
    : (e.clientY + window.scrollY) / document.documentElement.scrollHeight
  const target = labelOf(el)
  const name = section?.dataset.trackSection

  push({ type: 'click', section: name, target, x: round(x), y: round(y), dead: !isInteractive(el) || undefined })

  const now = Date.now()
  recent = recent.filter(
    (c) => now - c.t < RAGE_WINDOW_MS && Math.hypot(c.x - e.clientX, c.y - e.clientY) < RAGE_RADIUS_PX,
  )
  recent.push({ t: now, x: e.clientX, y: e.clientY })
  if (recent.length >= RAGE_CLICKS && now - rageFired > RAGE_WINDOW_MS) {
    rageFired = now
    push({ type: 'rage_click', section: name, target, x: round(x), y: round(y) })
  }
}

function onScroll() {
  const doc = document.documentElement
  const depth = Math.min(100, Math.round(((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100))
  if (depth <= maxDepth) return
  maxDepth = depth
  for (const d of DEPTHS) {
    if (depth >= d && !depthsHit.has(d)) {
      depthsHit.add(d)
      push({ type: 'scroll_depth', depth: d })
    }
  }
}

/** Close out time spent in the section being read. */
function endDwell() {
  if (!current) return
  const durationMs = Date.now() - current.since
  if (durationMs >= MIN_DWELL_MS) push({ type: 'section_view', section: current.name, durationMs })
  current = null
}

function observeSections() {
  observer?.disconnect()
  current = null
  if (!('IntersectionObserver' in window)) return
  // A one-pixel line across the middle of the screen: whichever section
  // crosses it is the one being read, so exactly one counts at a time — even
  // a section taller than the screen.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const name = (entry.target as HTMLElement).dataset.trackSection!
        if (entry.isIntersecting) {
          if (current?.name === name) continue
          endDwell()
          if (document.visibilityState === 'visible') current = { name, since: Date.now() }
        } else if (current?.name === name) {
          endDwell()
        }
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  )
  document.querySelectorAll('[data-track-section]').forEach((el) => observer!.observe(el))
}

/** The section in the middle of the screen right now, for the exit record. */
function sectionInView(): string | undefined {
  const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
  return sectionOf(el)?.dataset.trackSection
}

function endPage() {
  endDwell()
  if (visibleSince) activeMs += Date.now() - visibleSince
  visibleSince = 0
  push({ type: 'exit', section: sectionInView(), depth: maxDepth, durationMs: activeMs })
  flush()
}

function beginPage(newPath: string) {
  path = newPath
  activeMs = 0
  visibleSince = Date.now()
  maxDepth = 0
  depthsHit = new Set()
  recent = []
  push({ type: 'pageview' })
  onScroll()
  observeSections()
}

function onVisibility() {
  if (document.visibilityState === 'hidden') {
    // The visitor switched away — maybe to the store, maybe for good. Record
    // where they were; if they come back, carry on as the same page view (the
    // backend keeps the last exit of each page view).
    endPage()
  } else {
    visibleSince = Date.now()
    observeSections()
  }
}

/** Starts tracking for this tab, or moves it to a new route. Browser only. */
export function trackPage(newPath: string) {
  if (typeof window === 'undefined' || navigator.webdriver) return

  if (!started) {
    started = true
    sessionId = getSessionId()
    const platform = detectPlatform(navigator.userAgent)
    let ref: string | null = null
    try {
      ref = new URLSearchParams(location.search).get('ref') || sessionStorage.getItem('promoRef')
    } catch {
      /* ignore */
    }
    ctx = {
      device: device(),
      os: platform.os,
      inApp: platform.inApp,
      ref: ref?.slice(0, 40) || null,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      vw: window.innerWidth,
      vh: window.innerHeight,
    }
    document.addEventListener('click', onClick, { capture: true, passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', () => {
      if (document.visibilityState !== 'hidden') endPage()
    })
    setInterval(flush, FLUSH_MS)
    beginPage(newPath)
    return
  }

  if (newPath === path) return
  endPage()
  beginPage(newPath)
}
