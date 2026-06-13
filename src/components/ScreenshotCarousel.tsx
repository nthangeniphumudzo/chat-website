import { useEffect, useState } from 'react'
import {
    img_speed_date_inbox,
    img_explore,
    img_chats_list,
    img_screenshot_extra,
} from '../assets/images'

export default function ScreenshotCarousel() {
    const images = [
        { src: img_speed_date_inbox, alt: 'Speed Date inbox' },
        { src: img_explore, alt: 'Explore — cards' },
        { src: img_chats_list, alt: 'Chats list' },
        { src: img_screenshot_extra, alt: 'Uploaded extra screenshot' },
    ]

    const [index, setIndex] = useState(0)

    useEffect(() => {
        // Log image sources to help debug duplicate-image issues
        console.log('ScreenshotCarousel images:', images.map(i => i.src))
        const t = setInterval(() => setIndex(i => (i + 1) % images.length), 3000)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="w-full rounded-[28px] overflow-hidden relative">
            <div className="relative h-[320px] sm:h-[360px] w-full bg-gray-50 dark:bg-[#0b0b0b]">
                {images.map((imgObj, i) => (
                    <img
                        key={i}
                        src={imgObj.src}
                        alt={imgObj.alt}
                        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        loading={i === index ? 'eager' : 'lazy'}
                    />
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-3">
                {images.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Show screenshot ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full transition-all duration-200 ${i === index ? 'bg-mint scale-110' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
