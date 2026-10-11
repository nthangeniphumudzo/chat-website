import { API_BASE } from '../constants'

/**
 * The Relationship Advisor's backend, and the browser's half of the contract.
 *
 * Everything that matters — limits, safety, signing, the research copy — lives
 * on the server. This file only knows how to ask, how to read a streamed reply,
 * and where the transcript is kept between visits (localStorage, because the
 * visitor has no account and we deliberately store nothing that identifies
 * them).
 */
const BASE = `${API_BASE}/advisor`

/** The device, for the daily cap. Not a person, and never sent anywhere else. */
const VISITOR_KEY = 'chat.advisor.visitorId'

/** The transcript the visitor comes back to. */
const CONVERSATION_KEY = 'chat.advisor.conversation'

export interface Starter {
  topic: number
  text: string
}

export interface CrisisResource {
  situation: string
  name: string
  contact: string
  note?: string
}

export interface AdvisorConfig {
  enabled: boolean
  starters: Starter[]
  limits: { dailyMessages: number; maxMessageChars: number }
  turnstile: { siteKey: string; action: string }
  crisisResources: CrisisResource[]
}

export interface Usage {
  limit: number
  used: number
  remaining: number
  resetAt?: string
}

export interface AdvisorMessage {
  role: 'user' | 'assistant'
  content: string
  signature?: string
}

export interface StoredConversation {
  conversationId: string
  sessionToken: string
  sessionExpiresAt: string
  topic?: number
  messages: AdvisorMessage[]
}

/** An error the page can show as it stands: the backend writes these for the
 *  visitor, not for us, so its message is the one that gets displayed. */
export class AdvisorError extends Error {
  code: string
  status: number
  meta?: Record<string, unknown>

  constructor(code: string, message: string, status: number, meta?: Record<string, unknown>) {
    super(message)
    this.name = 'AdvisorError'
    this.code = code
    this.status = status
    this.meta = meta
  }
}

/** Every response comes wrapped: { success, data } or { success, error }. */
async function unwrap<T>(res: Response): Promise<T> {
  let body: any = null
  try {
    body = await res.json()
  } catch {
    /* no body, or not JSON — handled below */
  }

  if (!res.ok || body?.success === false) {
    const error = body?.error ?? {}
    throw new AdvisorError(
      error.code ?? 'advisor_unavailable',
      error.message ?? 'Something went wrong. Please try again.',
      res.status,
      error.meta,
    )
  }

  return body?.data as T
}

export async function fetchConfig(signal?: AbortSignal): Promise<AdvisorConfig> {
  return unwrap<AdvisorConfig>(await fetch(`${BASE}/config`, { signal }))
}

/**
 * Start a conversation, or pick an old one back up.
 *
 * Passing `conversationId` is what makes it a resume: the server hands back a
 * fresh session token for the same conversation, and the stored messages stay
 * exactly as they are. Either way a Turnstile token is required — that is the
 * check that keeps the daily budget for people rather than scripts.
 */
export async function startConversation(input: {
  visitorId: string
  turnstileToken: string
  conversationId?: string
}): Promise<{ conversationId: string; sessionToken: string; sessionExpiresAt: string; usage: Usage }> {
  const res = await fetch(`${BASE}/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return unwrap(res)
}

export async function deleteConversation(conversationId: string, sessionToken: string): Promise<void> {
  const res = await fetch(`${BASE}/conversations/${encodeURIComponent(conversationId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionToken }),
  })
  await unwrap(res)
}

interface StreamHandlers {
  onMeta?: (meta: { conversationId: string; usage: Usage }) => void
  onDelta: (text: string) => void
  onDone: (done: { message: AdvisorMessage; replaced: boolean; usage: Usage }) => void
}

/**
 * Send a message and read the reply as it is written.
 *
 * The reply arrives as server-sent events over a POST, which is why this is
 * fetch and a reader rather than EventSource — EventSource can only GET. An
 * error *before* the stream opens comes back as an ordinary JSON envelope and
 * is thrown; an error *during* the stream arrives as an `error` event, and is
 * thrown the same way so the page has one thing to catch.
 */
export async function sendMessage(
  input: {
    conversationId: string
    sessionToken: string
    message: string
    history: AdvisorMessage[]
    topic?: number
  },
  handlers: StreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  const { conversationId, ...body } = input
  const res = await fetch(`${BASE}/conversations/${encodeURIComponent(conversationId)}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify(body),
    signal,
  })

  // Anything that failed before the first byte of the stream is a normal
  // envelope, so read it as one.
  if (!res.ok || !res.body || !(res.headers.get('content-type') ?? '').includes('text/event-stream')) {
    await unwrap(res)
    throw new AdvisorError('advisor_unavailable', 'The advisor didn’t answer. Please try again.', res.status)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  const handleFrame = (frame: string) => {
    let event = 'message'
    const data: string[] = []
    for (const line of frame.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim()
      else if (line.startsWith('data:')) data.push(line.slice(5).trim())
    }
    if (data.length === 0) return

    let payload: any
    try {
      payload = JSON.parse(data.join('\n'))
    } catch {
      return
    }

    if (event === 'meta') handlers.onMeta?.(payload)
    else if (event === 'delta') handlers.onDelta(payload.text ?? '')
    else if (event === 'done') handlers.onDone(payload)
    else if (event === 'error') {
      throw new AdvisorError(payload.code ?? 'advisor_unavailable', payload.message ?? 'Something went wrong.', 200, payload.meta)
    }
  }

  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    // Frames are separated by a blank line; \r\n for anyone proxying through
    // something that rewrites line endings.
    let split: number
    while ((split = buffer.search(/\r?\n\r?\n/)) !== -1) {
      const frame = buffer.slice(0, split)
      buffer = buffer.slice(split).replace(/^\r?\n\r?\n/, '')
      handleFrame(frame)
    }
  }

  if (buffer.trim()) handleFrame(buffer)
}

/* ── What the browser remembers ─────────────────────────────────── */

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode, or storage full: the conversation simply won't resume */
  }
}

/** The device id, made once and kept. */
export function getVisitorId(): string {
  const existing = readStorage(VISITOR_KEY)
  if (existing) return existing

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : // Older WebViews: good enough for a cap that the server enforces anyway.
        `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`

  writeStorage(VISITOR_KEY, id)
  return id
}

export function loadConversation(): StoredConversation | null {
  const raw = readStorage(CONVERSATION_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as StoredConversation
    if (!parsed?.conversationId || !Array.isArray(parsed.messages)) return null
    return parsed
  } catch {
    return null
  }
}

export function saveConversation(conversation: StoredConversation) {
  writeStorage(CONVERSATION_KEY, JSON.stringify(conversation))
}

export function clearConversation() {
  try {
    localStorage.removeItem(CONVERSATION_KEY)
  } catch {
    /* nothing to clear */
  }
}

/** Whether the stored session token is still good. */
export function sessionIsLive(conversation: StoredConversation | null): boolean {
  if (!conversation?.sessionToken || !conversation.sessionExpiresAt) return false
  const expires = Date.parse(conversation.sessionExpiresAt)
  // A minute's margin, so a token doesn't die mid-send.
  return Number.isFinite(expires) && expires - Date.now() > 60_000
}
