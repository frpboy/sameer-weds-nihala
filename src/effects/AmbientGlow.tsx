import { motion } from 'framer-motion';

export default function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Ambient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20vw] -left-[20vw] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-primary/30 via-accent/10 to-transparent blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[40vh] -right-[20vw] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tl from-primary/25 via-accent/10 to-transparent blur-[100px]"
      />

      {/* Subtle Luxury Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
    </div>
  );
}
