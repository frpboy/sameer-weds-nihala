import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/90 to-secondary/80" />

      {/* Decorative Islamic Geometric Patterns / Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360, opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border border-primary/30 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[80%] h-[80%] border border-primary/20 flex items-center justify-center"
        >
          <motion.div 
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[80%] h-[80%] border border-primary/30 rounded-full" 
          />
        </motion.div>
      </div>

      {/* Subtle floating ambient light orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl"
      />
    </div>
  );
}
