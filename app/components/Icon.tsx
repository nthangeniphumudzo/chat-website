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

export type IconName = 'camera' | 'camera-off' | 'eye' | 'eye-off' | 'sliders' | 'sun' | 'moon'

const CAMERA = 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'
const EYE = 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z'

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
