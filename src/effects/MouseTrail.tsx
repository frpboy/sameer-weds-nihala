import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  scale: number;
  active: boolean;
}

const PARTICLE_COUNT = 15;

export default function MouseTrail() {
  const auraRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particles = useRef<Particle[]>([]);
  const poolIndex = useRef(0);
  const lastSpawnTime = useRef(0);

  // Smooth aura coordinates
  const mouseCoords = useRef({ x: 0, y: 0, currX: 0, currY: 0 });

  useEffect(() => {
    // Only enable on devices with fine pointer (desktop)
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    // Initialize particle pool
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      alpha: 0,
      scale: 1,
      active: false,
    }));

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;

      const now = performance.now();
      if (now - lastSpawnTime.current < 45) return; // Limit spawn rate
      lastSpawnTime.current = now;

      const idx = poolIndex.current;
      const p = particles.current[idx];
      const el = particleRefs.current[idx];

      if (p && el) {
        p.x = e.clientX;
        p.y = e.clientY;
        p.vx = (Math.random() - 0.5) * 1.0;
        p.vy = -1 - Math.random() * 1.2; // Slight upward drift
        p.alpha = 1;
        p.scale = 0.4 + Math.random() * 0.5;
        p.active = true;

        el.style.display = 'block';
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) scale(${p.scale})`;
        el.style.opacity = '1';
      }

      poolIndex.current = (poolIndex.current + 1) % PARTICLE_COUNT;
    };

    const updateLoop = () => {
      // Smooth lerp aura
      const mc = mouseCoords.current;
      mc.currX += (mc.x - mc.currX) * 0.12;
      mc.currY += (mc.y - mc.currY) * 0.12;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${mc.currX - 150}px, ${mc.currY - 150}px, 0px)`;
      }

      // Update particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles.current[i];
        const el = particleRefs.current[i];

        if (p.active && el) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.025; // Fade out

          if (p.alpha <= 0) {
            p.active = false;
            el.style.display = 'none';
          } else {
            el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) scale(${p.scale})`;
            el.style.opacity = p.alpha.toFixed(2);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      {/* Slow blurred glow cursor aura (opacity 0.08 max) */}
      <div
        ref={auraRef}
        className="absolute left-0 top-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary via-amber-200 to-accent blur-[60px] opacity-8 will-change-transform"
      />

      {/* Subtle gold dust particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { particleRefs.current[i] = el; }}
          style={{ display: 'none' }}
          className="absolute left-0 top-0 w-2 h-2 rounded-full bg-gradient-to-t from-primary via-accent to-amber-200 blur-[0.5px] will-change-transform"
        />
      ))}
    </div>
  );
}
