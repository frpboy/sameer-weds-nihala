import { EASE } from './easing';
import { DURATIONS, STAGGER } from './timings';

export const VARIANTS = {
  fadeUp: (reducedMotion = false) => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: DURATIONS.normal, ease: EASE.luxury }
    }
  }),
  scaleUp: (reducedMotion = false) => ({
    hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: DURATIONS.medium, ease: EASE.luxury }
    }
  }),
  fadeIn: () => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: DURATIONS.normal, ease: EASE.smooth }
    }
  }),
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER.item,
        delayChildren: STAGGER.containerDelay,
      }
    }
  }
} as const;
