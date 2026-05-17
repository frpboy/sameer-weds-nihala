import { motion } from 'framer-motion';

export default function FloatingParticles() {
  // 12 soft floating background ornaments with varied speeds and coordinates
  const items = [
    { id: 1, x: '10%', y: '15%', size: 6, delay: 0, duration: 14, type: 'dust' },
    { id: 2, x: '85%', y: '20%', size: 40, delay: 2, duration: 18, type: 'ring' },
    { id: 3, x: '75%', y: '65%', size: 8, delay: 4, duration: 15, type: 'dust' },
    { id: 4, x: '20%', y: '80%', size: 48, delay: 1, duration: 20, type: 'crescent' },
    { id: 5, x: '90%', y: '85%', size: 5, delay: 3, duration: 12, type: 'dust' },
    { id: 6, x: '35%', y: '30%', size: 50, delay: 5, duration: 22, type: 'flower' },
    { id: 7, x: '55%', y: '10%', size: 7, delay: 2, duration: 16, type: 'dust' },
    { id: 8, x: '15%', y: '50%', size: 35, delay: 6, duration: 19, type: 'ring' },
    { id: 9, x: '65%', y: '45%', size: 5, delay: 1, duration: 13, type: 'dust' },
    { id: 10, x: '80%', y: '40%', size: 45, delay: 4, duration: 21, type: 'flower' },
    { id: 11, x: '30%', y: '70%', size: 6, delay: 3, duration: 17, type: 'dust' },
    { id: 12, x: '50%', y: '85%', size: 38, delay: 7, duration: 24, type: 'ring' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {items.map((item) => {
        return (
          <motion.div
            key={item.id}
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
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: item.size,
              height: item.size,
            }}
            className="flex items-center justify-center"
          >
            {item.type === 'dust' && (
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary via-accent to-amber-100 blur-[1px] opacity-70" />
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
        );
      })}
    </div>
  );
}
