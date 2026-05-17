export const EASE = {
  luxury: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const SPRING = {
  stiff: { type: 'spring' as const, stiffness: 300, damping: 30 },
  smooth: { type: 'spring' as const, stiffness: 100, damping: 20 },
} as const;
