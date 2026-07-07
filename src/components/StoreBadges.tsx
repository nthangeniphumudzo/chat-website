import googlePlayBadge from '../assets/google-play-badge.svg'
import appStoreBadge from '../assets/app-store-badge.svg'
import { GOOGLE_PLAY_URL, APP_STORE_URL, trackDownload } from '../constants'

interface StoreBadgesProps {
  placement: string
  id?: string
  className?: string
}

export default function StoreBadges({ placement, id, className = '' }: StoreBadgesProps) {
  return (
    <div id={id} className={`flex items-center justify-center gap-4 ${className}`}>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownload('google_play', placement)}
        className="h-12 w-40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <img src={googlePlayBadge} alt="Get it on Google Play" className="h-full w-full object-contain" />
      </a>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownload('app_store', placement)}
        className="h-12 w-40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <img src={appStoreBadge} alt="Download on the App Store" className="h-full w-full object-contain" />
      </a>
    </div>
  )
}
