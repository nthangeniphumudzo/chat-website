import type { ReactNode } from 'react'
import { usePlatform } from '../hooks/usePlatform'
import { trackDownload } from '../constants'
import { storeLink } from '../lib/platform'

interface DownloadLinkProps {
  placement: string
  className: string
  children: ReactNode
  'aria-label'?: string
}

/**
 * Every "get the app" button on the page goes through here, so there is one
 * place that knows how to reach a store from wherever the visitor is standing.
 *
 * - iPhone → App Store, everything else → Google Play (Play's web listing
 *   handles desktop fine).
 * - Phones link straight into the store *app* (see the deep links in
 *   constants.ts), so there's no web page to load before it opens.
 * - Phones open the store in the same tab. A new tab adds nothing on mobile,
 *   and in-app browsers can't open one at all.
 * - The button flips to "Opening…" the instant it's pressed (the listener
 *   lives in root.tsx so it works before hydration), so a store that takes a
 *   moment never makes the button look dead.
 *
 * The href is correct in the server-rendered HTML (the platform comes from the
 * request's user-agent), so a tap that lands before JS has loaded still goes to
 * the right store rather than dead-ending.
 */
export default function DownloadLink({ placement, className, children, ...rest }: DownloadLinkProps) {
  const platform = usePlatform()
  const link = storeLink(platform)

  return (
    <a
      href={link.href}
      target={link.newTab ? '_blank' : undefined}
      rel="noopener noreferrer"
      onClick={() => trackDownload(link.store, placement, platform.inApp)}
      data-download=""
      className={className}
      {...rest}
    >
      <span className="dl-idle">{children}</span>
      <span className="dl-busy">
        <span aria-hidden className="dl-spinner" />
        Opening…
      </span>
    </a>
  )
}
