import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { sendWaitlistEmail } from '../services/emailService'

export default function WaitlistSection() {
  const ref = useScrollReveal<HTMLDivElement>()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    try {
      await sendWaitlistEmail({ email, name: name.trim() || undefined })
      setStatus('success')
      setEmail('')
      setName('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or email chat@phcreations.com'
      )
    }
  }

  return (
    <section
      id="waitlist"
      className="py-16 sm:py-24 px-5 sm:px-8 lg:px-24 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d0d]"
    >
      <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Join the waitlist</p>
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
          Be the first to <span className="text-mint">know</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
          Get early access and updates. No spam — just one message when we're ready for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left sm:flex sm:flex-row sm:gap-3 sm:items-end sm:space-y-0">
          <div className="flex-1 space-y-4 sm:space-y-0 sm:flex sm:gap-3">
            <div className="sm:flex-1">
              <label htmlFor="waitlist-name" className="sr-only">
                Name (optional)
              </label>
              <input
                type="text"
                id="waitlist-name"
                name="name"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-mint focus:border-mint transition-all"
              />
            </div>
            <div className="sm:flex-1">
              <label htmlFor="waitlist-email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="waitlist-email"
                name="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-mint focus:border-mint transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-mint text-gray-900 font-syne font-bold hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Joining…
              </span>
            ) : (
              'Join waitlist'
            )}
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-6 p-4 rounded-xl bg-mint/10 border border-mint/30 text-mint">
            <p className="font-medium">You're on the list.</p>
            <p className="text-sm opacity-90">You will receive the beta version of the app as soon as it is published.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 dark:text-red-300">
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm">{errorMessage}</p>
            <p className="text-sm mt-2">
              Or email us at{' '}
              <a href="mailto:chat@phcreations.com" className="underline font-medium">
                chat@phcreations.com
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
