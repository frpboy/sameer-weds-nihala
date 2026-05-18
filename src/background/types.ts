export interface MotionContextType {
  isLowEnd: boolean;
  isLazyLoaded: boolean;
  prefersReduced: boolean;
  gyroEnabled: boolean;
  gyroOffset: { x: number; y: number };
  mouseOffset: { x: number; y: number };
  enableMotion: () => void;
}
