import { memo } from 'react';
import NoiseOverlay from './NoiseOverlay';

const AmbientScene = memo(function AmbientScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      <NoiseOverlay />
    </div>
);
});

export default AmbientScene;
