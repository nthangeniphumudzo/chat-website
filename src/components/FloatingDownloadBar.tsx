// React import not required with new JSX transform
import googlePlayBadge from '../assets/google-play-badge.svg'
import appStoreBadge from '../assets/app-store-badge.svg'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

export default function FloatingDownloadBar() {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 lg:hidden">
            <div className="max-w-3xl mx-auto flex items-center gap-3 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-[28px] p-3 shadow-lg">
                <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 rounded-full bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-800 px-3 py-2 hover:opacity-95 transition"
                >
                    <img src={appStoreBadge} alt="Download on the App Store" className="h-6 object-contain" />
                    <span className="hidden sm:inline text-gray-800 dark:text-gray-200">App Store</span>
                </a>

                <a
                    href={GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 rounded-full bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-800 px-3 py-2 hover:opacity-95 transition"
                >
                    <img src={googlePlayBadge} alt="Get it on Google Play" className="h-6 object-contain dark:invert" />
                    <span className="hidden sm:inline text-gray-800 dark:text-gray-200">Android</span>
                </a>
            </div>
        </div>
    )
}
