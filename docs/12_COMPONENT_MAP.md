# 12 — Component Map

Current inventory of all active components as of v3.2.0.

## Pages
| Component | Path | Description |
|---|---|---|
| `Home` | `src/pages/Home.tsx` | Root page — renders all sections in order, controls SplashIntro gate |

## Sections (in render order)
| Component | Section ID | Description |
|---|---|---|
| `SplashIntro` | — | Full-screen splash with S&N monogram, Bismillah, couple names (`firstName`), CTA |
| `Hero` | `#hero` | Parallax background + hero content with live countdown |
| `HeroBackground3D` | `background/HeroBackground3D.tsx` | R3F immersive canvas with exaggerated parallax, bloom particles & soft cursor bloom |
| `HeroContent` | `sections/HeroContent.tsx` | Couple short names, date, countdown tiles, scroll indicator |
| `InvitationMessage` | `#invitation` | Bismillah ornament + Surah Ar-Rum quote (`.quote-poetic`) + single-line couple names |
| `CountdownSection` | `#countdown` | Standalone countdown with "Add to Google Calendar" |
| `TimelineSection` | `#timeline` | Wedding day event schedule |
| `VenueSection` | `#venue` | Google Maps embed + venue details + navigation button |
| `FamilySection` | `#family` | Family member introductions |
| `GallerySection` | `#gallery` | Masonry photo grid from `/public/images/`, lightbox modal |
| `RsvpSection` | `#rsvp` | 3-column orchestrator wrapping Form, Guest Counter, and Wishes Wall |
| `RsvpForm` | `sections/rsvp/RsvpForm.tsx` | Attendance toggle, guest count stepper, notes, Neon DB submission |
| `GuestCounter` | `sections/rsvp/GuestCounter.tsx` | Bismillah calligraphy + live attending and total guest counts |
| `WishesWall` | `sections/rsvp/WishesWall.tsx` | Live scrollable wishes wall pulled from Neon PostgreSQL |
| `Footer` | — | S&N monogram, single-line names, WhatsApp + Instagram share buttons |

## UI Components
| Component | Path | Variants |
|---|---|---|
| `Button` | `ui/buttons/Button.tsx` | `solid`, `outline`, `glass` |
| `FloatingMusicButton` | `ui/buttons/FloatingMusicButton.tsx` | Controls audio playback + focus/blur resume tracking |
| `Card` | `ui/cards/Card.tsx` | `glass`, `default`, `outline`, `flat`, `soft` |
| `SectionContainer` | `ui/layout/SectionContainer.tsx` | — |
| `SectionTitle` | `ui/layout/SectionTitle.tsx` | — |
| `AnimatedDivider` | `ui/layout/AnimatedDivider.tsx` | — |

## Background & Ambient Motion Engine (R3F)
| Component | Path | Description |
|---|---|---|
| `AmbientScene` | `background/AmbientScene.tsx` | Fixed full-viewport wrapper for 3D canvas and noise overlay |
| `HeroBackground3D` | `background/HeroBackground3D.tsx` | Three.js canvas with 4x/3y cinematic parallax and breathing bloom particles |
| `MouseTrail3D` | `background/MouseTrail3D.tsx` | Friction-damped soft glowing champagne dust cursor energy |
| `NoiseOverlay` | `background/NoiseOverlay.tsx` | 3% cinematic film grain overlay |

## Hooks
| Hook | Description |
|---|---|
| `useCountdown` | Returns `{ days, hours, minutes, seconds }` from target date |
| `useReducedMotion` | Returns `true` if OS prefers reduced motion |
| `usePerformanceMonitor` | Throttles animations and frame loops on low-concurrency devices |

## Providers
| Provider | Description |
|---|---|
| `MusicProvider` | Controls ambient audio playback with robust window focus resume tracking |
| `LenisProvider` | Lenis smooth scroll initialization |
| `ModalProvider` | Gallery lightbox open/close state |
| `ThemeProvider` | Dynamic palette presets (`royalGold`, `romanticRose`, `editorialIvory`, `emeraldLuxury`) |
