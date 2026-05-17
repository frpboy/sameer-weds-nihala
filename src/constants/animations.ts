import { TIMINGS, EASING } from './timings';

export const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: TIMINGS.NORMAL, ease: EASING.LUXURY } 
  },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: TIMINGS.NORMAL, ease: EASING.SMOOTH } 
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMINGS.STAGGER_ITEM,
      delayChildren: 0.1,
    },
  },
};

export const SCALE_UP = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMINGS.NORMAL, ease: EASING.LUXURY },
  },
};
