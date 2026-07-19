import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'
import StoreBadges from './StoreBadges'

interface SmartDownloadProps {
  placement: string
  id?: string
  className?: string
  /** Small reassurance line under the button. Defaults on. */
  reassure?: boolean
}

/**
 * Platform-aware primary CTA.
 *
 * On a known mobile platform (the bulk of paid-social traffic) it collapses the
 * two store badges into ONE large, thumb-friendly button that deep-links
 * straight to the right store — no "which store?" decision, no tiny tap target.
 * On desktop / unknown it falls back to both badges so visitors can choose.
 */
export default function SmartDownload({ placement, id, className = '', reassure = true }: SmartDownloadProps) {
  const platform = usePlatform()

  if (platform === 'unknown') {
    return (
      <div id={id} className={`flex flex-col items-center ${className}`}>
        <StoreBadges placement={placement} className="lg:justify-start" />
        {reassure && (
          <p className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
            Free · iPhone &amp; Android · Takes 30 seconds
          </p>
        )}
      </div>
    )
  }

  const isIos = platform === 'ios'
  const url = isIos ? APP_STORE_URL : GOOGLE_PLAY_URL
  const store = isIos ? 'app_store' : 'google_play'
  const otherUrl = isIos ? GOOGLE_PLAY_URL : APP_STORE_URL
  const otherStore = isIos ? 'google_play' : 'app_store'
  const otherLabel = isIos ? 'Also on Google Play' : 'Also on the App Store'

  return (
    <div id={id} className={`flex flex-col items-center ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownload(store, placement)}
        className="group inline-flex w-full max-w-sm items-center justify-center gap-2.5 rounded-full bg-mint px-8 py-4 font-syne text-lg font-extrabold text-gray-900 shadow-lg shadow-mint/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-mint/40 active:scale-95"
      >
        {isIos ? (
          <svg viewBox="0 0 384 512" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
        ) : (
          <svg viewBox="0 0 512 512" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
          </svg>
        )}
        Download Free
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </a>

      {reassure && (
        <p className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
          Free · No swiping · Takes 30 seconds
        </p>
      )}

      <a
        href={otherUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownload(otherStore, `${placement}_other`)}
        className="mt-2 text-xs font-medium text-gray-400 underline-offset-2 hover:text-mint hover:underline dark:text-gray-500"
      >
        {otherLabel}
      </a>
    </div>
  )
}
