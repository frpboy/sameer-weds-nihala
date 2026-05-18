# 💍 Sameer & Nihala | Premium Wedding Invitation Microsite

> An elegant, mobile-first digital wedding invitation microsite for **Mohammed Sameer Kallangadan (S/o Abdulla Kallangadan & Ramlath OP) & Nihala Jasmin KK (D/o Abdul Azeez)**, crafted with React, Vite, Tailwind CSS (v4), and Framer Motion. Deployed on Vercel with a live Neon PostgreSQL RSVP backend.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrpboy%2Fsameer-weds-nihala)
[![Live Site](https://img.shields.io/badge/Live%20Site-sameer--weds--nihala.vercel.app-brightgreen)](https://sameer-weds-nihala.vercel.app/)

---

## 🌟 Overview

Designed to evoke calm, emotional resonance, and high-fidelity aesthetics, this microsite serves as an immersive interactive invitation experience. Built specifically for seamless performance across modern and low-end mobile viewports (including WhatsApp and Instagram in-app browsers).

### ✨ Core Features

| Feature | Description |
|---|---|
| 📜 **Splash Calligraphy** | Elegant envelope intro with Surah Ar-Rum, Bismillah, and S&N monogram |
| ✨ **Parallax Hero** | Mouse-reactive ambient geometry with Cinzel & Cormorant Garamond typography |
| ⏳ **Live Countdown** | High-precision countdown to July 19, 2026 — shown in Hero and Countdown section |
| 🎨 **Mouse Trail** | Golden heart particle trail following cursor movement |
| 🗺️ **Venue & Navigation** | Google Maps embed + direct routing button (Shifa Convention Center) |
| 🖼️ **Gallery** | Masonry photo grid with dynamic image loading from local `/public/images/` |
| 💌 **Live RSVP** | Form → Neon PostgreSQL DB → Live Wishes Wall with real-time guest count |
| 🎵 **Ambient Audio** | Floating persistent music player with auto-pause on tab switch / window blur |
| 📱 **Mobile PWA** | Theme-colored status bar, iOS home screen support, S&N favicon |
| 📊 **Analytics** | Microsoft Clarity (session recordings + heatmaps) |

---

## 🚀 Quickstart

### Prerequisites
- Node.js v20+
- npm

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/frpboy/sameer-weds-nihala.git
   cd sameer-weds-nihala
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** — create/update `.env` file:
   ```env
   DATABASE_URL=postgresql://...your-neon-connection-string...
   ```

4. **Initialize the database** — run this in the [Neon SQL Editor](https://console.neon.tech):
   ```sql
   CREATE TABLE IF NOT EXISTS rsvps (
     id SERIAL PRIMARY KEY,
     full_name VARCHAR(255) NOT NULL,
     attendance VARCHAR(50) NOT NULL,
     guest_count VARCHAR(50) DEFAULT '1',
     dietary_or_notes TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start both dev servers** (Vite frontend + Neon API):
   ```bash
   npm run dev
   ```
   - Frontend → `http://localhost:5173`
   - RSVP API → `http://localhost:3001/api/rsvp` (proxied via Vite)

6. **Production build**:
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture

```
sameer-weds-nihala/
├── api/
│   └── rsvp.ts               # Vercel serverless: GET (fetch) + POST (save) RSVPs → Neon DB
├── server.mjs                # Local dev API server (mirrors Vercel function, port 3001)
├── public/
│   ├── favicon/favicon.svg   # S&N circular gold emblem
│   ├── images/               # All wedding photos (local WebP)
│   └── audio/ambient.mp3     # Background music
├── docs/                     # Full architectural documentation (12 docs + CHANGELOG)
└── src/
    ├── components/
    │   ├── sections/         # HeroContent, CountdownSection, RsvpSection, GallerySection…
    │   └── ui/               # Button, Card, SectionContainer, SectionTitle…
    ├── config/weddingData.ts # Single source of truth for names, dates, venue
    ├── content/              # Centralized UI copy
    ├── effects/              # MouseTrail (gold hearts), AmbientEffects
    ├── hooks/                # useCountdown, useReducedMotion
    ├── motion/               # VARIANTS, EASE, STAGGER tokens
    ├── providers/            # Music, Lenis, Modal, Theme providers
    ├── seo/                  # JSON-LD structured data
    └── styles/globals.css    # Tailwind v4 + themed scrollbar
```

---

## 🎨 Customization

Edit `src/config/wedding/couple.ts` and `venue.ts` to change content:

```typescript
export const couple = {
  groom: {
    fullName: "Mohammed Sameer Kallangadan",
    firstName: "Mohammed Sameer",
    lastName: "Kallangadan",
    shortName: "Sameer",
    parents: "S/o Abdulla Kallangadan & Ramlath OP",
    address: "Kallangadan House, Perinthalmanna",
  },
  bride: {
    fullName: "Nihala Jasmin KK",
    firstName: "Nihala Jasmin",
    lastName: "KK",
    shortName: "Nihala",
    parents: "D/o Abdul Azeez",
    address: "Karukulam (H), Puliyanamkunnu (P.O), Chalavara via, Palakkad dist - 679505",
  },
  coupleName: "Sameer & Nihala",
  monogram: "S&N",
} as const;
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite + TypeScript |
| Styling | Tailwind CSS v4 + PostCSS |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Icons | React Icons (Bi, Md) |
| Database | Neon PostgreSQL (serverless) |
| API | Vercel Serverless Functions |
| Analytics | Microsoft Clarity |
| Deployment | Vercel |

---

## 📦 NPM Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts Vite frontend + local Neon API server concurrently |
| `npm run dev:vite` | Vite frontend only |
| `npm run dev:api` | Local API server only (port 3001) |
| `npm run build` | TypeScript check + production bundle |
| `npm run preview` | Preview production build locally |
| `npm run optimize` | Compress images to WebP |
| `npm test` | Run Vitest test suite |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import into Vercel
3. Add `DATABASE_URL` environment variable in Vercel project settings
4. Deploy — `/api/rsvp.ts` is automatically served as a serverless function

---

## 📄 License

Made with love & prayers. © 2026 Sameer & Nihala. All rights reserved.