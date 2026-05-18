import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface TrailParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  scale: number;
  opacity: number;
  active: boolean;
  color: string;
}

const createGlowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.7)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
};

export default function MouseTrail3D() {
  const { viewport } = useThree();
  const maxParticles = 35;
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);
  const prevPointer = useRef({ x: 0, y: 0 });
  const poolIndex = useRef(0);

  const glowTexture = useMemo(() => createGlowTexture(), []);

  const particles = useMemo(() => {
    return Array.from({ length: maxParticles }, (_, i) => ({
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      scale: 0.1,
      opacity: 0,
      active: false,
      color: i % 2 === 0 ? '#C7A97F' : '#F8F4EE',
    })) as TrailParticle[];
  }, []);

  useFrame(({ pointer }) => {
    const worldX = pointer.x * (viewport.width / 2);
    const worldY = pointer.y * (viewport.height / 2);

    // Calculate distance moved
    const dx = worldX - prevPointer.current.x;
    const dy = worldY - prevPointer.current.y;
    const dist = Math.hypot(dx, dy);

    // Spawn new particle if cursor moved enough
    if (dist > 0.12) {
      const idx = poolIndex.current;
      const p = particles[idx];
      p.x = worldX + (Math.random() - 0.5) * 0.2;
      p.y = worldY + (Math.random() - 0.5) * 0.2;
      p.z = 2; // Closer to camera
      p.vx = dx * 0.1 + (Math.random() - 0.5) * 0.05;
      p.vy = dy * 0.1 + (Math.random() * 0.05 + 0.02); // Drift upwards
      p.scale = Math.random() * 0.5 + 0.3; // Exaggerated trail size
      p.opacity = 0.85;
      p.active = true;

      const sprite = spriteRefs.current[idx];
      if (sprite) {
        sprite.position.set(p.x, p.y, p.z);
        sprite.scale.set(p.scale, p.scale, 1);
        (sprite.material as THREE.SpriteMaterial).opacity = p.opacity;
      }

      prevPointer.current = { x: worldX, y: worldY };
      poolIndex.current = (idx + 1) % maxParticles;
    }

    // Update active particles
    particles.forEach((p, i) => {
      if (!p.active) return;
      const sprite = spriteRefs.current[i];
      if (!sprite) return;

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95; // Friction
      p.vy *= 0.95;
      p.opacity -= 0.02; // Fade out

      if (p.opacity <= 0) {
        p.opacity = 0;
        p.active = false;
      }

      sprite.position.set(p.x, p.y, p.z);
      (sprite.material as THREE.SpriteMaterial).opacity = p.opacity;
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <sprite
          key={i}
          ref={(el) => { spriteRefs.current[i] = el; }}
          scale={[1, 1, 1]}
          position={[0, 0, -100]}
        >
          <spriteMaterial
            map={glowTexture}
            color={p.color}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}
