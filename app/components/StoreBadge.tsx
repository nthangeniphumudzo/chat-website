/**
 * The store badges, drawn as vectors: the signature people look for before they
 * trust an install prompt.
 *
 * Each phone gets its own — Apple's on an iPhone, Google's on Android — in the
 * black-badge form both stores publish, so the card reads as the real thing
 * rather than a website's idea of a download button. Vector rather than the
 * stores' image files: no extra request, crisp at any size, and it follows the
 * card's own scale.
 *
 * The lettering uses the phone's own UI font (San Francisco on iOS, Roboto on
 * Android), which is what each badge is set in on the device anyway.
 */

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif'

/** Apple's badge, at its published 120 × 40 proportions. */
export function AppStoreBadge({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} role="img" aria-label="Download on the App Store">
      <rect width="120" height="40" rx="6.6" fill="#000" />
      <rect x="0.5" y="0.5" width="119" height="39" rx="6.1" fill="none" stroke="#A6A6A6" strokeWidth="1" />
      <g transform="translate(11.5 10.2) scale(1.02)" fill="#fff">
        <path d="M9.27 2.03C9.8 1.38 10.16.51 10.06 0c-.77.06-1.7.52-2.24 1.17C7.3 1.74 6.9 2.63 7.01 3.44c.85.07 1.73-.38 2.26-1.41zm.63 1.33c-1.26-.07-2.33.71-2.93.71-.61 0-1.53-.68-2.53-.66C3.1 3.43 1.77 4.2 1.05 5.44-.4 7.92.53 11.57 1.96 13.56c.7.99 1.53 2.1 2.62 2.06 1.04-.04 1.45-.67 2.71-.67 1.27 0 1.63.67 2.73.65 1.13-.02 1.84-1.01 2.53-2 .8-1.14 1.13-2.25 1.15-2.31-.03-.01-2.2-.84-2.22-3.34-.02-2.09 1.71-3.09 1.79-3.14-.98-1.44-2.5-1.6-3.07-1.65z" />
      </g>
      <text x="32" y="16.5" fill="#fff" fontFamily={FONT} fontSize="7.6" letterSpacing="0.2">
        Download on the
      </text>
      <text x="31.4" y="31" fill="#fff" fontFamily={FONT} fontSize="15.5" fontWeight="500" letterSpacing="-0.3">
        App Store
      </text>
    </svg>
  )
}

/** Google's badge, at its published 135 × 40 proportions. */
export function GooglePlayBadge({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 135 40" className={className} role="img" aria-label="Get it on Google Play">
      <rect width="135" height="40" rx="6.6" fill="#000" />
      <rect x="0.5" y="0.5" width="134" height="39" rx="6.1" fill="none" stroke="#A6A6A6" strokeWidth="1" />
      <g transform="translate(10.5 10) scale(1.5)">
        <path d="M0 1.5L9 6.5L0 11.5V1.5Z" fill="#00C853" />
        <path d="M0 1.5L9 6.5L11.5 4L3 0L0 1.5Z" fill="#00E676" />
        <path d="M11.5 4L9 6.5L11.5 9L14 6.5L11.5 4Z" fill="#FFD600" />
        <path d="M0 11.5L9 6.5L11.5 9L3 13L0 11.5Z" fill="#FF1744" />
      </g>
      <text x="36" y="16.5" fill="#fff" fontFamily={FONT} fontSize="7.2" letterSpacing="1.1">
        GET IT ON
      </text>
      <text x="35.4" y="31" fill="#fff" fontFamily={FONT} fontSize="15.5" fontWeight="500" letterSpacing="-0.2">
        Google Play
      </text>
    </svg>
  )
}
