import DownloadLink from './DownloadLink'

interface SmartDownloadProps {
  placement: string
  id?: string
  className?: string
}

/** One calm "Get the app" button. Store routing lives in DownloadLink. */
export default function SmartDownload({ placement, id, className = '' }: SmartDownloadProps) {
  return (
    <div id={id} className={`flex ${className}`}>
      <DownloadLink
        placement={placement}
        className="inline-flex items-center justify-center rounded-full bg-mint px-8 py-3.5 font-syne text-base font-bold text-gray-900 shadow-md shadow-mint/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/30 active:scale-95"
      >
        Get the app
      </DownloadLink>
    </div>
  )
}
