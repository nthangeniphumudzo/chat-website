import { lqipFor } from '../assets/images'

interface ScreenshotProps {
  src: string
  alt: string
  className?: string
  /**
   * Jump the network queue. Only worth setting on the single screenshot the
   * visitor sees first — marking several "high" just flattens the ordering
   * again and none of them arrives sooner.
   */
  priority?: boolean
  draggable?: boolean
}

/**
 * An app screenshot that is never an empty box.
 *
 * Every screenshot ships with a 24px-wide copy of itself inlined in the HTML
 * (see scripts/generate-lqip.mjs). That copy is set as the image's own
 * background, so the browser paints a blurred stand-in — real colours, real
 * layout — in the same instant it paints the page, before the screenshot has
 * been requested. Because the WebPs are opaque, the full-size image covers the
 * blur the moment it decodes.
 *
 * This is the same trick the flag icon gets for free by being inline SVG: the
 * thing you see does not wait on a second network round-trip.
 *
 * Nothing here lazy-loads. The whole site's screens are fetched during the
 * initial load — under the loader and the hero's strike sequence — so that by
 * the time a visitor scrolls, every panel below is already decoded and waiting.
 * Scrolling should reveal content, never start fetching it. The screenshots are
 * ~20K each and only one theme's set is ever in the DOM, so the whole page
 * costs less than a single photograph would.
 */
export default function Screenshot({
  src,
  alt,
  className = '',
  priority,
  draggable,
}: ScreenshotProps) {
  const placeholder = lqipFor[src]

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full block shot ${className}`}
      // The screenshots are all the same shape, so the box is reserved before
      // anything loads and nothing shifts when it does.
      width={420}
      height={913}
      fetchPriority={priority ? 'high' : undefined}
      // Never block the main thread on decode — these arrive mid-scroll.
      decoding="async"
      draggable={draggable}
      style={placeholder ? { backgroundImage: `url("${placeholder}")` } : undefined}
    />
  )
}
