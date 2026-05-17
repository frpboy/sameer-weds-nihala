import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingParticles() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 80 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 80; // Parallax range
      const y = (e.clientY / window.innerHeight - 0.5) * 80;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const items = [
    { id: 1, x: '10%', y: '15%', size: 6, delay: 0, duration: 14, type: 'dust', depth: 1.5 },
    { id: 2, x: '85%', y: '20%', size: 40, delay: 2, duration: 18, type: 'ring', depth: -0.8 },
    { id: 3, x: '75%', y: '65%', size: 8, delay: 4, duration: 15, type: 'dust', depth: 2.2 },
    { id: 4, x: '20%', y: '80%', size: 48, delay: 1, duration: 20, type: 'crescent', depth: -1.2 },
    { id: 5, x: '90%', y: '85%', size: 5, delay: 3, duration: 12, type: 'dust', depth: 1.8 },
    { id: 6, x: '35%', y: '30%', size: 50, delay: 5, duration: 22, type: 'flower', depth: -0.5 },
    { id: 7, x: '55%', y: '10%', size: 7, delay: 2, duration: 16, type: 'dust', depth: 2.0 },
    { id: 8, x: '15%', y: '50%', size: 35, delay: 6, duration: 19, type: 'ring', depth: -1.0 },
    { id: 9, x: '65%', y: '45%', size: 5, delay: 1, duration: 13, type: 'dust', depth: 1.4 },
    { id: 10, x: '80%', y: '40%', size: 45, delay: 4, duration: 21, type: 'flower', depth: -1.5 },
    { id: 11, x: '30%', y: '70%', size: 6, delay: 3, duration: 17, type: 'dust', depth: 1.7 },
    { id: 12, x: '50%', y: '85%', size: 38, delay: 7, duration: 24, type: 'ring', depth: -0.9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {items.map((item) => {
        const shiftX = useTransform(smoothX, (v) => v * item.depth);
        const shiftY = useTransform(smoothY, (v) => v * item.depth);

        return (
          <motion.div
            key={item.id}
            style={{
              x: shiftX,
              y: shiftY,
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: item.size,
              height: item.size,
            }}
            className="pointer-events-none flex items-center justify-center will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0.1, y: 0, rotate: 0 }}
              animate={{
                opacity: [0.15, 0.4, 0.15],
                y: [-15, 15, -15],
                rotate: item.type !== 'dust' ? [0, 10, -5, 0] : 0,
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full flex items-center justify-center will-change-transform"
            >
              {item.type === 'dust' && (
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary via-accent to-amber-100 blur-[1px] opacity-70 shadow-[0_0_8px_rgba(199,169,127,0.4)]" />
              )}

              {item.type === 'ring' && (
                <div className="w-full h-full rounded-full border border-primary/25 bg-transparent" />
              )}

              {item.type === 'crescent' && (
                <svg viewBox="0 0 24 24" className="w-full h-full text-primary/20 fill-current">
                  <path d="M12 2a9.98 9.98 0 0 1 7.74 3.65 10 10 0 1 0 0 12.7A9.98 9.98 0 0 1 12 22 10 10 0 0 1 12 2Z" />
                </svg>
              )}

              {item.type === 'flower' && (
                <svg viewBox="0 0 24 24" className="w-full h-full text-primary/15 stroke-current fill-none" strokeWidth="1">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z" />
                </svg>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
