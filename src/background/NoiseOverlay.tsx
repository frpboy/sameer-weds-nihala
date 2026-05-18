import { memo } from 'react';

const NoiseOverlay = memo(function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.025] mix-blend-overlay overflow-hidden select-none" aria-hidden="true">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
});

export default NoiseOverlay;
