
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

export default function FloatingDownloadBar() {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 lg:hidden">
            <div className="max-w-sm mx-auto">
                <div className="relative mb-4">
                    <div className="flex items-center gap-3 bg-white dark:bg-[#0d0d0d] border border-mint/40 dark:border-mint/25 rounded-[2rem] px-4 py-3 shadow-[0_0_0_4px_rgba(0,230,160,0.08),0_8px_32px_rgba(0,230,160,0.18),0_4px_16px_rgba(0,0,0,0.14)]">
                        <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200" aria-label="Get it on Google Play">
                            <svg viewBox="0 0 180 53" className="h-9 w-auto" role="img" aria-label="Google Play Store">
                                <rect width="180" height="53" rx="6" fill="#000000" />
                                <rect x="0.5" y="0.5" width="179" height="52" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.5" fill="none" />
                                <g transform="translate(12, 10)">
                                    <path d="M0 3.5L18 16.5L0 29.5V3.5Z" fill="url(#fbPlayGradient)" />
                                    <path d="M0 3.5L18 16.5L23 11.5L5 0L0 3.5Z" fill="#00F076" />
                                    <path d="M23 11.5L18 16.5L23 21.5L28 16.5L23 11.5Z" fill="#FFD400" />
                                    <path d="M0 29.5L18 16.5L23 21.5L5 33L0 29.5Z" fill="#F33E48" />
                                    <path d="M0 3.5L5 0L28 16.5L5 33L0 29.5V3.5Z" fill="url(#fbPlayOverlay)" fillOpacity="0.1" />
                                    <defs>
                                        <linearGradient id="fbPlayGradient" x1="0" y1="16.5" x2="18" y2="16.5">
                                            <stop stopColor="#00D4FF" />
                                            <stop offset="1" stopColor="#00F076" />
                                        </linearGradient>
                                        <linearGradient id="fbPlayOverlay" x1="14" y1="0" x2="14" y2="33">
                                            <stop stopColor="white" />
                                            <stop offset="1" stopColor="white" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </g>
                                <text x="52" y="18" fill="#FFFFFF" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">GET IT ON</text>
                                <text x="52" y="36" fill="#FFFFFF" fontSize="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">Google Play</text>
                            </svg>
                        </a>
                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200" aria-label="Download on the App Store">
                            <svg viewBox="0 0 180 53" className="h-9 w-auto" role="img" aria-label="Apple App Store">
                                <rect width="180" height="53" rx="6" fill="#000000" />
                                <rect x="0.5" y="0.5" width="179" height="52" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.5" fill="none" />
                                <g transform="translate(14, 10)">
                                    <path d="M15.5 8.5C14.2 8.5 12.7 9.3 11.8 10.4C11 11.4 10.3 12.9 10.5 14.4C11.9 14.5 13.4 13.6 14.2 12.5C15 11.5 15.6 10 15.5 8.5ZM18.7 14.7C16.6 14.6 14.8 15.9 13.8 15.9C12.8 15.9 11.2 14.8 9.5 14.8C6.9 14.9 4.5 16.1 3.2 18.2C0.5 22.4 2.5 28.7 5.1 32C6.4 33.7 7.9 35.5 9.8 35.5C11.6 35.4 12.3 34.3 14.4 34.3C16.5 34.3 17.1 35.5 19 35.4C21 35.4 22.3 33.7 23.6 32C25.1 30.1 25.7 28.2 25.7 28.1C25.7 28 22.4 26.8 22.4 23C22.4 19.7 25 18.2 25.1 18.1C23.4 15.6 20.8 14.8 18.7 14.7Z" fill="#FFFFFF" />
                                </g>
                                <text x="48" y="18" fill="#FFFFFF" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.3">Download on the</text>
                                <text x="48" y="36" fill="#FFFFFF" fontSize="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">App Store</text>
                            </svg>
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
