import { useEffect, useState } from 'react'

/**
 * How much of the screen the on-screen keyboard is covering, in CSS pixels.
 *
 * A phone keyboard doesn't resize the page — it shrinks the *visual* viewport
 * and leaves the layout alone, which is why a `position: fixed` bar pinned to
 * the bottom ends up behind it. The difference between the two viewports is the
 * keyboard, so that is what this measures, and the composer sits on top of it.
 *
 * `offsetTop` matters as much as `height`: on iPhone the page scrolls up under
 * the keyboard rather than resizing, and without that term the bar drifts as
 * the visitor scrolls with the keyboard open.
 *
 * Returns 0 where there is no keyboard (every desktop, and any browser without
 * visualViewport), so the caller can use it unconditionally.
 */
export function useKeyboardInset(): number {
  const [inset, setInset] = useState(0)

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      // Measured a frame later: iOS reports the two viewports mid-animation,
      // and acting on every intermediate value makes the bar judder.
      frame = requestAnimationFrame(() => {
        const covered = window.innerHeight - vv.height - vv.offsetTop
        // Under ~80px it is browser chrome (an address bar collapsing), not a
        // keyboard; treating that as a keyboard would lift the bar off the
        // bottom edge for no reason.
        setInset(covered > 80 ? Math.round(covered) : 0)
      })
    }

    measure()
    vv.addEventListener('resize', measure)
    vv.addEventListener('scroll', measure)
    return () => {
      cancelAnimationFrame(frame)
      vv.removeEventListener('resize', measure)
      vv.removeEventListener('scroll', measure)
    }
  }, [])

  return inset
}
