import DownloadLink from './DownloadLink'
import { usePlatform } from '../hooks/usePlatform'

interface GetTheAppProps {
  placement: string
  /** Left-aligned beside copy on desktop, or centred on its own. */
  align?: 'center' | 'start'
  id?: string
  className?: string
}

const STORE_BUTTON =
  'inline-flex min-h-12 items-center justify-center rounded-full bg-mint px-6 text-base font-semibold text-gray-900 shadow-md shadow-mint/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-95'

/**
 * The page's one call to action, in the form that fits the device.
 *
 * On a phone it is a single button — the store is already known, so offering
 * both would only be a second decision to make.
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
        <div className="hidden items-center gap-5 rounded-3xl border border-gray-200 bg-white p-4 pr-6 text-left shadow-sm dark:border-gray-800 dark:bg-[#101010] pointer-fine:lg:flex">
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
            <p className="mt-3 flex gap-4 text-sm font-semibold">
              <DownloadLink placement={placement} store="app_store" className="text-mint-ink hover:underline">
                App Store
              </DownloadLink>
              <DownloadLink placement={placement} store="google_play" className="text-mint-ink hover:underline">
                Google Play
              </DownloadLink>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center pointer-fine:lg:hidden">
          <div className="flex flex-wrap justify-center gap-3">
            <DownloadLink placement={placement} store="app_store" className={STORE_BUTTON}>
              App Store
            </DownloadLink>
            <DownloadLink placement={placement} store="google_play" className={STORE_BUTTON}>
              Google Play
            </DownloadLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id={id} className={`flex flex-col ${alignment} ${className}`}>
      <DownloadLink
        placement={placement}
        aria-label="Download Ch@t"
        className="inline-flex min-h-14 items-center justify-center rounded-full bg-mint px-9 text-lg font-semibold text-gray-900 shadow-md shadow-mint/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95"
      >
        Download
      </DownloadLink>
    </div>
  )
}
