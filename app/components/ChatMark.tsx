/**
 * The Ch@t wordmark — a dashed "C" opening onto two hearts, with "hat" set
 * inside it.
 *
 * Drawn as SVG rather than shipped as a bitmap so it stays crisp at any size,
 * keeps its hairline weight on retina screens, and is part of the HTML — it is
 * on screen the instant the page paints, with no request to wait on.
 *
 * It inherits `currentColor`, so it takes the colour of whatever it sits in and
 * works in both themes without a second asset.
 *
 * The viewBox is cropped to the mark's own bounds (centred on 46.1, 46.1) so it
 * fills the box it is given instead of floating in the middle of one.
 */

// Bottom-point heart, ~13 x 11.5, drawn at the origin and positioned by its
// wrapping <g> — the path's own transform is left free for CSS to animate.
const HEART =
  'M6.5 11.5 C6.5 11.5 0.4 7.6 0.4 3.9 C0.4 1.6 2.4 0.4 4.2 1.3 ' +
  'C5.3 1.85 6.1 2.8 6.5 3.6 C6.9 2.8 7.7 1.85 8.8 1.3 ' +
  'C10.6 0.4 12.6 1.6 12.6 3.9 C12.6 7.6 6.5 11.5 6.5 11.5 Z'

interface ChatMarkProps {
  className?: string
  title?: string
}

export default function ChatMark({ className, title = 'Ch@t' }: ChatMarkProps) {
  return (
    <svg
      viewBox="8 8 76 76"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="butt">
        {/* Dashed "C" — open on the right, where the hearts sit.
            The arc lies on a circle centred (40.42, 46.4) r=24.5. Its ends stop
            where the stroke meets each heart, so the dashes touch the hearts
            without running through them — the endpoints used to sit on the
            heart *centres*, which put dashes straight across both of them.
            The dash gap is 3.42 so the arc's 88.04 length divides into exactly
            12 dashes: it begins and ends on a whole dash, never a clipped one. */}
        <path
          d="M45.91 70.28 A24.5 24.5 0 1 1 45.91 22.52"
          strokeWidth="3.4"
          strokeDasharray="4.2 3.42"
        />

        {/* Classed so the loading overlay can give them a heartbeat. Inert
            everywhere else — the mark is still, not animated. */}
        <g transform="translate(46.9 19.05)">
          <path className="mark-heart mark-heart-top" d={HEART} strokeWidth="2.6" strokeLinejoin="round" />
        </g>
        <g transform="translate(46.9 61.65)">
          <path className="mark-heart mark-heart-bottom" d={HEART} strokeWidth="2.6" strokeLinejoin="round" />
        </g>

        <text
          x="47.5"
          y="55.2"
          textLength="30.5"
          lengthAdjust="spacingAndGlyphs"
          fill="currentColor"
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
