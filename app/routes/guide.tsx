import { useLocation } from 'react-router'
import type { Route } from './+types/guide'
import { useTheme } from '../hooks/useTheme'
import { usePlatform } from '../hooks/usePlatform'
import { useVisitTracking } from '../hooks/useVisitTracking'
import Navbar from '../components/Navbar'
import GetTheApp from '../components/GetTheApp'
import { IconBadge, type IconName } from '../components/Icon'
import InAppBrowserHint from '../components/InAppBrowserHint'
import LegalSection from '../components/LegalSection'
import Footer from '../components/Footer'
import { GUIDE_LINKS, type GuideSlug } from '../guide-links'
import { GUIDES } from '../guides'

const SITE = 'https://www.chatphcreations.co.za'
const OG_IMAGE = `${SITE}/og-image.png`

/** Every route to this module has a slug from GUIDE_LINKS as its whole path. */
function slugOf(pathname: string) {
  return pathname.replace(/\//g, '') as GuideSlug
}

export function meta({ location }: Route.MetaArgs) {
  const slug = slugOf(location.pathname)
  const { title, description, headline, accent } = GUIDES[slug]
  const url = `${SITE}/${slug}`
  const shareTitle = `${headline} ${accent} — Ch@t`
  return [
    { title },
    { tagName: 'link', rel: 'canonical', href: url },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Ch@t' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: shareTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: OG_IMAGE },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en_ZA' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: shareTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: OG_IMAGE },
  ]
}

/* Every claim here is one the app keeps; see the same list in Safe.tsx. */
const PROTECTIONS: { icon: IconName; label: string }[] = [
  { icon: 'badge-check', label: 'Every profile verified' },
  { icon: 'map-pin', label: 'Your exact location is never shared' },
  { icon: 'lock', label: 'Chats can’t be screenshotted' },
  { icon: 'eye-off', label: 'Block anyone silently' },
  { icon: 'shield-check', label: 'Only phone-verified members can see you' },
  { icon: 'camera-off', label: 'Explicit photos can’t be sent' },
]

const SECTION = 'relative mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20'
const HEADING = 'font-syne mb-8 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl'

/**
 * A landing page for one search (see guides.ts for the words). The sections stay
 * the same from page to page: what you came for, how Ch@t gets you there, why
 * it's safe, the questions left, and the download.
 */
export default function Guide() {
  const { isDark, toggle } = useTheme()
  const { inApp } = usePlatform()
  const slug = slugOf(useLocation().pathname)
  const guide = GUIDES[slug]

  useVisitTracking()

  return (
    <div className={`min-h-screen ${inApp ? 'pb-28' : ''} bg-white text-gray-900 transition-colors duration-300 dark:bg-[#050505] dark:text-gray-100 overflow-x-hidden`}>
      <Navbar />

      <main>
        {/* Dark in both themes: the unscrolled navbar expects a dark backdrop. */}
        <header id="hero" data-track-section="hero" className="dark relative overflow-hidden bg-[#050505] px-5 pb-16 pt-32 text-center text-white sm:px-8 sm:pb-24 sm:pt-40">
          <div className="soft-glow pointer-events-none absolute left-1/2 top-0 h-[560px] w-[760px] max-w-[150vw] -translate-x-1/2 [--glow-alpha:0.2]" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-mint-ink">{guide.eyebrow}</p>
            <h1 className="poster-h font-syne mb-6 text-[2.6rem] sm:text-7xl">
              {guide.headline} <span className="text-mint-ink">{guide.accent}</span>
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl">{guide.sub}</p>
            <GetTheApp placement={`${slug}:hero`} />
          </div>
        </header>

        <section data-track-section="how" className={SECTION}>
          <h2 className={HEADING}>{guide.howHeading}</h2>
          <ol className="flex flex-col gap-6">
            {guide.steps.map(({ icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <IconBadge name={icon} size="sm" />
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {guide.compare && (
          <section data-track-section="compare" className={SECTION}>
            <h2 className={HEADING}>{guide.compare.heading}</h2>
            <dl className="flex flex-col gap-3">
              {guide.compare.rows.map(({ name, detail, ours }) => (
                <div key={name} className={`glass rounded-2xl p-5 ${ours ? 'border-mint/50' : ''}`}>
                  <dt className={`mb-1 font-semibold ${ours ? 'text-mint-ink' : 'text-gray-900 dark:text-gray-100'}`}>{name}</dt>
                  <dd className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section data-track-section="safe" className={SECTION}>
          <h2 className={HEADING}>{guide.safetyHeading}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PROTECTIONS.map(({ icon, label }) => (
              <li key={label} className="glass flex items-center gap-3 rounded-2xl p-4">
                <IconBadge name={icon} size="sm" />
                <span className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">{label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" data-track-section="faq" className={SECTION}>
          <h2 className={HEADING}>Before you ask</h2>
          <div className="flex flex-col gap-6">
            {guide.questions.map(({ q, a }) => (
              <div key={q}>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">{q}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="download" data-track-section="download" className="relative overflow-hidden px-5 py-20 text-center sm:px-8 sm:py-28">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="soft-glow h-[500px] w-[600px] [--glow-alpha:0.17]" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="poster-h font-syne mb-6 text-4xl sm:text-6xl">
              {guide.closing.headline} <span className="text-mint-ink">{guide.closing.accent}</span>
            </h2>
            <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-500 dark:text-gray-400">{guide.closing.sub}</p>
            <GetTheApp placement={`${slug}:final`} />
            <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Ch@t is for adults only.</p>
            {guide.footnote && <p className="mx-auto mt-2 max-w-md text-xs text-gray-500 dark:text-gray-400">{guide.footnote}</p>}
          </div>
        </section>
      </main>

      <LegalSection />
      <Footer isDark={isDark} onToggleTheme={toggle} />
      <InAppBrowserHint />
    </div>
  )
}
