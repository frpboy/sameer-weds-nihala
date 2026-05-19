import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  r: number; // radius/size
  d: number; // speed weight
  opacity: number;
  swaySpeed: number;
  swayOffset: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    const maxPetals = 25; // Subtle and elegant quantity

    const colors = [
      'rgba(232, 165, 152, 0.55)', // Warm soft rose
      'rgba(211, 123, 123, 0.45)', // Dusky rose
      'rgba(247, 197, 184, 0.5)',  // Light peach blush
      'rgba(199, 169, 127, 0.4)',  // Pale gold petal
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize petals
    for (let i = 0; i < maxPetals; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 5 + 3,
        d: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.3 + 0.3,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.beginPath();
      
      // Draw bezier-curved rose petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-petal.r * 1.5, -petal.r * 0.5, -petal.r, petal.r * 1.5, 0, petal.r * 2);
      ctx.bezierCurveTo(petal.r, petal.r * 1.5, petal.r * 1.5, -petal.r * 0.5, 0, 0);
      
      ctx.fillStyle = petal.color;
      ctx.globalAlpha = petal.opacity;
      ctx.fill();
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        
        // Update positions
        p.y += p.d * 1.1; // vertical fall
        p.swayOffset += p.swaySpeed;
        p.x += Math.sin(p.swayOffset) * 0.5; // horizontal sway
        p.rotation += p.rotationSpeed;

        drawPetal(ctx, p);

        // Reset petal if off screen
        if (p.y > canvas.height + 20 || p.x > canvas.width + 20 || p.x < -20) {
          petals[i] = {
            x: Math.random() * canvas.width,
            y: -20,
            r: Math.random() * 5 + 3,
            d: Math.random() * 0.8 + 0.4,
            opacity: Math.random() * 0.3 + 0.3,
            swaySpeed: Math.random() * 0.02 + 0.01,
            swayOffset: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.02 - 0.01,
            color: colors[Math.floor(Math.random() * colors.length)],
          };
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
