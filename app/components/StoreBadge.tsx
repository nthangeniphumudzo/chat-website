/**
 * The store marks, drawn as vectors: the signature people look for before they
 * trust an install prompt.
 *
 * Small on purpose. These sit above the app's name on the floating card, where
 * the stores put them on their own install banners — the store says where the
 * tap goes, and the app's name gets the size.
 *
 * Decorative: the card around them is a link that already says where it goes,
 * so a screen reader announcing these as well would only say it twice.
 */

/** Apple's App Store mark: an "A" drawn as three separate strokes. */
export function AppStoreGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M4.6 18.4 11.1 5.8" />
        <path d="M12.9 5.8 19.4 18.4" />
        <path d="M8.1 14.2h7.8" />
      </g>
    </svg>
  )
}

/** Google Play's triangle, in its four colours. */
export function GooglePlayGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 13" className={className} aria-hidden="true" focusable="false">
      <path d="M0 1.5L9 6.5L0 11.5V1.5Z" fill="#00C853" />
      <path d="M0 1.5L9 6.5L11.5 4L3 0L0 1.5Z" fill="#00E676" />
      <path d="M11.5 4L9 6.5L11.5 9L14 6.5L11.5 4Z" fill="#FFD600" />
      <path d="M0 11.5L9 6.5L11.5 9L3 13L0 11.5Z" fill="#FF1744" />
    </svg>
  )
}
