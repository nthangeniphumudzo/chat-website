import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'

interface SmartDownloadProps {
  placement: string
  id?: string
  className?: string
}

/**
 * One calm, platform-aware download button.
 *
 * iPhone → App Store, everything else (Android + desktop) → Google Play.
 * Deliberately quiet: a single button, no badges, no reassurance stack — the
 * page shouldn't shout "download" at every turn. People meet it naturally as
 * they scroll.
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
        className="inline-flex items-center justify-center rounded-full bg-mint px-8 py-3.5 font-syne text-base font-bold text-gray-900 shadow-md shadow-mint/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95"
      >
        Download app
      </a>
    </div>
  )
}
