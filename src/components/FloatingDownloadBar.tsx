// React import not required with new JSX transform

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

export default function FloatingDownloadBar() {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 lg:hidden">
            <div className="max-w-sm mx-auto">
                <div className="relative mb-4">
                    <div className="flex items-stretch gap-2.5 bg-white dark:bg-[#0d0d0d] border border-mint/40 dark:border-mint/25 rounded-[2rem] p-2 shadow-[0_0_0_4px_rgba(0,230,160,0.08),0_8px_32px_rgba(0,230,160,0.18),0_4px_16px_rgba(0,0,0,0.14)]">
                        <a
                            href={APP_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#00e6a0] text-gray-900 font-semibold text-sm px-4 py-3.5 active:scale-95 hover:bg-[#00c88a] transition-all duration-200 shadow-[0_2px_14px_rgba(0,230,160,0.4)]"
                        >
                            <AppleIcon className="w-[18px] h-[18px] flex-shrink-0" />
                            <span>App Store</span>
                        </a>
                        <a
                            href={GOOGLE_PLAY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 dark:bg-[#f0f0f0] text-white dark:text-gray-900 font-semibold text-sm px-4 py-3.5 active:scale-95 hover:bg-gray-800 dark:hover:bg-white transition-all duration-200"
                        >
                            <GooglePlayIcon className="w-[16px] h-[16px] flex-shrink-0" />
                            <span>Google Play</span>
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

function AppleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    )
}

function GooglePlayIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3.18 23.76c.3.17.64.24.99.19l12.6-7.27-2.7-2.7-10.89 9.78zm-1.97-20.52C1.07 3.55 1 3.89 1 4.26v15.48c0 .37.07.71.21 1.02l.09.08 8.67-8.67v-.2L1.3 3.16l-.09.08zM20.54 10.7l-2.46-1.42-3.06 3.06 3.06 3.06 2.48-1.43c.71-.41.71-1.87-.02-2.27zm-18.35 12.5l.08-.05 12.61-7.28-2.69-2.7-10 10.03z" />
        </svg>
    )
}
