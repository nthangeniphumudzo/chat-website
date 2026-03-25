/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Full Expo EAS install page URL for the Android beta build */
  readonly VITE_ANDROID_BETA_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}
