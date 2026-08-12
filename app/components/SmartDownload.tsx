import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'

interface SmartDownloadProps {
  placement: string
  id?: string
  className?: string
}

/**
 * One calm "Download app" button. A deliberate press deep-links straight to the
 * visitor's own store — iPhone → App Store, everything else → Google Play.
 * (There is intentionally no auto-redirect on landing; only a real click acts.)
 */
export default function SmartDownload({ placement, id, className = '' }: SmartDownloadProps) {
  const platform = usePlatform()
  const isIos = platform === 'ios'
  const url = isIos ? APP_STORE_URL : GOOGLE_PLAY_URL
  const store = isIos ? 'app_store' : 'google_play'

  return (
    <div id={id} className={`flex ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownload(store, placement)}
        className="inline-flex flex-col items-center justify-center rounded-full bg-mint px-8 py-3.5 font-syne text-gray-900 shadow-md shadow-mint/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95"
      >
        <span className="text-base font-bold leading-tight text-center">
          Start meeting differently
        </span>
        <span className="mt-1 text-xs font-medium leading-tight text-center text-white/80">
          Download now
        </span>
      </a>
    </div>
  )
}
