# 💍 Shabin & Sana | Premium Wedding Invitation

> An elegant, mobile-first digital wedding invitation microsite for **Muhammed Shabin & Sana Subair**, crafted with React, Vite, Tailwind CSS (v4), and Framer Motion.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrpboy%2Fshabin-weds-sana)

---

## 🌟 Overview

Designed to evoke calm, emotional resonance, and high-fidelity aesthetics, this microsite serves as an interactive invitation experience. Built specifically for seamless performance across modern and low-end mobile viewports (including WhatsApp and Instagram in-app browsers).

### ✨ Core Features
- **📜 Splash Calligraphy**: Elegant envelope/intro experience with Surah Ar-Rum calligraphy and **S&S** monogram.
- **✨ Parallax Hero**: Ambient light orbs with custom serif typography (`Cinzel` & `Cormorant Garamond`).
- **⏳ High-Precision Countdown**: Live countdown timer to July 19, 2026.
- **🗺️ Venue & Navigation**: Direct Google Maps integration and routing.
- **🖼️ Lightbox Gallery**: High-fidelity masonry photo grid with interactive zoom modal.
- **💌 Guest RSVP**: Integrated submission form for attendance and guest counts.
- **🎵 Ambient Audio**: Floating persistent background audio player.
- **📲 Social Integration**: One-tap share buttons tailored for WhatsApp and Instagram.

---

## 🚀 Quickstart

### Prerequisites
- Node.js (v20+ recommended)
- npm or pnpm

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/frpboy/shabin-weds-sana.git
   cd shabin-weds-sana
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture & Documentation

All architectural standards and guidelines are strictly maintained in the `docs/` folder:

```
shabin-weds-sana/
├── docs/
│   ├── 01_PRD.md                 # Product Vision & Target Audience
│   ├── 02_TRD.md                 # Technical Architecture & Standards
│   ├── 03_UI_UX.md               # Design System & Motion Rules
│   ├── 04_APPFLOW.md             # Navigation & Screen Sequences
│   ├── 05_SCHEMA.md              # TypeScript Interfaces for Content
│   ├── 06_IMPLEMENTATION_PLAN.md # Phased Execution Strategy
│   ├── 07_DESIGN_SYSTEM.md       # Color Palette & Typography Hierarchy
│   ├── 08_DEPLOYMENT.md          # Vercel Pre-flight Checklist
│   ├── 09_SEO.md                 # Open Graph & Social Sharing Rules
│   ├── 10_ASSET_GUIDELINES.md    # Media Compression & WebP Rules
│   ├── 11_ANIMATION_SYSTEM.md    # Easing Tokens & Motion Limits
│   ├── 12_COMPONENT_MAP.md       # Component Inventory
│   └── CHANGELOG.md              # Version History
│
├── src/
│   ├── animations/               # Reusable Motion Presets
│   ├── components/               # Split into common/, sections/, ui/
│   ├── config/                   # Centralized weddingData.ts
│   ├── constants/                # Magic strings/numbers (Routes, Timings)
│   ├── theme/                    # Color & Typography Tokens
│   └── styles/                   # Tailwind v4 globals.css
```

---

## 🎨 Configuration & Content

To customize the couple names, dates, venue information, or theme colors, simply update `src/config/weddingData.ts`:

```typescript
export const weddingData = {
  groom: {
    fullName: "Muhammed Shabin",
    shortName: "Shabin",
  },
  bride: {
    fullName: "Sana Subair",
    shortName: "Sana",
  },
  coupleName: "Shabin & Sana",
  monogram: "S&S",
  wedding: { date: "2026-07-19", day: "Sunday" },
  theme: {
    primary: "#C7A97F",    // Champagne gold
    secondary: "#F8F4EE",  // Warm ivory
    accent: "#2E4A3D",     // Deep emerald
    text: "#1A1A1A",       // Matte black
  },
};
```

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **Animation**: Framer Motion
- **Scrolling**: Lenis Smooth Scroll
- **Icons**: React Icons
- **Deployment**: Vercel

---

## 📄 License

Made with love & prayers. © 2026 Shabin & Sana. All rights reserved.