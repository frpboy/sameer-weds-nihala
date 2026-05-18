# Animation System

## Philosophy
Animations should feel elegant, calm, and premium.

Avoid:
- aggressive motion
- bouncing effects
- flashy startup-style transitions

## Standard Timing & Curves
- **Fast**: `200ms`
- **Medium**: `400ms`
- **Slow / Luxury**: `800ms` (`EASE.luxury = [0.16, 1, 0.3, 1]`)

## Immersive 3D Ambient Engine (R3F)
- **Exaggerated Cinematic Parallax**: Multi-layered Three.js groups tracking cursor movement at amplified coefficients (`4x` / `3y`) with damped lerping (`0.08`, `0.12`, `0.16`) for an Apple-TV-like wallpaper depth illusion.
- **Breathing Bloom Particles**: 20 soft glowing spheres (`80% muted emerald #355C4D`, `20% champagne #C7A97F`) with additive blending and opposing 3D spatial drift (`sin(t) * 0.4x`, `cos(t) * 0.8z`).
- **Spatial Camera Sway**: Camera gently lerps towards cursor coordinates (`0.8x`, `0.5y`) to create subtle organic world movement.
- **Champagne Dust Cursor Trails**: `MouseTrail3D.tsx` dynamically spawns friction-damped champagne dust that floats upwards and dissolves behind cursor energy.
- **Soft Cursor Bloom**: A 250px soft champagne bloom (`#C7A97F`, `18% opacity`) that lags behind cursor movement like heavy silk air.

## DOM Motion Types (Framer Motion)
- **Fade Up**: Subtle vertical lift (`y: 20 -> 0`).
- **Blur Reveal**: Smooth defocus to focus transitions.
- **Stagger Container**: Sequential cascading reveals for cards and stats.

## Scroll & Performance Safeguards
- **Trigger Once**: Scroll animations trigger once (`viewport={{ once: true }}`) to maintain calm elegance.
- **Reduced Motion**: Respects `useReducedMotion` OS preferences by collapsing translations to pure opacity fades.
- **Performance Monitor**: `usePerformanceMonitor` actively throttles canvas frame loops and heavy effects when low hardware concurrency is detected.
