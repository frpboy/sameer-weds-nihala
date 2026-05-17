export const TIMINGS = {
  FAST: 0.3,
  NORMAL: 0.8,
  SLOW: 1.2,
  STAGGER_ITEM: 0.15,
} as const;

export const EASING = {
  LUXURY: [0.16, 1, 0.3, 1] as [number, number, number, number],
  SMOOTH: 'easeInOut',
} as const;
