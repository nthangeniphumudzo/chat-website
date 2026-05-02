import { useState } from 'react'
import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type TabId = 'tos' | 'privacy' | 'cookies' | 'community'

interface Tab {
  id: TabId
  label: string
}

const tabs: Tab[] = [
  { id: 'tos', label: 'Terms of Service' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'cookies', label: 'Cookie Policy' },
  { id: 'community', label: 'Community Guidelines' },
]

// ── Shared sub-components ──────────────────────────────────────────────────

function LegalMeta() {
  return (
    <p className="text-xs text-gray-400 dark:text-gray-600 mb-5">
      Last updated: 17 March 2026 &nbsp;·&nbsp;{' '}
      <a href="mailto:chat@phcreations.com" className="text-mint hover:underline">
        chat@phcreations.com
      </a>
    </p>
  )
}

function LegalIntro({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-4 border-mint bg-mint/5 rounded-r-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
      {children}
    </div>
  )
}

function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pb-7 mb-7 border-b border-gray-100 dark:border-gray-800 last:border-0 last:mb-0 last:pb-0">
      <h3 className="font-syne font-bold text-sm text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{children}</p>
    </div>
  )
}

// ── Tab content ────────────────────────────────────────────────────────────

function ToSContent() {
  return (
    <div>
      <LegalMeta />
      <LegalIntro>
        By accessing and using Chat, you accept and agree to be bound by these terms. If you do not agree, you may not use our service.
      </LegalIntro>
      <LegalBlock title="1. Eligibility">
        You must be at least 18 years old to use this service. By using Chat, you represent and warrant that you have the legal capacity to enter into this agreement. You must be single, separated, or divorced; provide accurate and current information; maintain the confidentiality of your account; and you may not create more than one account.
      </LegalBlock>
      <LegalBlock title="2. User Accounts">
        You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must provide accurate registration information and immediately notify us of any unauthorised use. We reserve the right to suspend or terminate accounts that violate these terms.
      </LegalBlock>
      <LegalBlock title="3. User Conduct">
        You agree to use the service in a lawful, respectful manner consistent with our Community Guidelines. Prohibited conduct includes: harassment or abuse of other users; fraudulent or deceptive behaviour; spam or unsolicited advertising; impersonation; sharing others' personal information without consent; and any illegal activities.
      </LegalBlock>
      <LegalBlock title="4. Prohibited Activities">
        The following activities may result in immediate account termination: harassment, bullying, or abusive behaviour; scams, fraud, or financial exploitation; posting explicit, illegal, or harmful content; creating fake profiles or catfishing; using the service for unauthorised commercial purposes; and attempting to circumvent security measures.
      </LegalBlock>
      <LegalBlock title="5. Content & Intellectual Property">
        You retain ownership of content you post but grant us a non-exclusive, worldwide, royalty-free licence to use, display, and distribute it through our service. We respect intellectual property rights and respond to valid DMCA notices.
      </LegalBlock>
      <LegalBlock title="6. Premium Features & Payments">
        Some features require payment. Subscription fees are charged in advance. All sales are final unless required by law. We reserve the right to change pricing with notice. Refunds may be available under specific circumstances as outlined in our refund policy.
      </LegalBlock>
      <LegalBlock title="7. Termination">
        We reserve the right to suspend or terminate your account at any time for violations of these terms. You may delete your account at any time through settings. Upon termination, your right to use the service immediately ceases.
      </LegalBlock>
      <LegalBlock title="8. Disclaimers & Limitation of Liability">
        The service is provided "as is" without warranties of any kind. We do not guarantee that you will find matches or that the service will be uninterrupted. We are not responsible for the conduct of users on or off the platform.
      </LegalBlock>
      <LegalBlock title="9. Indemnification">
        You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of the service or violation of these terms.
      </LegalBlock>
      <LegalBlock title="10. Changes & Governing Law">
        We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance. These terms are governed by the laws of the jurisdiction in which our company is established.
      </LegalBlock>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div>
      <LegalMeta />
      <LegalIntro>
        Your privacy matters to us. This policy explains how we collect, use, and protect your personal information when you use Chat.
      </LegalIntro>
      <LegalBlock title="1. Information We Collect">
        We collect information you provide directly (profile data, photos, bio, preferences, account credentials), information collected automatically (usage data, device information, log data, location data if enabled), and payment or billing information for premium features.
      </LegalBlock>
      <LegalBlock title="2. How We Use Your Information">
        We use collected information to create and manage your account; match you with potential partners; facilitate communication; personalise your experience; process payments; send important updates; and detect and prevent fraud, abuse, and illegal activity.
      </LegalBlock>
      <LegalBlock title="3. Information Sharing">
        We share your information only in limited circumstances: with other users as part of matching and messaging; with service providers who help us operate the app; when required by law or to protect rights and safety; and in connection with a business transfer or merger.
      </LegalBlock>
      <LegalBlock title="4. Profile Visibility">
        Basic profile information is visible to potential matches. Photos are visible to other users unless restricted. Location is shared only when enabled. You can block users and deleting your account removes your profile from public view.
      </LegalBlock>
      <LegalBlock title="5. Data Security">
        We implement appropriate technical and organisational measures to protect your personal information, including encryption in transit and at rest, secure authentication, regular security assessments, and access controls.
      </LegalBlock>
      <LegalBlock title="6. Your Rights & Choices">
        Depending on your location, you have rights to access, correct, or delete your personal data; receive your data in a portable format; opt out of marketing communications; and control visibility and sharing preferences in your app settings.
      </LegalBlock>
      <LegalBlock title="7. Data Retention">
        Data is retained while your account is active. Deleted accounts have data removed within 30 days. Some data may be retained longer if required by law. Anonymised aggregate data may be retained for analytics purposes.
      </LegalBlock>
      <LegalBlock title="8. Children's Privacy & International Transfers">
        Our service is not intended for users under 18 and we do not knowingly collect personal information from children. Your information may be transferred to and processed in countries other than your country of residence.
      </LegalBlock>
    </div>
  )
}

const cookieTypes = [
  { label: 'Essential',    color: 'bg-mint/10 text-mint',         description: 'Required for the app to function. Cannot be disabled — necessary for authentication and security.' },
  { label: 'Functional',   color: 'bg-blue-400/10 text-blue-400', description: 'Remember your preferences and settings to personalise your experience.' },
  { label: 'Analytics',    color: 'bg-yellow-400/10 text-yellow-400', description: 'Help us understand how users interact with the app by collecting anonymous usage statistics.' },
  { label: 'Advertising',  color: 'bg-red-400/10 text-red-400',   description: 'Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.' },
]

function CookiesContent() {
  return (
    <div>
      <LegalMeta />
      <LegalIntro>
        We use cookies and similar technologies to improve your experience. This policy explains what we use, why, and how you can manage your preferences.
      </LegalIntro>

      <div className="mb-7 pb-7 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-syne font-bold text-sm text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Types of Cookies We Use
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cookieTypes.map(({ label, color, description }) => (
            <div key={label} className="bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <span className={`inline-block text-xs font-syne font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${color}`}>
                {label}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <LegalBlock title="How We Use Cookies">
        We use cookies to keep you logged in; remember your preferences; analyse app usage and improve performance; deliver personalised content; prevent fraud and enhance security; and measure marketing effectiveness.
      </LegalBlock>
      <LegalBlock title="Mobile App Tracking">
        In addition to cookies, our mobile app may use device identifiers (IDFA, Android Advertising ID), app usage analytics and crash reporting, location tracking (with your permission), and push notification tokens.
      </LegalBlock>
      <LegalBlock title="Managing Cookies">
        You can manage cookie preferences through App Settings (Settings {'>'} Privacy), device settings, or industry opt-out tools for advertising cookies. Disabling essential cookies may prevent the app from functioning correctly.
      </LegalBlock>
      <LegalBlock title="Do Not Track">
        We respect Do Not Track signals from browsers and devices. If you have enabled this setting, we will not track you for advertising purposes.
      </LegalBlock>
    </div>
  )
}

const guidelines = [
  { icon: '🤝', title: 'Be Respectful',       description: 'Treat everyone with kindness. No harassment, bullying, or abusive language. Respect boundaries and consent. Report inappropriate behaviour.' },
  { icon: '🛡️', title: 'Stay Safe',           description: 'Meet in public places for first dates. Never share personal financial information. Report suspicious or fake profiles. Trust your instincts.' },
  { icon: '✅', title: 'Be Authentic',          description: 'Use your real photos and accurate information. Catfishing and impersonation are strictly prohibited. Keep your profile information honest.' },
  { icon: '🖼️', title: 'Appropriate Content', description: 'No nudity, explicit content, hate speech, discriminatory content, or violent imagery. Respect copyright and intellectual property.' },
  { icon: '🚫', title: 'No Scams or Spam',     description: "Financial scams, spam, and fraudulent activity are prohibited. Don't ask for money. No pyramid schemes or mass unsolicited messaging." },
  { icon: '🔞', title: 'Age Requirements',     description: 'You must be 18 or older to use Chat. Falsifying your age will result in immediate termination. Report users who appear underage.' },
]

const enforcement = [
  { label: '⚠️ Warning',        color: 'border-yellow-400/20 bg-yellow-400/5', labelColor: 'text-yellow-400', description: 'Minor violations may result in a warning and temporary restrictions.' },
  { label: '⏸ Suspension',      color: 'border-blue-400/20 bg-blue-400/5',   labelColor: 'text-blue-400',   description: 'Repeated or moderate infractions can lead to temporary account suspension.' },
  { label: '🚫 Permanent Ban',  color: 'border-red-400/20 bg-red-400/5',     labelColor: 'text-red-400',    description: 'Serious violations like harassment, scams, or illegal activity result in permanent termination.' },
]

function CommunityContent() {
  return (
    <div>
      <LegalMeta />
      <LegalIntro>
        These guidelines help create a safe, respectful, and welcoming environment for everyone on Chat. Violations may result in warnings, suspension, or permanent removal.
      </LegalIntro>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-7 pb-7 border-b border-gray-100 dark:border-gray-800">
        {guidelines.map(({ icon, title, description }) => (
          <div
            key={title}
            className="bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-mint/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="text-2xl mb-3">{icon}</div>
            <h4 className="font-syne font-bold text-sm text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <div className="mb-7 pb-7 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-syne font-bold text-sm text-gray-900 dark:text-gray-100 mb-4 tracking-tight">Enforcement</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {enforcement.map(({ label, color, labelColor, description }) => (
            <div key={label} className={`rounded-xl border p-4 ${color}`}>
              <div className={`font-syne font-bold text-xs mb-2 ${labelColor}`}>{label}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <LegalBlock title="Reporting Violations">
        Report violations through{' '}
        <strong className="text-gray-700 dark:text-gray-300">You {'>'} Privacy & Safety {'>'} Report a Problem</strong>{' '}
        in the app, or contact our safety team at{' '}
        <a href="mailto:chat@phcreations.com" className="text-mint hover:underline">
          chat@phcreations.com
        </a>.
      </LegalBlock>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function LegalSection() {
  const [activeTab, setActiveTab] = useState<TabId>('tos')
  const headingRef = useScrollReveal<HTMLDivElement>()

  const content: Record<TabId, ReactNode> = {
    tos: <ToSContent />,
    privacy: <PrivacyContent />,
    cookies: <CookiesContent />,
    community: <CommunityContent />,
  }

  return (
    <div id="legal" className="bg-gray-50 dark:bg-[#0d0d0d] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div ref={headingRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-8 sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-mint mb-4">Legal & Policies</p>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
            Transparency &amp; <span className="text-mint">Trust</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-lg">
            Everything you need to know about how Chat works, how we protect your data, and the standards we hold our community to.
          </p>
        </div>

        {/* Tabs — horizontally scrollable on mobile */}
        <div className="overflow-x-auto scrollbar-hide -mx-5 sm:mx-0 px-5 sm:px-0">
          <div className="flex min-w-max sm:min-w-0 sm:flex-wrap gap-0 border-b border-gray-200 dark:border-gray-800 mb-7 sm:mb-8">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-all duration-200 whitespace-nowrap ${
                  activeTab === id
                    ? 'border-mint text-mint'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-fade-up">
          {content[activeTab]}
        </div>
      </div>
    </div>
  )
}
