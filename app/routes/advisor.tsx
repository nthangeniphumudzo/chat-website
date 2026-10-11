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

  // Follow the conversation down as it grows — and again when the keyboard
  // opens, so the last thing said stays in view above it.
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
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

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-6 sm:px-8">
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
          <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto py-6">
            {messages.map((message, i) => (
              <Bubble key={`${message.role}-${i}`} message={message} />
            ))}
            {streaming !== null && (
              <Bubble
                message={{ role: 'assistant', content: streaming }}
                pending={streaming.length === 0}
              />
            )}
          </div>
        )}

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
          <div className="glass mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[22px] p-2">
            <textarea
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
              className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-base outline-none placeholder:text-gray-400 disabled:opacity-60 dark:placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={!canType || sending || draft.trim().length === 0}
              className="mb-0.5 inline-flex h-11 flex-shrink-0 items-center rounded-full bg-mint px-5 text-sm font-semibold text-gray-900 transition-transform duration-150 active:scale-95 disabled:opacity-40"
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

        {config && <CrisisPanel resources={config.crisisResources} />}

        <section className="mt-8 border-t border-gray-200 pt-6 text-xs leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400">
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
                This advisor is powered by a third-party provider (Anthropic), which processes your messages to write
                the replies. Ch@t keeps an anonymised copy of conversations — phone numbers, emails, links and @handles
                are stripped out, and no IP address or device identifier is stored — for up to a year, to understand
                what people face in dating. Please don’t share full names or contact details here.
              </p>
              <p>Your conversation stays on this device so you can carry on later.</p>
            </div>
          </details>

          <p className="mt-4">
            The advisor is support, not therapy, and not a crisis service. If someone is in danger, use the numbers
            above.
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

/** Always on the page, never behind a tap — the one thing here that can't wait. */
function CrisisPanel({ resources }: { resources: CrisisResource[] }) {
  if (resources.length === 0) return null
  return (
    <section className="glass mt-8 rounded-2xl p-5">
      <h2 className="font-syne text-lg font-bold">Need help now?</h2>
      <ul className="mt-3 space-y-3 text-sm">
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
    </section>
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
