/**
 * The search landing pages, kept apart from their copy (guides.ts) so the route
 * config can list them without loading every page's words. Visitors reach them
 * from search or a shared link; nothing on the site links to them on purpose.
 */
export const GUIDE_LINKS = [
  { slug: 'dating-apps-south-africa', label: 'Dating apps in South Africa' },
  { slug: 'hookups-south-africa', label: 'Hookups in South Africa' },
  { slug: 'tinder-alternative-south-africa', label: 'Tinder alternative' },
  { slug: 'friends-with-benefits-south-africa', label: 'Friends with benefits' },
  { slug: 'mjolo', label: 'Mjolo in Mzansi' },
] as const

export type GuideSlug = (typeof GUIDE_LINKS)[number]['slug']
