export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
} as const;

export const SPRING = {
  stiff: { type: 'spring' as const, stiffness: 300, damping: 30 },
  smooth: { type: 'spring' as const, stiffness: 100, damping: 20 },
} as const;

export const VARIANTS = {
  fadeUp: (reducedMotion = false) => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: DURATIONS.medium, ease: EASE }
    }
  }),
  scaleUp: (reducedMotion = false) => ({
    hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: DURATIONS.fast, ease: EASE }
    }
  }),
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  }
};
