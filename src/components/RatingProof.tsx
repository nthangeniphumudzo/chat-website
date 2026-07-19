import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePlatform } from '../hooks/usePlatform'
import { APP_STORE_URL, GOOGLE_PLAY_URL, trackDownload } from '../constants'
import avatar1 from '../assets/avatars/IMG_3097.webp'
import avatar2 from '../assets/avatars/IMG_3185.webp'
import avatar3 from '../assets/avatars/4a115dd1-ea95-4e48-b8f6-d53972ced8de.webp'
import avatar4 from '../assets/avatars/86f5a1dc-87c8-40eb-bc2e-97445b708ee3.webp'

/**
 * Proof band. Where Tinder/Bumble/Hinge run testimonials, we lead with the
 * genuine App Store rating — honest social proof for a newer app, no invented
 * quotes. Anchors on the real 4.8 and the verified/real-people promise.
 */
export default function RatingProof() {
  const ref = useScrollReveal<HTMLDivElement>()
  const platform = usePlatform()
  // iPhone → App Store; Android + unknown → Google Play (matches the rest of the site).
  const isIos = platform === 'ios'
  const url = isIos ? APP_STORE_URL : GOOGLE_PLAY_URL
  const store = isIos ? 'app_store' : 'google_play'

  return (
    <section className="panel items-center px-5 sm:px-8 overflow-hidden">
      {/* Mint glow — accent, not a full slate — matching the other panels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] sm:w-[650px] h-[300px] sm:h-[400px] bg-mint/15 rounded-full blur-[100px] sm:blur-[130px]" />
      </div>

      <div
        ref={ref}
        className="opacity-0 translate-y-8 transition-all duration-700 relative z-10 max-w-2xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-1.5 mb-5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-7 h-7 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p className="poster-h font-syne text-mint text-7xl sm:text-8xl lg:text-9xl leading-none mb-4">
          4.8
        </p>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-10">
          Rated on the App Store
        </p>

        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex -space-x-2">
            {[avatar1, avatar2, avatar3, avatar4].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-[#050505]"
              />
            ))}
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300 font-semibold text-left">
            Real, verified people —<br className="sm:hidden" /> already connecting near you
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDownload(store, 'rating_proof')}
          className="inline-flex items-center gap-2 rounded-full bg-mint px-8 py-4 font-syne font-bold text-base text-gray-900 shadow-lg shadow-mint/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-mint/40 active:scale-95 transition-all duration-200"
        >
          Join them — download free
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}
