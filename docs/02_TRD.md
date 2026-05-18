# Technical Requirements Document

## Architecture & Stack
- **Framework**: React 19 + Vite + TypeScript
- **Immersive 3D**: Three.js + React Three Fiber (R3F) + Drei
- **Styling**: Tailwind CSS v4 + PostCSS
- **Animation**: Framer Motion
- **Routing**: Single-page continuous scroll architecture
- **Scrolling**: Lenis smooth scroll
- **Icons**: React Icons (Bi, Md, Fa)
- **Database & API**: Neon PostgreSQL serverless DB + Vercel Serverless Functions
- **Deployment**: Vercel

## Animation Approach
- Use fade-up, slow parallax, blur reveals, smooth opacity transitions, and elegant stagger.
- **Cinematic 3D Parallax**: Exaggerated mouse depth layers (`4x` / `3y` multipliers) with breathing muted warm emerald particles (`#355C4D`) and soft champagne cursor bloom (`#C7A97F`).
- **Performance Throttling**: Active monitoring via `usePerformanceMonitor` to throttle canvas frame loops on low-concurrency or low-end mobile devices.
- Avoid bouncing animations, flashy neon RGB effects, and generic startup landing page behavior.
- Wedding sites should feel calm, luxurious, and emotional.

## Responsive Strategy
- **Mobile-first approach**
- Optimize for:
  - WhatsApp & Instagram browser
  - Samsung midrange phones
  - Poor network
  - One-hand scrolling

## Image Optimization Rules
- Ensure images are compressed (WebP/AVIF where possible).
- Use proper loading attributes (`loading="lazy"`).
- Keep file sizes small for fast loading on poor networks.

## Reusable Component Structure
- Maintain components in `src/components/` split into `common/`, `sections/`, and `ui/`.
- Strict naming conventions: PascalCase for components, camelCase for functions/hooks.
