import appStoreBadge from '../assets/app-store-badge.svg'
import googlePlayBadge from '../assets/google-play-badge.svg'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

export default function FloatingDownloadBar() {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 lg:hidden">
            <div className="max-w-sm mx-auto">
                <div className="relative mb-4">
                    <div className="flex items-center gap-3 bg-white dark:bg-[#0d0d0d] border border-mint/40 dark:border-mint/25 rounded-[2rem] px-4 py-3 shadow-[0_0_0_4px_rgba(0,230,160,0.08),0_8px_32px_rgba(0,230,160,0.18),0_4px_16px_rgba(0,0,0,0.14)]">
                        <a
                            href={APP_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center hover:opacity-80 active:scale-95 transition-all duration-200"
                        >
                            <img
                                src={appStoreBadge}
                                alt="Download on the App Store"
                                className="h-9 w-full object-contain dark:invert"
                            />
                        </a>
                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                        <a
                            href={GOOGLE_PLAY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center hover:opacity-80 active:scale-95 transition-all duration-200"
                        >
                            <img
                                src={googlePlayBadge}
                                alt="Get it on Google Play"
                                className="h-9 w-full object-contain dark:invert"
                            />
                        </a>
                    </div>
                    <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
                        <span className="bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1 text-[9px] font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase leading-none">
                            Free download · No ads
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
