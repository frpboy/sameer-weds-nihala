# Changelog

## v1.1.0 - Enterprise Architecture & Foundational Governance
- **Centralized Providers (`src/providers/`)**: Established composite root provider architecture incorporating `ThemeProvider`, `LenisProvider`, `MusicProvider`, and `ModalProvider` to govern global UI state, theme tokens, audio playback, and modal gallery interactions.
- **Unified Motion & Reduced Motion Support**: Centralized animation constants and transition variants in `src/constants/motion.ts`. Implemented `useReducedMotion` hook to respect OS accessibility preferences (`prefers-reduced-motion: reduce`) and optimize battery life on legacy mobile hardware.
- **Shared Business Hooks & Libs**: Created reusable `useCountdown` hook to eliminate duplicate timer calculation logic. Built robust `src/lib/` utilities for Google Calendar URL generation, map links, and social sharing.
- **Centralized Content Module (`src/content/`)**: Extracted all hardcoded UI copy, invitation messages, and headings into a single centralized content dictionary for seamless maintainability and localization.
- **Premium UX & Testing**: Integrated subtle top scroll progress indicator in `MainLayout`. Implemented dynamic URL personalization (`?guest=Name`) in `SplashIntro`. Established foundational testing suite using Vitest (`npm test`).

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
