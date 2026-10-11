import type { ReactElement } from 'react'

/**
 * A small drawing for each opener, at the end of its line.
 *
 * Keyed by the backend's topic number rather than by the words, so the icons
 * keep up if the wording of a starter is reworded on the server. Anything the
 * site hasn't got a drawing for falls back to a speech bubble, which is true of
 * every topic there could ever be.
 *
 * Line drawings, in the inherited colour: at this size a filled icon turns into
 * a blob, and these sit next to small text that already carries the meaning.
 */

interface IconProps {
  className?: string
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Heartbreak: the heart, with the break drawn through it. */
function BrokenHeart({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        {...stroke}
        d="M12 20.3C6.8 16.8 3.6 14 3.6 10.4a4.4 4.4 0 0 1 8.4-1.9 4.4 4.4 0 0 1 8.4 1.9c0 3.6-3.2 6.4-8.4 9.9Z"
      />
      <path {...stroke} d="m12.7 8.2-2.3 3.4 3 1.5-2.2 3.4" />
    </svg>
  )
}

/** Their behaviour: the question that doesn't have an answer yet. */
function PuzzledBubble({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path {...stroke} d="M4.4 4.9h15.2a2 2 0 0 1 2 2v7.7a2 2 0 0 1-2 2h-7.3L7.4 20v-3.4H4.4a2 2 0 0 1-2-2V6.9a2 2 0 0 1 2-2Z" />
      <path {...stroke} d="M10.1 8.9a2 2 0 1 1 2.6 2.3c-.6.3-.8.7-.8 1.3" />
      <circle cx="11.9" cy="14.3" r="0.85" fill="currentColor" />
    </svg>
  )
}

/** Something meaningful: two of them, joined. */
function LinkedRings({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <circle {...stroke} cx="9.1" cy="12.6" r="5.1" />
      <circle {...stroke} cx="14.9" cy="12.6" r="5.1" />
      <path {...stroke} d="M14.9 4.6a2.4 2.4 0 0 0-2.4 2.4" opacity="0.55" />
    </svg>
  )
}

/** Understanding yourself: what's going on inside your own head. */
function HeadAndHeart({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path {...stroke} d="M19.4 11.6a7.4 7.4 0 1 0-4 6.6v2.3a.8.8 0 0 1-.8.8H9.8" />
      <path {...stroke} d="M12 15.1c-2.3-1.6-3.6-2.8-3.6-4.3a1.95 1.95 0 0 1 3.6-.9 1.95 1.95 0 0 1 3.6.9c0 1.5-1.3 2.7-3.6 4.3Z" />
    </svg>
  )
}

function Bubble({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path {...stroke} d="M4.4 4.9h15.2a2 2 0 0 1 2 2v7.7a2 2 0 0 1-2 2h-7.3L7.4 20v-3.4H4.4a2 2 0 0 1-2-2V6.9a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

const BY_TOPIC: Record<number, (props: IconProps) => ReactElement> = {
  0: BrokenHeart,
  1: PuzzledBubble,
  2: LinkedRings,
  3: HeadAndHeart,
}

export default function TopicIcon({ topic, className = '' }: { topic: number; className?: string }) {
  const Icon = BY_TOPIC[topic] ?? Bubble
  return <Icon className={className} />
}
