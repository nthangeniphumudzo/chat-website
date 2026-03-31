import { useEffect } from 'react'
import Navbar from '../components/Navbar'

interface AccountDeletionPageProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function AccountDeletionPage({ isDark, onToggleTheme }: AccountDeletionPageProps) {
  useEffect(() => {
    const prev = document.title
    document.title = 'Delete your Chat account — Chat'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar isDark={isDark} onToggle={onToggleTheme} variant="subpage" />
      <main className="pt-24 sm:pt-28 pb-16 px-5 sm:px-8 max-w-3xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Account deletion</p>
        <h1 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
          Delete your Chat account
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-10">
          You can permanently delete your account and associated personal data either in the app or by
          contacting support.
        </p>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] p-6 sm:p-8 mb-6">
          <h2 className="font-syne font-bold text-xl sm:text-2xl mb-4 text-gray-900 dark:text-gray-100">
            Delete your account in the app
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            <li>
              Open <strong className="text-gray-900 dark:text-white">Chat</strong>
            </li>
            <li>
              Go to <strong className="text-gray-900 dark:text-white">Profile</strong>
            </li>
            <li>
              Tap <strong className="text-gray-900 dark:text-white">Settings</strong>
            </li>
            <li>
              Open <strong className="text-gray-900 dark:text-white">Account Actions</strong>
            </li>
            <li>
              Tap <strong className="text-gray-900 dark:text-white">Delete Account</strong>
            </li>
            <li>Confirm deletion</li>
          </ol>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            Once confirmed, your account enters deletion processing and cannot be recovered after completion.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] p-6 sm:p-8 mb-6">
          <h2 className="font-syne font-bold text-xl sm:text-2xl mb-4 text-gray-900 dark:text-gray-100">
            If you cannot access your account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            Email{' '}
            <a href="mailto:chat@phcreations.com" className="text-mint hover:underline font-medium">
              chat@phcreations.com
            </a>{' '}
            with the subject{' '}
            <strong className="text-gray-900 dark:text-white">Account deletion request</strong> and include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            <li>
              The phone number linked to your Chat account (E.164 format, for example{' '}
              <code className="rounded bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 text-xs">+27XXXXXXXXX</code>)
            </li>
            <li>Your display name (if available)</li>
            <li>A clear request to permanently delete your account</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] p-6 sm:p-8 mb-6">
          <h2 className="font-syne font-bold text-xl sm:text-2xl mb-4 text-gray-900 dark:text-gray-100">
            What will be deleted
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
            When your deletion request is processed, we delete your account and associated personal data,
            including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            <li>Account profile data (name, bio, preferences)</li>
            <li>Uploaded profile and chat photos/videos</li>
            <li>Messages/chats and related account-linked content</li>
            <li>Blocked contacts list</li>
            <li>Account identifiers linked to the user profile</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] p-6 sm:p-8 mb-6">
          <h2 className="font-syne font-bold text-xl sm:text-2xl mb-4 text-gray-900 dark:text-gray-100">
            What we may retain
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
            We may retain limited information where required for:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            <li>Security and fraud prevention</li>
            <li>Legal and compliance obligations required by law</li>
            <li>Minimal technical logs needed for dispute and security handling</li>
          </ul>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            Any retained data is minimized and kept only for the required period.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] p-6 sm:p-8 mb-6">
          <h2 className="font-syne font-bold text-xl sm:text-2xl mb-4 text-gray-900 dark:text-gray-100">
            How long it takes
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            Deletion requests are processed promptly; full deletion is completed within{' '}
            <strong className="text-gray-900 dark:text-white">30 days</strong> of request confirmation, unless a
            longer retention period is required by law for specific records.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#121212] p-6 sm:p-8 mb-10">
          <h2 className="font-syne font-bold text-xl sm:text-2xl mb-4 text-gray-900 dark:text-gray-100">
            Need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            You will receive acknowledgment that your request was received and processed. For account deletion or
            privacy-related support, contact{' '}
            <a href="mailto:chat@phcreations.com" className="text-mint hover:underline font-medium">
              chat@phcreations.com
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-gray-400 dark:text-gray-600">Last updated: March 24, 2026</p>
      </main>
    </div>
  )
}
