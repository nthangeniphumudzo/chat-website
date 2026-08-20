import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLiveStats } from '../hooks/useLiveStats'

/* Locale-independent on purpose. Intl.NumberFormat can group differently in
   Node than in the browser, which would be a hydration mismatch on a number
   the visitor is being asked to trust. */
const group = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Counts from wherever it was to the new figure. On the first reading that's
 * 0 → value, which is what makes the strip read as a live meter rather than
 * printed text; on later refreshes it ticks from the old number to the new one,
 * so a visitor who lingers sees the count actually move.
 */
function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = useState(reducedMotion() ? target : 0)
  const from = useRef(0)

  useEffect(() => {
    if (reducedMotion()) {
      setValue(target)
      from.current = target
      return
    }
    const start = performance.now()
    const origin = from.current
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(origin + (target - origin) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else from.current = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

/* Solid shapes, not outlines: at this size next to a bold number an outline
   icon turns to mush, and these have to read at a glance on a phone. */
const iconClass = 'h-4 w-4 shrink-0 text-mint'

/* A speech bubble has to be clearly wider than it is tall, with a tail that
   tapers rather than hanging as a stub — square-ish bubbles that fill their
   viewBox, the usual icon-set default, collapse into an anonymous blob at 16px.
   The three dots are what make it unmistakably a *message* rather than a
   generic bubble at that size.

   They're subpaths knocked out with evenodd, not white circles, so they show
   whatever the page is sitting on and stay correct in both themes. */
const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
    <path
      fillRule="evenodd"
      d="M19 3.5H5A3.2 3.2 0 0 0 1.8 6.7v6.6A3.2 3.2 0 0 0 5 16.5h1.4l-1.1 4.1a.6.6 0 0 0 .9.66l6.2-4.76H19a3.2 3.2 0 0 0 3.2-3.2V6.7A3.2 3.2 0 0 0 19 3.5zM6.1 10a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0zM10.5 10a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0zM14.9 10a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0z"
    />
  </svg>
)

const MatchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

interface StatProps {
  value: number
  /** What sits under the number. Often just "today" — the icon carries the noun. */
  label: string
  /**
   * The whole phrase, for screen readers. The visible label leans on an icon
   * that assistive tech cannot read, so "412 today" would be meaningless on its
   * own; this says "412 matches today" instead.
   */
  description: string
  /** The pulsing dot — only the genuinely real-time figure earns it. */
  live?: boolean
  icon?: ReactNode
}

function Stat({ value, label, description, live, icon }: StatProps) {
  const shown = useCountUp(value)
  return (
    <div className="px-4 first:pl-0 last:pr-0">
      <dd className="flex items-center gap-1.5 font-syne text-lg font-bold leading-none text-gray-900 dark:text-gray-100 sm:text-xl">
        {live && (
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
        )}
        {icon}
        {/* The digits change every frame; announcing each one would be hostile,
            so the figure is read once, settled, by the sr-only copy below. */}
        <span aria-hidden>{group(shown)}</span>
      </dd>
      <dt className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 sm:text-[11px]">
        {label}
      </dt>
      <span className="sr-only">
        {group(value)} {description}
      </span>
    </div>
  )
}

/**
 * The "this thing is actually alive" strip.
 *
 * A stranger from a video has no reason to believe an unknown dating app has
 * anyone in it. Three numbers answer that before they've scrolled: people are
 * here right now, they are talking, and they are actually meeting. Every figure
 * is live or same-day on purpose — a big all-time total proves an app was busy
 * once, which is not the question a stranger is asking.
 *
 * Two of the three read just "today"; the icon supplies the noun. That only
 * works visually, so each carries a full spoken phrase for screen readers.
 *
 * Shows nothing at all until real figures arrive. See useLiveStats.
 */
export default function LiveStats({ className = '' }: { className?: string }) {
  const stats = useLiveStats()

  /* A zero is dropped rather than displayed.
     The backend sends genuine zeros — at 04:00 nobody is online — and prints
     whatever it is given. "0 online now" under a pulsing live dot is worse than
     silence: it actively argues the app is empty, which is the opposite of what
     this strip is for. Omitting a figure claims nothing false; inventing one
     would. Whatever survives still reads as a complete, deliberate row, and if
     nothing survives the strip stays empty. */
  const shown = stats
    ? [
        {
          key: 'online',
          value: stats.onlineNow,
          label: 'online now',
          description: 'people online now',
          live: true,
        },
        {
          key: 'messages',
          value: stats.messagesToday,
          label: 'today',
          description: 'messages sent today',
          icon: <MessageIcon />,
        },
        {
          key: 'matches',
          value: stats.matchesToday,
          label: 'today',
          description: 'matches made today',
          icon: <MatchIcon />,
        },
      ].filter(s => s.value > 0)
    : []

  /* The row is always in the layout, populated or not. It sits directly above
     the phone screenshot on mobile, so letting it appear when the fetch lands
     would shove the screenshot down the page in the middle of someone reading —
     the hero is exactly where a layout shift is most expensive. */
  return (
    <div className={`min-h-[2.5rem] ${className}`}>
      {shown.length > 0 && (
        <dl className="stats-in flex items-start justify-center divide-x divide-gray-200 dark:divide-gray-800 lg:justify-start">
          {shown.map(({ key, ...stat }) => (
            <Stat key={key} {...stat} />
          ))}
        </dl>
      )}
    </div>
  )
}
