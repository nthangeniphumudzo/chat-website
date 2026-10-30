/**
 * The site's interface icons, drawn in one style: a 24px grid, 2px rounded
 * strokes, `currentColor`. They replace emoji (📵 🙈 🎛️ 📸 🌙 ☀️), which render
 * differently on every platform and never match each other or the text beside
 * them — Apple's guidance is for all interface icons to share "a consistent
 * size, level of detail, stroke thickness (or weight), and perspective".
 *
 * Decorative by default (aria-hidden): every icon here sits next to a text label
 * that already says what it means.
 */

export type IconName =
  | 'camera' | 'camera-off' | 'eye' | 'eye-off' | 'sliders' | 'sun' | 'moon'
  | 'shield-check' | 'badge-check' | 'lock' | 'heart' | 'heart-handshake' | 'message-heart'
  | 'message' | 'hourglass' | 'users' | 'sparkles' | 'map-pin' | 'gift'

const CAMERA = 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'
const EYE = 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z'
const HEART =
  'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z'
const BUBBLE = 'M7.9 20A9 9 0 1 0 4 16.1L2 22z'
const TICK = 'M9 12l2 2 4-4'

function Shapes({ name }: { name: IconName }) {
  switch (name) {
    case 'camera':
      return (
        <>
          <path d={CAMERA} />
          <circle cx="12" cy="13" r="3" />
        </>
      )
    case 'camera-off':
      return (
        <>
          <path d={CAMERA} />
          <circle cx="12" cy="13" r="3" />
          <path d="M3 3l18 18" />
        </>
      )
    case 'eye':
      return (
        <>
          <path d={EYE} />
          <circle cx="12" cy="12" r="3" />
        </>
      )
    case 'eye-off':
      return (
        <>
          <path d={EYE} />
          <circle cx="12" cy="12" r="3" />
          <path d="M3 3l18 18" />
        </>
      )
    case 'sliders':
      return (
        <>
          <path d="M4 6h16M4 12h16M4 18h16" />
          <circle cx="9" cy="6" r="2" fill="currentColor" />
          <circle cx="15" cy="12" r="2" fill="currentColor" />
          <circle cx="7" cy="18" r="2" fill="currentColor" />
        </>
      )
    case 'sun':
      return (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </>
      )
    case 'moon':
      return <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    case 'shield-check':
      return (
        <>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d={TICK} />
        </>
      )
    case 'badge-check':
      return (
        <>
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
          <path d={TICK} />
        </>
      )
    case 'lock':
      return (
        <>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </>
      )
    case 'heart':
      return <path d={HEART} />
    case 'heart-handshake':
      return (
        <>
          <path d={HEART} />
          <path d="M12 5L9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66M18 15l-2-2M15 18l-2-2" />
        </>
      )
    case 'message-heart':
      return (
        <>
          <path d={BUBBLE} />
          <path d="M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6L12 16.4l3.6-3.5c1.2-1.2 1.1-2.7.2-3.7" />
        </>
      )
    case 'message':
      return <path d={BUBBLE} />
    case 'hourglass':
      return (
        <path d="M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2" />
      )
    case 'users':
      return (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      )
    case 'sparkles':
      return (
        <>
          <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" />
          <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
        </>
      )
    case 'map-pin':
      return (
        <>
          <path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </>
      )
    case 'gift':
      return (
        <>
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </>
      )
  }
}

export default function Icon({ name, className = 'w-5 h-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <Shapes name={name} />
    </svg>
  )
}

/**
 * An icon on a soft mint tile — how a section or a point announces its topic
 * at a glance, before the words are read.
 */
export function IconBadge({ name, size = 'md' }: { name: IconName; size?: 'sm' | 'md' | 'lg' }) {
  const box = {
    sm: 'h-9 w-9 rounded-xl [&>svg]:h-[18px] [&>svg]:w-[18px]',
    md: 'h-14 w-14 rounded-2xl [&>svg]:h-7 [&>svg]:w-7',
    lg: 'h-20 w-20 rounded-3xl [&>svg]:h-10 [&>svg]:w-10',
  }[size]
  return (
    <span className={`inline-flex flex-shrink-0 items-center justify-center bg-mint/10 text-mint-ink ring-1 ring-mint/25 ${box}`}>
      <Icon name={name} className="" />
    </span>
  )
}
