import DownloadLink from './DownloadLink'
import { OfficialStoreBadge } from './StoreBadge'
import { usePlatform } from '../hooks/usePlatform'

interface GetTheAppProps {
  placement: string
  /** Left-aligned beside copy on desktop, or centred on its own. */
  align?: 'center' | 'start'
  id?: string
  className?: string
}

const STORE_BADGE = 'dl-badge inline-block rounded-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-95'

/**
 * The page's one call to action, in the form that fits the device.
 *
 * On a phone it is that phone's store badge alone — App Store on an iPhone,
 * Google Play on Android. The store is already known, so offering both would
 * only be a second decision to make.
 *
 * On a computer a store button leads nowhere useful: the app can't be installed
 * there, and "I'll do it on my phone later" rarely happens. So desktop gets a QR
 * code to scan now, with both store listings beside it for anyone who'd rather
 * send themselves the link. The code encodes /get, which picks the store on the
 * phone that scans it. A device we can't place gets both store buttons.
 *
 * The platform comes from the request (see usePlatform), so the server renders
 * the right variant and nothing swaps after hydration.
 */
export default function GetTheApp({ placement, align = 'center', id, className = '' }: GetTheAppProps) {
  const { os } = usePlatform()
  const alignment = align === 'start' ? 'items-center lg:items-start' : 'items-center'

  if (os === 'unknown') {
    return (
      <div id={id} className={`flex flex-col ${alignment} ${className}`}>
        {/* The user-agent couldn't name a phone, but that doesn't make this a
            computer: iPads and phones on "desktop site" both report as a Mac.
            So the QR card is only shown on a large screen with a mouse — a
            phone can't scan its own screen — and everything else gets both
            store buttons. */}
        <div className="glass hidden items-center gap-5 rounded-3xl p-4 pr-6 text-left pointer-fine:lg:flex">
          {/* White tile in both themes: phone cameras read dark-on-light far more
              reliably than an inverted code. */}
          <div className="rounded-2xl bg-white p-2.5 ring-1 ring-black/5">
            <img src="/get-qr.svg" alt="QR code to download Ch@t" width={112} height={112} className="block h-28 w-28" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">Scan to download</p>
            <p className="mt-1 max-w-[12rem] text-sm leading-snug text-gray-500 dark:text-gray-400">
              Point your phone’s camera here.
            </p>
            <p className="mt-3 flex gap-2">
              <DownloadLink placement={placement} store="app_store" className={STORE_BADGE}>
                <OfficialStoreBadge store="app_store" className="h-9" />
              </DownloadLink>
              <DownloadLink placement={placement} store="google_play" className={STORE_BADGE}>
                <OfficialStoreBadge store="google_play" className="h-9" />
              </DownloadLink>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center pointer-fine:lg:hidden">
          <div className="flex flex-wrap justify-center gap-3">
            <DownloadLink placement={placement} store="app_store" className={STORE_BADGE}>
              <OfficialStoreBadge store="app_store" className="h-12" />
            </DownloadLink>
            <DownloadLink placement={placement} store="google_play" className={STORE_BADGE}>
              <OfficialStoreBadge store="google_play" className="h-12" />
            </DownloadLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id={id} className={`flex flex-col ${alignment} ${className}`}>
      {/* The phone's own store, as the store's own badge: the one mark people
          already trust to install from. The link still goes straight into
          the store app (DownloadLink picks the deep link for this phone). */}
      <DownloadLink placement={placement} className={STORE_BADGE}>
        <OfficialStoreBadge store={os === 'ios' ? 'app_store' : 'google_play'} className="h-14" />
      </DownloadLink>
    </div>
  )
}
