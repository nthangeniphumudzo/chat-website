import { IconBadge, type IconName } from './Icon'

/* Three chapters of one love story, told from the visitor's side. Only the
   middle one hints at how Ch@t works — through the feeling it gives ("you can
   hear who they are"), never the feature's name. Everything else about the app
   is found in the app. */
const CHAPTERS: { icon: IconName; label: string; title: string; body: string }[] = [
  {
    icon: 'hourglass',
    label: 'Before',
    title: 'You’ve been patient.',
    body: 'A thousand faces swiped past. A hundred “hey”s that went nowhere. And the quiet question at the end of the night: is my person even out there?',
  },
  {
    icon: 'message-heart',
    label: 'Then',
    title: 'Someone answers.',
    body: 'Really answers. And before you’ve seen a single photo, you can hear who they are — the humour, the honesty, the things that never fit in a bio.',
  },
  {
    icon: 'heart-handshake',
    label: 'After',
    title: 'You stop looking.',
    body: 'A first conversation that doesn’t feel like work. A first date you can’t wait for. And maybe, the person who makes all the waiting make sense.',
  },
]

/**
 * The page's story. It sells what people came for — finding someone — rather
 * than what the app does to get them there.
 */
export default function Story() {
  return (
    <section id="story" data-track-section="story" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center sm:mb-20">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-mint-ink">Your story</p>
          <h2 className="poster-h font-syne text-4xl sm:text-6xl">
            Every love story <span className="text-mint-ink">starts somewhere.</span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {CHAPTERS.map(({ icon, label, title, body }) => (
            <li key={label} className="flex flex-col items-center text-center md:items-start md:text-left">
              <IconBadge name={icon} />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">{label}</p>
              <h3 className="mt-3 font-syne text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h3>
              <p className="mx-auto mt-4 max-w-sm text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:mx-0">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
