import { useCallback, useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router'
import type { Route } from './+types/advisor'
import ChatMark from '../components/ChatMark'
import Turnstile from '../components/Turnstile'
import Sparkle from '../components/Sparkle'
import TopicIcon from '../components/TopicIcon'
import { useKeyboardInset } from '../hooks/useKeyboardInset'
import {
  AdvisorError,
  fetchConfig,
  getVisitorId,
  loadConversation,
  saveConversation,
  sendMessage,
  sessionIsLive,
  startConversation,
  type AdvisorConfig,
  type AdvisorMessage,
  type CrisisResource,
  type StoredConversation,
  type Usage,
} from '../lib/advisor'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Relationship Advisor — Ch@t' },
    {
      name: 'description',
      content:
        'Talk through heartbreak, mixed signals or what you want next — privately, in your own words, any time. A free relationship advisor from Ch@t.',
    },
    { property: 'og:title', content: 'Relationship Advisor — Ch@t' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://www.chatphcreations.co.za/advisor' },
    {
      property: 'og:description',
      content: 'Talk through heartbreak, mixed signals or what you want next — privately, in your own words, any time.',
    },
  ]
}

/**
 * The advisor's settings are fetched here rather than in the browser so the
 * crisis numbers, the openers and the Turnstile key are in the HTML itself —
 * the "Need help now?" panel has to be on the page from the first paint, not
 * one round trip later. If the backend can't be reached the page still renders
 * and asks the browser to try (see the effect below).
 */
export async function loader() {
  try {
    return { config: await fetchConfig() }
  } catch {
    return { config: null }
  }
}

/** Lives outside the component so a re-render can't lose it mid-conversation. */
type SessionState = 'loading' | 'verifying' | 'ready' | 'blocked' | 'unavailable'

export default function Advisor() {
  const serverConfig = useLoaderData<typeof loader>().config
  const [config, setConfig] = useState<AdvisorConfig | null>(serverConfig)
  const [state, setState] = useState<SessionState>('loading')
  const [messages, setMessages] = useState<AdvisorMessage[]>([])
  const [streaming, setStreaming] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [usage, setUsage] = useState<Usage | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [turnstileKey, setTurnstileKey] = useState(0)
  const [sending, setSending] = useState(false)

  // How much of the screen the keyboard is covering, so the composer can sit
  // on top of it rather than behind it.
  const keyboard = useKeyboardInset()
  const composer = useRef<HTMLFormElement | null>(null)
  const input = useRef<HTMLTextAreaElement | null>(null)
  const end = useRef<HTMLDivElement | null>(null)
  const [composerHeight, setComposerHeight] = useState(96)

  const stored = useRef<StoredConversation | null>(null)
  const visitorId = useRef<string>('')
  // A message that lost its session mid-flight, waiting for a fresh one.
  const retry = useRef<{ text: string; topic?: number } | null>(null)
  const scroller = useRef<HTMLDivElement | null>(null)

  const maxChars = config?.limits.maxMessageChars ?? 2000

  /* ── Setting up ────────────────────────────────────────────────── */

  useEffect(() => {
    const abort = new AbortController()

    visitorId.current = getVisitorId()
    const existing = loadConversation()
    if (existing) {
      stored.current = existing
      setMessages(existing.messages)
    }

    const load = serverConfig ? Promise.resolve(serverConfig) : fetchConfig(abort.signal)

    load
      .then(cfg => {
        setConfig(cfg)
        if (!cfg.enabled) {
          setState('unavailable')
          setNotice('The advisor is resting right now. Please try again later.')
          return
        }
        // A live session survives a reload; otherwise Turnstile has to speak
        // first, and `onToken` takes it from there.
        setState(sessionIsLive(stored.current) ? 'ready' : 'verifying')
      })
      .catch((err: unknown) => {
        if (abort.signal.aborted) return
        setState('unavailable')
        setNotice(err instanceof AdvisorError ? err.message : 'The advisor is unavailable right now. Please try again later.')
      })

    return () => abort.abort()
    // serverConfig is fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The composer is out of the flow, so the page has to reserve its height —
  // which changes as the textarea grows and as the status line appears.
  useEffect(() => {
    const el = composer.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => setComposerHeight(el.offsetHeight))
    ro.observe(el)
    setComposerHeight(el.offsetHeight)
    return () => ro.disconnect()
  }, [])

  /* If the field ever ends up under the keyboard — iOS can scroll it there
     during momentum, and a page that scrolls while you type can too — there is
     no point keeping the keyboard up over something the visitor can't see. It
     is dismissed, which hands the whole screen back. */
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const check = () => {
      const field = input.current
      if (!field || document.activeElement !== field) return
      const box = composer.current?.getBoundingClientRect()
      if (!box) return
      // The bottom of what the visitor can see, in page coordinates.
      const visibleBottom = vv.offsetTop + vv.height
      // A little tolerance, so a pixel of rounding doesn't close the keyboard.
      if (box.bottom - visibleBottom > 24) field.blur()
    }

    vv.addEventListener('resize', check)
    vv.addEventListener('scroll', check)
    window.addEventListener('scroll', check, { passive: true })
    return () => {
      vv.removeEventListener('resize', check)
      vv.removeEventListener('scroll', check)
      window.removeEventListener('scroll', check)
    }
  }, [])

  // Follow the conversation down as it grows — and again when the keyboard
  // opens, so the last thing said stays in view above it.
  useEffect(() => {
    if (messages.length === 0 && streaming === null) return
    // The last thing said, brought to rest just above the composer. Scrolling
    // to the foot of the document instead would carry the visitor past the
    // conversation and park them on the footnotes, which are nobody's business
    // unless they go looking.
    end.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [messages, streaming, keyboard])

  const persist = useCallback((next: Partial<StoredConversation> & { messages?: AdvisorMessage[] }) => {
    if (!stored.current) return
    stored.current = { ...stored.current, ...next }
    saveConversation(stored.current)
  }, [])

  /* ── The human check, and the session it buys ──────────────────── */

  const onToken = useCallback(
    async (token: string) => {
      try {
        const session = await startConversation({
          visitorId: visitorId.current,
          turnstileToken: token,
          // Present only when picking an old conversation back up, which keeps
          // the transcript attached to it.
          conversationId: stored.current?.conversationId,
        })

        stored.current = {
          conversationId: session.conversationId,
          sessionToken: session.sessionToken,
          sessionExpiresAt: session.sessionExpiresAt,
          topic: stored.current?.topic,
          messages: stored.current?.messages ?? [],
        }
        saveConversation(stored.current)
        setUsage(session.usage)
        setState('ready')
        setNotice(null)

        // Something was typed while the session was being renewed.
        const waiting = retry.current
        retry.current = null
        if (waiting) void send(waiting.text, waiting.topic, true)
      } catch (err) {
        handleError(err)
      }
    },
    // send is defined below and stable enough for this one call; the lint rule
    // would have us hoist both into a reducer for no gain.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  function handleError(err: unknown) {
    if (!(err instanceof AdvisorError)) {
      setNotice('Something went wrong. Please try again.')
      return
    }

    switch (err.code) {
      case 'advisor_session_invalid':
        // The token aged out. Ask Turnstile for another; the message that was
        // in flight is already parked in `retry`.
        setState('verifying')
        setTurnstileKey(k => k + 1)
        setNotice(null)
        break
      case 'advisor_verification_failed':
        setState('verifying')
        setTurnstileKey(k => k + 1)
        setNotice(err.message)
        break
      case 'ADVISOR_DAILY_LIMIT_EXCEEDED':
      case 'ADVISOR_START_LIMIT_EXCEEDED':
      case 'ADVISOR_DAILY_BUDGET_REACHED':
      case 'advisor_unavailable':
        setState('blocked')
        setNotice(err.message)
        break
      default:
        setNotice(err.message)
    }
  }

  /* ── Sending ───────────────────────────────────────────────────── */

  async function send(text: string, topic?: number, isRetry = false) {
    const body = text.trim()
    if (!body || sending) return

    if (!stored.current || !sessionIsLive(stored.current)) {
      // Park it and let the fresh token pick it up.
      retry.current = { text: body, topic }
      setState('verifying')
      setTurnstileKey(k => k + 1)
      if (!isRetry) setDraft('')
      return
    }

    const history = stored.current.messages
    const mine: AdvisorMessage = { role: 'user', content: body }

    setSending(true)
    setNotice(null)
    setDraft('')
    setMessages([...history, mine])
    setStreaming('')

    // The visitor's own message is kept whatever happens next, so a failed
    // reply can be retried without retyping it.
    persist({ messages: [...history, mine], topic: topic ?? stored.current.topic })

    let answer = ''
    try {
      await sendMessage(
        {
          conversationId: stored.current.conversationId,
          sessionToken: stored.current.sessionToken,
          message: body,
          history,
          topic: history.length === 0 ? (topic ?? stored.current.topic) : undefined,
        },
        {
          onMeta: meta => setUsage(meta.usage),
          onDelta: chunk => {
            answer += chunk
            setStreaming(answer)
          },
          onDone: done => {
            // `replaced` means the model's reply was swapped for a safe one, so
            // what is on screen is not what should be kept.
            const final = done.message
            setStreaming(null)
            setMessages([...history, mine, final])
            persist({ messages: [...history, mine, final] })
            if (done.usage) setUsage(done.usage)
          },
        },
      )
    } catch (err) {
      setStreaming(null)
      if (err instanceof AdvisorError && err.code === 'advisor_session_invalid') retry.current = { text: body, topic }
      handleError(err)
    } finally {
      setSending(false)
    }
  }

  /* Starting over and deleting are not offered on the page for now: a
     conversation simply stays on the device until the visitor clears their
     browser data. The backend calls for both still exist (see lib/advisor) for
     whenever that changes. */

  const canType = state === 'ready' || state === 'verifying'
  const empty = messages.length === 0 && streaming === null

  return (
    <div className="flex min-h-svh flex-col bg-white text-gray-900 dark:bg-[#050505] dark:text-gray-100">
      <header className="sticky top-0 z-30 glass-bar">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex items-center gap-2.5" aria-label="Ch@t home">
            <ChatMark title="Ch@t" className="h-10 w-10" />
          </a>
          <p className="flex items-center gap-1.5 text-sm font-semibold">
            <Sparkle className="h-4 w-4 text-mint-ink" />
            Relationship advisor
          </p>
        </div>
      </header>

      {/* data-track-private: the behaviour tracker never labels a tap in here
          with its text — this is someone's private conversation. */}
      <main data-track-section="advisor" data-track-private="" className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-6 sm:px-8">
        {/* Tall enough to fill what's left of the screen under the header, so
            the field is the last thing on it and the small print below has to
            be scrolled to. The notes are footnotes; they shouldn't sit between
            a visitor and the thing they came to do. */}
        <div className="min-h-[calc(100svh-10.5rem)]">
        {empty && (
          <section className="pt-10 text-center">
            <h1 className="poster-h font-syne text-[2.1rem] sm:text-5xl">
              Talk it through.
              <br />
              <span className="text-mint-ink">Any time, in private.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
              Heartbreak, mixed signals, or working out what you actually want — say it in your own words and talk it
              through. This is your safe corner.
            </p>

            {config && (
              <ul className="mx-auto mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-2">
                {config.starters.map(starter => (
                  <li key={starter.topic}>
                    <button
                      type="button"
                      onClick={() => void send(starter.text, starter.topic)}
                      disabled={!canType || sending}
                      className="glass flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium transition-transform duration-150 active:scale-[0.99] disabled:opacity-50"
                    >
                      <span>{starter.text}</span>
                      <TopicIcon topic={starter.topic} className="h-5 w-5 flex-shrink-0 text-mint-ink" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {!empty && (
          <div ref={scroller} className="space-y-4 py-6">
            {messages.map((message, i) => (
              <Bubble key={`${message.role}-${i}`} message={message} />
            ))}
            {streaming !== null && (
              <Bubble
                message={{ role: 'assistant', content: streaming }}
                pending={streaming.length === 0}
              />
            )}
            <div ref={end} aria-hidden style={{ scrollMarginBottom: composerHeight + 16 }} />
          </div>
        )}

        </div>

        {notice && (
          <p
            role="status"
            className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-500/20"
          >
            {notice}
          </p>
        )}

        {/* Composer. Fixed to the bottom of what the visitor can actually see:
            `bottom` is the keyboard's height, so it rides above the keyboard
            instead of being buried under it, and it stays put while the
            conversation scrolls behind it. */}
        <form
          ref={composer}
          style={{
            bottom: keyboard,
            paddingBottom: keyboard > 0 ? '0.5rem' : 'max(0.75rem, env(safe-area-inset-bottom))',
          }}
          className="fixed inset-x-0 z-30 border-t border-gray-200/80 bg-white/85 px-5 pt-3 backdrop-blur-xl transition-[bottom] duration-150 dark:border-gray-800 dark:bg-[#050505]/85 sm:px-8"
          onSubmit={e => {
            e.preventDefault()
            void send(draft)
          }}
        >
          <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[26px] bg-white p-2 ring-1 ring-gray-900/12 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.35)] focus-within:ring-2 focus-within:ring-mint dark:bg-[#17171b] dark:ring-white/12 dark:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.9)] dark:focus-within:ring-mint">
            <textarea
              ref={input}
              value={draft}
              onChange={e => setDraft(e.target.value.slice(0, maxChars))}
              onKeyDown={e => {
                // Enter sends on a computer; on a phone the key is a newline,
                // where the send button is the obvious thing to press.
                if (e.key === 'Enter' && !e.shiftKey && window.matchMedia('(pointer: fine)').matches) {
                  e.preventDefault()
                  void send(draft)
                }
              }}
              rows={1}
              disabled={!canType}
              placeholder={
                state === 'blocked'
                  ? 'Come back tomorrow'
                  : state === 'unavailable'
                    ? 'Unavailable right now'
                    : 'What’s on your mind?'
              }
              aria-label="Your message"
              className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-3.5 py-3 text-[17px] leading-snug outline-none placeholder:text-gray-400 disabled:opacity-60 dark:placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={!canType || sending || draft.trim().length === 0}
              className="mb-0.5 inline-flex h-12 flex-shrink-0 items-center rounded-full bg-mint px-6 text-[15px] font-semibold text-gray-900 transition-transform duration-150 active:scale-95 disabled:opacity-40"
            >
              {sending ? 'Sending…' : 'Send'}
            </button>
          </div>

          <div className="mx-auto mt-2 flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 text-xs text-gray-500 dark:text-gray-400">
            <span>
              {state === 'verifying' && 'Getting ready…'}
              {state === 'ready' && usage && `${usage.remaining} messages left today`}
              {state === 'ready' && !usage && 'Ready'}
              {state === 'loading' && 'Loading…'}
            </span>
            {draft.length > maxChars * 0.8 && (
              <span>
                {draft.length}/{maxChars}
              </span>
            )}
          </div>

          {config && state === 'verifying' && (
            <Turnstile
              siteKey={config.turnstile.siteKey}
              action={config.turnstile.action}
              onToken={token => void onToken(token)}
              onError={() => setNotice('That check didn’t pass. Please reload the page and try again.')}
              resetKey={turnstileKey}
              className="mt-2 flex justify-center"
            />
          )}
        </form>

        {/* Quiet ground between the conversation and the footnotes. Reaching
            them should take a deliberate scroll — they are there for whoever
            goes looking, not for someone who simply ran out of things to say
            and kept their thumb moving. */}
        <div aria-hidden className="h-[calc(27svh+15px)]" />

        {config && <CrisisPanel resources={config.crisisResources} />}

        <section className="mt-5 pt-3 text-[11px] leading-relaxed text-gray-400 dark:text-gray-500">
          {/* The data notice, folded away: spelled out in full for anyone who
              wants it, but not set in front of someone who came here to talk.
              A plain <details> — it opens without JavaScript, and a screen
              reader announces it as the expandable thing it is. */}
          <details className="group mb-3">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11px] text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 [&::-webkit-details-marker]:hidden">
              <InfoIcon className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="underline underline-offset-2">How your conversation is handled</span>
            </summary>
            <div className="mt-2 space-y-2 text-[11px] leading-relaxed text-gray-400 dark:text-gray-500">
              <p>
                Your messages are saved anonymously — never attached to you, and nobody here knows who sent them.
              </p>
              <p>
                Whatever you talk about stays between you and the advisor. It is never shared with anyone else on Ch@t.
              </p>
            </div>
          </details>

          <p className="mt-4">
            Support, not therapy, and not a crisis service. If someone is in danger, the numbers are under “Need help
            now?”.
          </p>
        </section>

        {/* What the composer would have taken up, now that it floats: without
            it the foot of the page can never be scrolled out from under the
            bar. */}
        <div aria-hidden style={{ height: composerHeight }} />
      </main>
    </div>
  )
}

function Bubble({ message, pending = false }: { message: AdvisorMessage; pending?: boolean }) {
  const mine = message.role === 'user'
  return (
    <div className={mine ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          mine
            ? 'max-w-[85%] whitespace-pre-wrap rounded-[20px] rounded-br-md bg-mint px-4 py-2.5 text-[15px] leading-relaxed text-gray-900'
            : 'glass max-w-[90%] whitespace-pre-wrap rounded-[20px] rounded-bl-md px-4 py-2.5 text-[15px] leading-relaxed'
        }
      >
        {pending ? <span className="inline-flex gap-1 py-1" aria-label="Writing"><Dot /><Dot delay="150ms" /><Dot delay="300ms" /></span> : message.content}
      </div>
    </div>
  )
}

function Dot({ delay = '0ms' }: { delay?: string }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-50"
      style={{ animationDelay: delay }}
    />
  )
}

/**
 * The help numbers, folded shut.
 *
 * They stay one tap from every screen, but closed to begin with: a page that
 * opens with crisis helplines spread across it tells the visitor the site has
 * assumed the worst about them, and most people came here about a text message
 * that went unanswered.
 *
 * A plain <details> with no stored state, so it is shut on every visit and
 * every refresh — it never remembers that someone opened it once.
 */
function CrisisPanel({ resources }: { resources: CrisisResource[] }) {
  if (resources.length === 0) return null
  return (
    <details className="group mt-8">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 [&::-webkit-details-marker]:hidden">
        <InfoIcon className="h-4 w-4 flex-shrink-0" />
        <span>Need help now?</span>
        <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <ul className="glass mt-3 space-y-3 rounded-2xl p-5 text-sm">
        {resources.map(resource => (
          <li key={`${resource.name}-${resource.contact}`}>
            <p className="text-gray-500 dark:text-gray-400">{resource.situation}</p>
            <p className="font-medium">
              {resource.name} —{' '}
              <a href={`tel:${resource.contact.replace(/[^\d*#]/g, '')}`} className="font-semibold text-mint-ink hover:underline">
                {resource.contact}
              </a>
            </p>
            {resource.note && <p className="text-gray-500 dark:text-gray-400">{resource.note}</p>}
          </li>
        ))}
      </ul>
    </details>
  )
}

/** A quiet "there's more here if you want it" mark. */
function InfoIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="7.9" r="1.15" fill="currentColor" />
      <path d="M12 11.1v5.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
