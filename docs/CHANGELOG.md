# Changelog

## v1.2.0 - Senior Architecture Refinement & Breathtaking Ambient Effects
- **Unification of Motion Architecture (`src/motion/`)**: Consolidated all fragmented animation constants, timing systems, and legacy variants into a single authoritative motion design system (`src/motion/` with `variants.ts`, `timings.ts`, `easing.ts`, and `presets.ts`). Completely removed duplicate animation folders and legacy constants.
- **UI Component Layer Consolidation (`src/components/ui/`)**: Refactored and unified duplicate component layers between `common` and `ui` into a highly structured `components/ui/` directory (`buttons/`, `cards/`, `inputs/`, `layout/`, and `overlays/`). Replaced redundant card and button variations with single definitive components featuring flexible variants.
- **Modular Wedding Domain Configuration (`src/config/wedding/`)**: Re-architected `config/weddingData.ts` into modular domain configuration files (`couple.ts`, `venue.ts`, `social.ts`, `branding.ts`, and `index.ts`), keeping the top-level export intact for seamless backwards compatibility.
- **SEO & Structured Data Module (`src/seo/`)**: Built dedicated SEO module generating official Schema.org `Event`/`Wedding` JSON-LD structured data and injected it directly into the application layout for premium search engine indexing and social link previews.
- **Breathtaking Ambient Effects (`src/effects/`)**: Implemented a highly performant, GPU-accelerated ambient effects ecosystem. Features a custom RAF-optimized Gold Dust Cursor (desktop only via fine pointer media query), ultra-slow floating SVG ornaments (< 20 items), soft breathing ambient glow orbs, and multi-layered scroll parallax to provide luxury cinematic depth.
- **Smart Background Audio Management**: Enhanced `MusicProvider` with automated tab visibility and window focus listeners. Background ambient music automatically pauses when the user switches tabs or changes apps, and gracefully resumes upon focus.

## v1.1.0 - Enterprise Architecture & Foundational Governance
- **Centralized Providers (`src/providers/`)**: Established composite root provider architecture incorporating `ThemeProvider`, `LenisProvider`, `MusicProvider`, and `ModalProvider` to govern global UI state, theme tokens, audio playback, and modal gallery interactions.
- **Unified Motion & Reduced Motion Support**: Centralized animation constants and transition variants in `src/constants/motion.ts`. Implemented `useReducedMotion` hook to respect OS accessibility preferences (`prefers-reduced-motion: reduce`) and optimize battery life on legacy mobile hardware.
- **Shared Business Hooks & Libs**: Created reusable `useCountdown` hook to eliminate duplicate timer calculation logic. Built robust `src/lib/` utilities for Google Calendar URL generation, map links, and social sharing.
- **Centralized Content Module (`src/content/`)**: Extracted all hardcoded UI copy, invitation messages, and headings into a single centralized content dictionary for seamless maintainability and localization.
- **Serverless PostgreSQL RSVP Integration**: Built Vercel serverless API endpoint (`/api/rsvp.ts`) connecting to Neon PostgreSQL via `@neondatabase/serverless` over secure HTTP. Integrated frontend RSVP form with live loading states, robust error handling, and success confirmation.
- **Premium UX & Social Sharing**: Updated footer social buttons to provide direct sharing options for both WhatsApp and Instagram (`Share on WhatsApp` & `Share to Instagram`) including the full invitation details and exact Vercel link (`https://shabin-weds-sana.vercel.app/`). Implemented dynamic URL personalization (`?guest=Name`) in `SplashIntro`. Established foundational testing suite using Vitest (`npm test`). Removed top progress indicator per user design directive. Added creator credit hyperlink for Rahul in footer. Comprehensive OpenGraph and Twitter card metadata added.

## v1.0.0 - Production Readiness & UI Refinements
- **Seamless Single-Page Architecture**: Re-engineered section containers to share a continuous `#F8F4EE` warm ivory backdrop, removing harsh block borders and contrasting background fills across all sections and footer.
- **Embedded Hero Countdown**: Integrated the countdown timer directly into the Hero screen beneath the wedding date inside premium glassmorphic blocks.
- **Unified Venue Card & Interactive Map**: Consolidated the location information and Google Maps iframe into a single elegant card. Switched to official Google Maps query format (`q=Shifa Convention Center`) with a zoomed-out regional view (`z=12`) and precise location marker pin.
- **Google Calendar & WhatsApp Integration**: Added "Add to Google Calendar" button alongside the map navigation button. Formatted all sharing links with formal text and removed all emojis across the website per user preference.
- **Refined Typography & Buttons**: Restructured couple headings to stack cleanly on 3 lines (`Groom` on line 1, `&` on line 2, `Bride` on line 3) to prevent mobile word wrapping. Replaced solid footer buttons with delicate glass outline variants (`variant="glass"`).
- **Carousel Enhancements**: Transformed the gallery into a vertical portrait (`9:16`) mobile carousel with 5-second auto-scrolling (with hover pause support) and sleek Instagram-style bullet pagination indicators.

## v0.1.0 - Initial Project Initialization
- Initial project structure created
- Documentation setup completed
- Design system defined
- Base architecture finalized
