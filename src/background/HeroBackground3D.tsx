import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const createGlowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
};

// 1. Giant Ambient Glow Cloud (Using soft feather-edged sprites for luxurious champagne & emerald haze)
function AmbientGlow({ texture }: { texture: THREE.CanvasTexture }) {
  const sprite1Ref = useRef<THREE.Sprite>(null);
  const sprite2Ref = useRef<THREE.Sprite>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sprite1Ref.current) {
      sprite1Ref.current.position.x = Math.sin(t * 0.2) * 2;
      sprite1Ref.current.position.y = Math.cos(t * 0.15) * 1.5;
      (sprite1Ref.current.material as THREE.SpriteMaterial).opacity = 0.45 + Math.sin(t * 0.4) * 0.1;
    }
    if (sprite2Ref.current) {
      sprite2Ref.current.position.x = Math.cos(t * 0.18) * 2.5;
      sprite2Ref.current.position.y = Math.sin(t * 0.22) * 2;
      (sprite2Ref.current.material as THREE.SpriteMaterial).opacity = 0.38 + Math.cos(t * 0.35) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -14]}>
      {/* Champagne Gold Warm Haze */}
      <sprite ref={sprite1Ref} scale={[28, 28, 1]} position={[-3, 1, 0]}>
        <spriteMaterial map={texture} color="#C7A97F" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {/* Soft Emerald Glow */}
      <sprite ref={sprite2Ref} scale={[32, 32, 1]} position={[3, -1, 0]}>
        <spriteMaterial map={texture} color="#2E4A3D" transparent opacity={0.38} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
    </group>
  );
}

// 2. Soft Champagne Cursor Atmosphere (250px soft radial bloom moving like heavy air)
function CursorGlow({ texture }: { texture: THREE.CanvasTexture }) {
  const { viewport } = useThree();
  const spriteRef = useRef<THREE.Sprite>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    const worldX = pointer.x * (viewport.width / 2);
    const worldY = pointer.y * (viewport.height / 2);

    target.current.x += (worldX - target.current.x) * 0.08;
    target.current.y += (worldY - target.current.y) * 0.08;

    if (spriteRef.current) {
      spriteRef.current.position.x = target.current.x;
      spriteRef.current.position.y = target.current.y;
    }
  });

  return (
    <sprite ref={spriteRef} scale={[12, 12, 1]} position={[0, 0, 1]}>
      <spriteMaterial map={texture} color="#C7A97F" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
    </sprite>
  );
}

// 3. Depth Layers Orchestrator with Cinematic Depth Parallax & Camera Shift
function DepthLayers() {
  const group1Ref = useRef<THREE.Group>(null);
  const glowTexture = useMemo(() => createGlowTexture(), []);

  useFrame(({ pointer, camera }) => {
    // Cinematic camera spatial motion
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.04;

    // Cinematic mouse parallax sweet spot values
    const targetX = pointer.x * 4;
    const targetY = pointer.y * 3;

    // Farthest Glow Layer (0.18x)
    if (group1Ref.current) {
      group1Ref.current.position.x += (targetX * 0.18 - group1Ref.current.position.x) * 0.08;
      group1Ref.current.position.y += (targetY * 0.18 - group1Ref.current.position.y) * 0.08;
    }
  });

  return (
    <>
      <group ref={group1Ref}>
        <AmbientGlow texture={glowTexture} />
      </group>
      <CursorGlow texture={glowTexture} />
    </>
  );
}

// Main 3D Canvas Background Component
export default function HeroBackground3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <DepthLayers />
      </Canvas>
    </div>
  );
}
