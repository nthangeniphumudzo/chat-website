/**
 * A four-pointed sparkle — the mark this page uses wherever something is
 * written for you rather than typed by a person.
 *
 * It does the saying, so the words don't have to: the page never announces the
 * technology, because "AI" is a claim about how it works rather than what it
 * does for the visitor. The shape is the one people have learned to read that
 * way everywhere else.
 */
export default function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 1.6c.33 0 .62.21.72.52l1.37 4.2a5.4 5.4 0 0 0 3.42 3.42l4.2 1.37a.76.76 0 0 1 0 1.44l-4.2 1.37a5.4 5.4 0 0 0-3.42 3.42l-1.37 4.2a.76.76 0 0 1-1.44 0l-1.37-4.2a5.4 5.4 0 0 0-3.42-3.42l-4.2-1.37a.76.76 0 0 1 0-1.44l4.2-1.37a5.4 5.4 0 0 0 3.42-3.42l1.37-4.2c.1-.31.39-.52.72-.52z"
      />
      <path
        fill="currentColor"
        opacity="0.75"
        d="M19.4 2.2c.14 0 .26.09.3.22l.42 1.28c.13.4.44.71.84.84l1.28.42a.32.32 0 0 1 0 .6l-1.28.42c-.4.13-.71.44-.84.84l-.42 1.28a.32.32 0 0 1-.6 0l-.42-1.28a1.35 1.35 0 0 0-.84-.84l-1.28-.42a.32.32 0 0 1 0-.6l1.28-.42c.4-.13.71-.44.84-.84l.42-1.28a.32.32 0 0 1 .3-.22z"
      />
    </svg>
  )
}
