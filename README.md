# Chat App — Marketing Website

Built with **React 18 + TypeScript + Vite + Tailwind CSS v3**.

**Repository:** [https://github.com/nthangeniphumudzo/chat-website](https://github.com/nthangeniphumudzo/chat-website)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Project Structure

```
chat-website/
├── index.html               # Entry point — includes FOUC-prevention theme script
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js       # Custom mint colour, Syne/DM Sans fonts, animations
├── postcss.config.js
└── src/
    ├── main.tsx             # React root
    ├── App.tsx              # Root component — holds theme state
    ├── index.css            # Tailwind directives + mobile touch fixes + scroll-margin
    ├── assets/
    │   └── images.ts        # All screenshots & app icon as base64 exports
    ├── hooks/
    │   ├── useTheme.ts          # Dark/light toggle, localStorage persistence
    │   └── useScrollReveal.ts   # IntersectionObserver scroll animations
    └── components/
        ├── Navbar.tsx           # Sticky nav, animated hamburger, theme toggle
        ├── Hero.tsx             # Hero — 1 phone on mobile, stacked trio on desktop
        ├── StatsBar.tsx         # 4-stat highlight bar
        ├── Features.tsx         # 6-feature card grid
        ├── Screenshots.tsx      # Horizontally scrollable screenshot strip
        ├── MessagingSection.tsx # Split layout — 1 phone on mobile, 2 on desktop
        ├── PremiumSection.tsx   # Premium feature card
        ├── SafetySection.tsx    # 4 safety cards
        ├── DownloadSection.tsx  # App Store / Google Play CTA
        ├── LegalSection.tsx     # Tabbed ToS / Privacy / Cookies / Community
        └── Footer.tsx           # Footer with 2-col link grid on mobile
```

## Features

- **Dark / Light mode** — zero-flash toggle using an inline script in `index.html` that applies the class before React hydrates; persisted to `localStorage`; all screenshots swap between dark and light app variants
- **Mobile-first responsive** — every section uses `sm:` / `lg:` breakpoints; hero shows single phone on mobile; phones hidden or reduced in split layouts; store buttons stack full-width; legal tabs horizontally scrollable; footer links in 2-col grid
- **Scroll reveal animations** — `useScrollReveal` hook using `IntersectionObserver` with above-fold detection, 8% threshold, and `-40px` root margin for smooth mobile triggering
- **Anchor scroll offset** — global `scroll-margin-top` CSS so navbar never covers anchor targets
- **Touch optimised** — `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`, `-webkit-overflow-scrolling: touch` on scroll containers
- **All app screenshots embedded** — no external image hosting required (dark + light variants)
- **Real app icon** — black on light mode, white on dark mode

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| TypeScript | 5 |
| Vite | 5 |
| Tailwind CSS | 3 |
| PostCSS / Autoprefixer | latest |

## Customisation

| What | Where |
|------|-------|
| App Store / Google Play links | `src/components/DownloadSection.tsx` — replace `href="#"` |
| Legal dates | `src/components/LegalSection.tsx` — replace `[Date]` |
| Support email | `DownloadSection.tsx`, `LegalSection.tsx`, `Footer.tsx` |
| Brand colour | `tailwind.config.js` → `colors.mint.DEFAULT` |
| App icon | `src/assets/images.ts` → `icon_light` / `icon_dark` |
