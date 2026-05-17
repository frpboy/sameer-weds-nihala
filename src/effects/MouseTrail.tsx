import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  scale: number;
  rot: number;
  vrot: number;
  active: boolean;
  symbol: string;
}

const PARTICLE_COUNT = 30;
const SYMBOLS = ['♥', '✨', '✦', '♥', '•', '♥'];

export default function MouseTrail() {
  const auraRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particles = useRef<Particle[]>([]);
  const poolIndex = useRef(0);
  const lastSpawnTime = useRef(0);

  const mouseCoords = useRef({ x: 0, y: 0, currX: 0, currY: 0 });

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    particles.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      alpha: 0,
      scale: 1,
      rot: 0,
      vrot: 0,
      active: false,
      symbol: SYMBOLS[i % SYMBOLS.length],
    }));

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;

      const now = performance.now();
      if (now - lastSpawnTime.current < 30) return;
      lastSpawnTime.current = now;

      const idx = poolIndex.current;
      const p = particles.current[idx];
      const el = particleRefs.current[idx];

      if (p && el) {
        p.x = e.clientX - 10;
        p.y = e.clientY - 10;
        p.vx = (Math.random() - 0.5) * 1.5;
        p.vy = -0.8 - Math.random() * 1.5; // Drift upwards
        p.alpha = 1;
        p.scale = 0.6 + Math.random() * 0.8;
        p.rot = Math.random() * 360;
        p.vrot = (Math.random() - 0.5) * 3;
        p.active = true;

        el.style.display = 'flex';
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) scale(${p.scale}) rotate(${p.rot}deg)`;
        el.style.opacity = '1';
      }

      poolIndex.current = (poolIndex.current + 1) % PARTICLE_COUNT;
    };

    const updateLoop = () => {
      const mc = mouseCoords.current;
      mc.currX += (mc.x - mc.currX) * 0.15;
      mc.currY += (mc.y - mc.currY) * 0.15;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${mc.currX - 150}px, ${mc.currY - 150}px, 0px)`;
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles.current[i];
        const el = particleRefs.current[i];

        if (p.active && el) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;
          p.alpha -= 0.018; // Smooth, lingering fade

          if (p.alpha <= 0) {
            p.active = false;
            el.style.display = 'none';
          } else {
            el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) scale(${p.scale}) rotate(${p.rot}deg)`;
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
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none" aria-hidden="true">
      {/* Soft golden aura tracking cursor */}
      <div
        ref={auraRef}
        className="absolute left-0 top-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/25 via-amber-400/15 to-transparent blur-[70px] opacity-30 will-change-transform"
      />

      {/* Floating Hearts & Sparkles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const symbol = SYMBOLS[i % SYMBOLS.length];
        const isHeart = symbol === '♥';
        return (
          <div
            key={i}
            ref={(el) => { particleRefs.current[i] = el; }}
            style={{ display: 'none' }}
            className={`absolute left-0 top-0 items-center justify-center font-cinzel will-change-transform drop-shadow-[0_2px_8px_rgba(199,169,127,0.6)] ${
              isHeart ? 'text-rose-500/90 text-lg md:text-xl' : 'text-primary text-sm md:text-base font-bold'
            }`}
          >
            {symbol}
          </div>
        );
      })}
    </div>
  );
}
