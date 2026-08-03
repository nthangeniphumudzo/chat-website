import { useId } from 'react'

/**
 * The Ch@t app mark on a South African flag.
 *
 * Drawn as SVG rather than shipped as a bitmap so the flag stays crisp at any
 * size and the wordmark keeps its hairline weight on retina screens.
 *
 * The flag keeps its true 3:2 construction and is cropped to the square rather
 * than squashed into it — squashing fattens the pall until the icon reads as
 * a green blob. So the geometry is laid out for a 144x96 flag and the fly end
 * is simply clipped off: green pall 1/5 of the height, arms converging at
 * 144/3 = 48, white fimbriation (1/15) outside the pall, gold inside it, black
 * triangle at the hoist. The pall paths overshoot the box on every side so the
 * clip, not the path ends, defines the edges.
 */

const PALL_UPPER = 'M-30 -30 L48 48 L110 48'
const PALL_LOWER = 'M-30 126 L48 48 L110 48'

// Bottom-point heart, ~13 x 11.5, drawn at the origin and positioned by transform.
const HEART =
  'M6.5 11.5 C6.5 11.5 0.4 7.6 0.4 3.9 C0.4 1.6 2.4 0.4 4.2 1.3 ' +
  'C5.3 1.85 6.1 2.8 6.5 3.6 C6.9 2.8 7.7 1.85 8.8 1.3 ' +
  'C10.6 0.4 12.6 1.6 12.6 3.9 C12.6 7.6 6.5 11.5 6.5 11.5 Z'

interface ChatFlagIconProps {
  className?: string
  title?: string
}

export default function ChatFlagIcon({ className, title = 'Ch@t' }: ChatFlagIconProps) {
  // Unique per instance — the clip path is referenced by id, so two icons on one
  // page must not share it. React 19 hands back ids like «r0»; strip the
  // punctuation so the value is safe inside url(#…).
  const clipId = `chat-flag-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="96" height="96" rx="21" ry="21" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* Bands */}
        <rect width="96" height="48" fill="#E03C31" />
        <rect y="48" width="96" height="48" fill="#001489" />

        {/* White fimbriation — the wider pall underneath the green one */}
        <path d={PALL_UPPER} fill="none" stroke="#FFFFFF" strokeWidth="32" strokeLinejoin="miter" />
        <path d={PALL_LOWER} fill="none" stroke="#FFFFFF" strokeWidth="32" strokeLinejoin="miter" />

        {/* Gold: laid over the hoist, then trimmed back to a band by the green
            pall drawn on top of it. Also hides the white pall's inner edge,
            which the real flag doesn't have. */}
        <path d="M0 -14 L42 48 L0 110 Z" fill="#FFB612" />

        <path d={PALL_UPPER} fill="none" stroke="#007A4D" strokeWidth="19.2" strokeLinejoin="miter" />
        <path d={PALL_LOWER} fill="none" stroke="#007A4D" strokeWidth="19.2" strokeLinejoin="miter" />

        {/* Black triangle, inset from the green pall by the gold band */}
        <path d="M0 22.6 L25.4 48 L0 73.4 Z" fill="#000000" />

        {/* Just enough scrim to keep the white mark off the flag's own whites */}
        <rect width="96" height="96" fill="#000000" opacity="0.12" />
      </g>

      {/* Wordmark */}
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="butt"
        style={{
          // Tight halo first so the mark survives crossing the flag's white
          // bands, then a soft drop for depth.
          filter:
            'drop-shadow(0 0 1.6px rgba(0,0,0,0.95)) drop-shadow(0 1px 2px rgba(0,0,0,0.55))',
        }}
      >
        {/* Dashed "C" — open on the right where the hearts sit */}
        <path
          d="M53.2 67.3 A24.5 24.5 0 1 1 53.2 25.5"
          strokeWidth="3.4"
          strokeDasharray="4.2 3.22"
        />
        <path d={HEART} transform="translate(46.9 19.05)" strokeWidth="2.6" strokeLinejoin="round" />
        <path d={HEART} transform="translate(46.9 61.65)" strokeWidth="2.6" strokeLinejoin="round" />
        <text
          x="47.5"
          y="55.2"
          textLength="30.5"
          lengthAdjust="spacingAndGlyphs"
          fill="#FFFFFF"
          stroke="none"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="19.5"
          fontWeight="600"
        >
          hat
        </text>
      </g>
    </svg>
  )
}
