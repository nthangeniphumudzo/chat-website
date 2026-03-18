import emailjs from '@emailjs/browser'

// EmailJS configuration (same approach as phcreationsPublic)
// Get these from your EmailJS dashboard: https://dashboard.emailjs.com
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_b0a374y'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '4fePMJtucCcdrOcU1'
const EMAILJS_WAITLIST_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WAITLIST_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_cx2qx1t'

export interface WaitlistFormData {
  email: string
  name?: string
}

export const sendWaitlistEmail = async (formData: WaitlistFormData): Promise<void> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_WAITLIST_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error(
      'EmailJS is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, and VITE_EMAILJS_WAITLIST_TEMPLATE_ID in your environment variables.'
    )
  }

  emailjs.init(EMAILJS_PUBLIC_KEY)

  const templateParams = {
    email: formData.email,
    name: formData.name || '',
    time: new Date().toLocaleString(),
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_WAITLIST_TEMPLATE_ID,
      templateParams
    )
    console.log('Waitlist email sent successfully:', response)
  } catch (error: unknown) {
    const err = error as { status?: number; text?: string }
    console.error('EmailJS Error Details:', {
      status: err?.status,
      text: err?.text,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_WAITLIST_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing',
      templateParams,
    })
    if (err?.status === 400) {
      throw new Error(
        `EmailJS configuration error: ${err?.text || 'Bad Request'}. ` +
        'Check Service ID, Template ID, and template variables (email, name, time).'
      )
    }
    throw error
  }
}
