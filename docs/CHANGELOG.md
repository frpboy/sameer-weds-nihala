# Changelog

All notable changes to this project are documented here.

---

## v3.2.0 — 2026-05-18 | Centralized Adaptive Ambient Motion Engine

- **Exaggerated Cinematic Parallax**: Engineered multi-layered wallpaper depth illusion where distinct 3D groups lag smoothly behind cursor movement with calibrated sweet spot coefficients (`4x` / `3y`, lerped at `0.08`, `0.12`, `0.16`).
- **Muted Emerald & Champagne Particles**: Replaced low-contrast gold particles with a luxurious 80% muted warm emerald (`#355C4D`) and 20% champagne (`#C7A97F`) color hierarchy at `72%` opacity, ensuring striking contrast against the warm ivory background.
- **Soft Champagne Cursor Atmosphere**: Added a 250px soft champagne bloom (`#C7A97F`, `18% opacity`) that lags behind cursor movement like heavy silk air, delivering an emotional response to mouse movement.
- **Cinematic Camera Motion**: Introduced spatial camera shifting inside `useFrame` (`0.8x`, `0.5y`), allowing the entire 3D world to sway organically with user cursor interaction.
- **Champagne Dust Cursor Trails**: Created `MouseTrail3D.tsx` to dynamically spawn soft glowing, friction-damped champagne dust particles trailing behind cursor movement.
- **Single-Line Couple Typography**: Upgraded couple name displays across `InvitationMessage`, `SplashIntro`, and `Footer` to use clean `firstName` formatting (`"Mohammed Sameer"` and `"Nihala Jasmin"`), ensuring perfect single-line symmetry without awkward word wraps.
- **Unclipped Arabic Calligraphy**: Resolved horizontal clipping on the Bismillah ornament (`﷽`) across Windows system font engines by applying `overflow-visible px-4 whitespace-nowrap inline-block` and calibrated responsive scaling (`text-3xl md:text-4xl`).
- **Unblocked 3D Viewport**: Replaced static `HeroBackground.tsx` overlay circles with a pure transparent gradient, completely unblocking the immersive R3F world view.

---

## v3.1.0 — 2026-05-18 | Architectural Refinements & Elite Aesthetic Polish

- **Visual Hierarchy**: Flattened cards across `CountdownSection`, `TimelineSection`, `FamilySection`, and `InvitationMessage` using new `flat` and `soft` variants to avoid glassmorphism monotony.
- **Dynamic Performance Safeguards**: Implemented `usePerformanceMonitor` to actively throttle particles, animations, and heavy background effects on low-concurrency or low-end mobile devices.
- **Lazy Effect Loading**: Delayed mouse trails and ambient glow animations until after DOMContentLoaded and initial paint, significantly boosting Time to Interactive (TTI).
- **RSVP Modularization**: Split the monolithic `RsvpSection.tsx` into modular components (`RsvpForm`, `GuestCounter`, and `WishesWall`) in `src/components/sections/rsvp/`.
- **Royal Typography**: Maintained elegant royal serif typography (`Cinzel` and `Cormorant Garamond`) across headings and italic quotes for maximum ceremonial grandeur.
- **Poetic Quotes**: Implemented `Cormorant Infant` with warm mocha tone (`#6F5B57`) and subtle 88% opacity across all romantic quotes and scripture excerpts (`.quote-poetic`).
- **Smart Audio Resume**: Enhanced `MusicProvider` with tab visibility and window focus tracking to automatically resume ambient background audio when the user returns to the invitation window.
- **Dynamic Theme Presets**: Created `src/theme/presets/` with modular palettes (`royalGold`, `romanticRose`, `editorialIvory`, `emeraldLuxury`) dynamically injected through `ThemeProvider`.

---

## v3.0.0 — 2026-05-18 | Wedding Microsite Re-branding (Sameer & Nihala)

- **Mirrored Codebase**: Adapted established, production-ready premium wedding microsite for Mohammed Sameer Kallangadan (S/o Abdulla Kallangadan & Ramlath OP) & Nihala Jasmin KK (D/o Abdul Azeez).
- **Branding & Monogram**: Updated all titles, couple names, short names, and monogram (`S&N`).
- **Favicon**: Replaced gold circular favicon with `S&N` monogram.
- **Gallery**: Replaced hardcoded image file names with dynamic `import.meta.glob('/public/images/*')` loading.
- **Database & RSVP**: Updated `.env` with new Neon PostgreSQL connection string and initialized `rsvps` table structure.
- **Metadata**: Updated SEO, PWA, and OpenGraph tags for Sameer & Nihala.
- **Invitation Card UX**: Removed redundant parent details and address lines from the invitation card layout (`InvitationMessage.tsx`), as complete family details are featured in the dedicated "With Heartfelt Blessings" footer section.
- **Audio Experience**: Integrated tab visibility and window blur event listeners (`MusicProvider.tsx`) to auto-pause background music when the browser window loses focus or the active tab is switched.

---

## v2.0.0 — 2026-05-17 | Full RSVP Backend + Polish Sprint

### 🗄️ Live RSVP Backend (Neon PostgreSQL)
- **API GET support added** to `/api/rsvp.ts` — now fetches all submitted RSVPs from Neon DB ordered by `created_at DESC`
- **Local dev API server** (`server.mjs`) created — mirrors Vercel serverless function exactly, connects to real Neon DB on port `3001`
- **Vite proxy** configured in `vite.config.ts` to forward `/api/*` to `localhost:3001` during local development
- **`concurrently`** added as dev dependency; `npm run dev` now starts both Vite frontend and API server simultaneously
- Database schema: `rsvps` table with `full_name`, `attendance`, `guest_count`, `dietary_or_notes`, `created_at`

### 💌 RSVP Section — Full Redesign
- **3-column grid layout**: RSVP Form | Guest Counter | Live Wishes Wall
- All three cards now use the **site's warm theme palette** (`bg-secondary/70 backdrop-blur border border-primary/25`) — no longer dark/charcoal
- **Column 1 — Form**: Name input, Joyfully Accepts / Regretfully Declines toggle, animated guest stepper, blessing textarea, gold submit button with loading state
- **Column 2 — Guest Counter**: Bismillah ornament, attending count + total guests pulled live from Neon DB
- **Column 3 — Live Wishes Wall**: Scrollable list of all RSVPs fetched from DB, animated `AnimatePresence` entries, attending/unable badge, quote + author
- **Mobile layout**: Stacks as form → counter → wishes (one per row)
- Success state: Checkmark + "Shukran!" confirmation with "Submit Another" option

### 🔖 Favicon & PWA
- Created `/public/favicon/favicon.svg` — circular S&N emblem in champagne gold on warm cream
- Added `<link rel="icon">`, `<link rel="shortcut icon">`, `<link rel="apple-touch-icon">` in `index.html`
- **Mobile browser chrome theming**: `theme-color: #141412` (deep charcoal) for Android Chrome, Samsung Internet, Edge
- iOS: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`
- Windows: `msapplication-TileColor`, `msapplication-navbutton-color: #C7A97F`
- `apple-mobile-web-app-title: "Sameer & Nihala"` for iOS home screen

### 📊 Analytics
- **Microsoft Clarity** integrated (`wsl77zfey5`) — session recordings, heatmaps, scroll depth, dead click detection

### 🎨 Scrollbar Theming
- Custom webkit scrollbar: `6px` width, gold `#C7A97F` thumb, cream `#F0EBE2` track, hover darkens to `#a88a61`
- Firefox: `scrollbar-color` + `scrollbar-width: thin`
- Applied globally to page scroll and Wishes Wall inner scroll

### 🌙 InvitationMessage — Bismillah Ornament
- Added animated Bismillah Arabic calligraphy (`﷽`) above the section title to fill blank visual gap between Hero and Invitation

### ⚡ SectionContainer — Padding
- Reduced mobile vertical padding from `py-16` to `py-12` to tighten spacing

### 📝 Documentation
- Updated `README.md` with full feature list, local dev setup, SQL schema, npm scripts table, architecture diagram
- Updated `CHANGELOG.md` (this file)
- Updated all 12 `docs/` files to reflect current architecture

---

## v1.2.0 — Senior Architecture Refinement & Ambient Effects

- **Motion System** (`src/motion/`): Consolidated all animation constants, easing, variants, and stagger tokens
- **UI Component Layer** (`src/components/ui/`): Unified `buttons/`, `cards/`, `inputs/`, `layout/`, `overlays/`
- **SEO Module** (`src/seo/`): Schema.org `Event`/`Wedding` JSON-LD structured data injected via layout
- **Ambient Effects** (`src/effects/`): RAF-optimized Gold Dust Cursor, floating SVG ornaments, breathing glow orbs, parallax layers
- **Smart Audio**: Music auto-pauses on tab switch / window blur, resumes on focus

---

## v1.1.0 — Enterprise Architecture & RSVP Integration

- **Providers** (`src/providers/`): `ThemeProvider`, `LenisProvider`, `MusicProvider`, `ModalProvider`
- **`useCountdown` hook**: Shared countdown logic — eliminates duplicate timer calculations
- **Content Module** (`src/content/`): All UI copy centralized for maintainability
- **RSVP API v1**: Vercel serverless POST endpoint with Neon PostgreSQL, loading states, error handling
- **Social Sharing**: WhatsApp + Instagram share buttons with personalized URLs (`?guest=Name`)
- **OpenGraph & Twitter cards**: Full social preview metadata

---

## v1.0.0 — Production Readiness & UI Refinements

- **Single-page architecture**: Continuous `#F8F4EE` backdrop across all sections
- **Hero Countdown**: Timer embedded directly below wedding date in Hero
- **Venue Card**: Google Maps iframe + navigation button in unified card
- **Google Calendar**: "Add to Google Calendar" button in Countdown section
- **Gallery**: Masonry grid with lightbox from local `/public/images/` WebP files

---

## v0.1.0 — Initial Project Initialization

- Initial project structure, documentation, design system, and base architecture
