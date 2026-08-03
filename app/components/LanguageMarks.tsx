import type { ReactNode } from 'react'

export type LanguageCode = 'en' | 'zu' | 'xh' | 'af' | 'nso' | 'tn' | 'st' | 'ts' | 'ss' | 've' | 'nr'

/* A mark per language, drawn rather than borrowed from the emoji set — there
   is no emoji for a mokorotlo, a xibelani or Ndebele wall art, and the ones
   that come close render differently on every phone.
   Each mark is something the community itself uses to say "this is us",
   kept geometric so it stays legible at 18px. */
const MARKS: Record<LanguageCode, ReactNode> = {
  // English — the king protea, the flower everyone here shares, for the
  // language everyone here shares.
  en: (
    <>
      <circle cx="12" cy="9" r="2.2" />
      <path d="M12 5.4V2.4M9.1 7.3 6.5 5.8M14.9 7.3l2.6-1.5M9.1 10.7l-2.6 1.5M14.9 10.7l2.6 1.5" />
      <path d="M12 11.6v9" />
      <path d="M12 18.4c-2-.3-3.2-1.6-3.4-3.8 2.1.2 3.2 1.5 3.4 3.8Z" />
    </>
  ),

  // isiZulu — isihlangu, the Zulu shield: pointed oval, centre spine, hide bands.
  zu: (
    <>
      <path d="M12 2.5c3 0 4.8 3.8 4.8 9.5s-1.8 9.5-4.8 9.5-4.8-3.8-4.8-9.5S9 2.5 12 2.5Z" />
      <path d="M12 2.5v19" />
      <path d="M8.4 8.5h7.2M8.4 15.5h7.2" />
    </>
  ),

  // isiXhosa — the beaded collar (isidanga), worn as the sign of amaXhosa.
  xh: (
    <>
      <path d="M4.5 7a7.5 7.5 0 0 0 15 0" />
      <path d="M7.5 7a4.5 4.5 0 0 0 9 0" />
      <circle cx="12" cy="17.5" r="1.6" />
    </>
  ),

  // Afrikaans — the Taalmonument's rising columns. A monument to the language
  // itself, so it speaks for everyone who speaks it, not one community.
  af: (
    <>
      <path d="M4 20.5h16" />
      <path d="M5.8 20.5c.4-5.2.8-8.2 1.2-9 .4.8.8 3.8 1.2 9" />
      <path d="M10.5 20.5C11 11 11.6 5.4 12 3.5c.4 1.9 1 7.5 1.5 17" />
      <path d="M15.8 20.5c.4-6.7.8-10.6 1.2-11.6.4 1 .8 4.9 1.2 11.6" />
    </>
  ),

  // Sepedi — the marula, Limpopo's tree and the fruit its festival is named for.
  nso: (
    <>
      <circle cx="11" cy="15" r="5.5" />
      <path d="M11 9.5V4" />
      <path d="M11 5c2.9-1.2 5-.2 6.2 2.9-3 1.2-5.1.2-6.2-2.9Z" />
    </>
  ),

  // Setswana — cattle horns. Batswana ke dikgomo: the herd is the wealth.
  tn: (
    <>
      <path d="M4.2 6.5C3.7 10.7 5.9 13.3 8.6 13.9" />
      <path d="M19.8 6.5c.5 4.2-1.7 6.8-4.4 7.4" />
      <path d="M8.5 13.8h7v2.7a3.5 3.5 0 0 1-7 0Z" />
    </>
  ),

  // Sesotho — the mokorotlo, the Basotho hat that flies on Lesotho's flag.
  st: (
    <>
      <circle cx="12" cy="2.8" r="1.1" />
      <path d="M12 3.9v1.4" />
      <path d="M12 5.3 17 16.4H7Z" />
      <path d="M4.5 16.4c2.6 1.6 12.4 1.6 15 0" />
    </>
  ),

  // Xitsonga — the xibelani, the pleated skirt that makes the dance.
  ts: (
    <>
      <path d="M8 5.5h8l3 14H5Z" />
      <path d="M10 5.5 8.7 19.5M12 5.5v14M14 5.5l1.3 14" />
    </>
  ),

  // siSwati — the reeds of Umhlanga.
  ss: (
    <>
      <path d="M12 20.5V5.5M7 20.5V11M17 20.5v-7.5" />
      <path d="M12 8.5c0-2 .8-3.2 2.4-3.7-.2 2.3-1 3.5-2.4 3.7ZM7 13.5c0-1.7.7-2.8 2-3.2-.2 2-.9 3-2 3.2ZM17 15.5c0-1.7.7-2.8 2-3.2-.2 2-.9 3-2 3.2Z" />
    </>
  ),

  // Tshivenda — the coil of the domba, the python dance.
  ve: (
    <path d="M14.75 12a2.75 2.75 0 0 1-5.5 0 3.75 3.75 0 0 1 7.5 0 4.75 4.75 0 0 1-9.5 0" />
  ),

  // isiNdebele — the stepped geometry of a painted Ndebele wall.
  nr: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M6 10.5 9 7.5l3 3 3-3 3 3" />
      <path d="M6 16.5 9 13.5l3 3 3-3 3 3" />
    </>
  ),
}

export function LanguageMark({ code, className }: { code: LanguageCode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {MARKS[code]}
    </svg>
  )
}
