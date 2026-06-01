// React import not required with new JSX transform
import googlePlayBadge from '../assets/google-play-badge.svg'
import appStoreBadge from '../assets/app-store-badge.svg'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/xeFze9Fv'

export default function FloatingDownloadBar() {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 lg:hidden">
            <div className="max-w-3xl mx-auto flex items-center gap-3 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-[28px] p-3 shadow-lg">
                <a
                    href={TESTFLIGHT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 rounded-full bg-mint text-gray-900 font-medium px-4 py-2 hover:opacity-95 transition"
                >
                    <img src={appStoreBadge} alt="TestFlight iOS beta" className="h-6 object-contain" />
                    <span className="hidden sm:inline">iOS Beta</span>
                </a>

                <a
                    href={GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 rounded-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 px-3 py-2 hover:opacity-95 transition"
                >
                    <img src={googlePlayBadge} alt="Get Chat on Google Play" className="h-6 object-contain" />
                    <span className="hidden sm:inline">Android</span>
                </a>
            </div>
        </div>
    )
}
