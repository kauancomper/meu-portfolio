import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

export default function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Characters: mix of code symbols, numbers and latin letters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\|=+-*%$#@!?;:.,~^&()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const speeds: number[] = Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.7);
    const opacities: number[] = Array(columns).fill(0).map(() => 0.4 + Math.random() * 0.6);

    let frameId: number;
    let lastTime = 0;
    const interval = 45; // ms between updates

    function draw(timestamp: number) {
      frameId = requestAnimationFrame(draw);
      if (!canvas || !ctx) return;
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // Fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const opacity = opacities[i];

        // Head of the column — bright white-red
        if (drops[i] * fontSize > canvas.height * 0.85 || Math.random() < 0.02) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(239, 68, 68, ${opacity * 0.85})`;
        }

        ctx.font = `${fontSize}px 'Courier New', monospace`;
        ctx.fillText(char, x, y);

        // Reset when off screen
        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.3 + Math.random() * 0.7;
          opacities[i] = 0.3 + Math.random() * 0.6;
        }

        drops[i] += speeds[i];
      }
    }

    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  );
}
