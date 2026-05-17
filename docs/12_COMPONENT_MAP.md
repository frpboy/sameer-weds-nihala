# 12 — Component Map

Current inventory of all active components as of v2.0.0.

## Pages
| Component | Path | Description |
|---|---|---|
| `Home` | `src/pages/Home.tsx` | Root page — renders all sections in order, controls SplashIntro gate |

## Sections (in render order)
| Component | Section ID | Description |
|---|---|---|
| `SplashIntro` | — | Full-screen splash with S&S monogram, Bismillah, Surah, "Open Invitation" CTA |
| `Hero` | `#hero` | Parallax background + hero content with live countdown |
| `HeroBackground` | — | Mouse-reactive animated geometry layer |
| `HeroContent` | — | Names, date, countdown tiles, scroll indicator |
| `InvitationMessage` | `#invitation` | Bismillah ornament + Surah Ar-Rum quote + invite text |
| `CountdownSection` | `#countdown` | Standalone countdown with "Add to Google Calendar" |
| `TimelineSection` | `#timeline` | Wedding day event schedule |
| `VenueSection` | `#venue` | Google Maps embed + venue details + navigation button |
| `FamilySection` | `#family` | Family member introductions |
| `GallerySection` | `#gallery` | Masonry photo grid from `/public/images/`, lightbox modal |
| `RsvpSection` | `#rsvp` | 3-column: Form | Guest Counter | Live Wishes Wall (Neon DB) |
| `Footer` | — | S&S monogram, social share buttons, credits |

## UI Components
| Component | Path | Variants |
|---|---|---|
| `Button` | `ui/buttons/Button.tsx` | `solid`, `outline`, `ghost` |
| `FloatingMusicButton` | `ui/buttons/FloatingMusicButton.tsx` | — |
| `Card` | `ui/cards/Card.tsx` | `glass`, `default`, `outline` |
| `SectionContainer` | `ui/layout/SectionContainer.tsx` | — |
| `SectionTitle` | `ui/layout/SectionTitle.tsx` | — |
| `AnimatedDivider` | `ui/layout/AnimatedDivider.tsx` | — |

## Effects
| Component | Path | Description |
|---|---|---|
| `AmbientEffects` | `effects/index.ts` | Orchestrates all ambient layers |
| `MouseTrail` | `effects/MouseTrail.tsx` | Gold heart particles following cursor |
| `FloatingOrnaments` | `effects/FloatingOrnaments.tsx` | Slow-drifting SVG geometric ornaments |
| `AmbientGlow` | `effects/AmbientGlow.tsx` | Breathing radial glow orbs |

## Hooks
| Hook | Description |
|---|---|
| `useCountdown` | Returns `{ days, hours, minutes, seconds }` from target date |
| `useReducedMotion` | Returns `true` if OS prefers reduced motion |

## Providers
| Provider | Description |
|---|---|
| `MusicProvider` | Controls ambient audio playback, auto-pauses on tab blur |
| `LenisProvider` | Lenis smooth scroll initialization |
| `ModalProvider` | Gallery lightbox open/close state |
| `ThemeProvider` | CSS variable token injection |
