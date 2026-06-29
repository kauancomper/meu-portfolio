import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Ripple {
  x: number; y: number;
  radius: number;
  maxRadius: number;
  life: number;
  startDelay: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);
  
  // Base mouse position raw coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Springs for the main cursor and ambient glow
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

  const ambientX = useSpring(mouseX, { damping: 40, stiffness: 100, mass: 1 });
  const ambientY = useSpring(mouseY, { damping: 40, stiffness: 100, mass: 1 });

  // Mouse coordinate refs for the canvas animation loop
  const pointer = useRef({ x: -100, y: -100 });
  const trail = useRef<{x: number, y: number}[]>([]);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      pointer.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const manageMouseLeave = () => setIsVisible(false);
    const manageMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', manageMouseMove);
    document.addEventListener('mouseleave', manageMouseLeave);
    document.addEventListener('mouseenter', manageMouseEnter);

    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      document.removeEventListener('mouseleave', manageMouseLeave);
      document.removeEventListener('mouseenter', manageMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Canvas Trail Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Click — sonar ripple rings (premium, sem partículas)
    const handleClick = (e: MouseEvent) => {
      [
        { maxRadius: 44, startDelay: 0 },
        { maxRadius: 72, startDelay: 0.1 },
        { maxRadius: 100, startDelay: 0.2 },
      ].forEach(({ maxRadius, startDelay }) => {
        ripples.current.push({ x: e.clientX, y: e.clientY, radius: 0, maxRadius, life: 1, startDelay });
      });
    };
    window.addEventListener('click', handleClick);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail
      trail.current.push({ x: smoothX.get(), y: smoothY.get() });
      if (trail.current.length > 20) trail.current.shift();
      trail.current.forEach((p, index) => {
        const ratio = index / trail.current.length;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * ratio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 113, 113, ${ratio * 0.5})`;
        ctx.fill();
      });

      // Sonar ripple rings
      ripples.current = ripples.current.filter(r => r.life > 0);
      ripples.current.forEach(r => {
        if (r.startDelay > 0) { r.startDelay -= 0.016; return; }
        const progress = 1 - r.life;
        r.radius = r.maxRadius * Math.sqrt(progress);
        const opacityFactor = r.maxRadius <= 44 ? 0.65 : r.maxRadius <= 72 ? 0.45 : 0.28;
        ctx.save();
        ctx.globalAlpha = r.life * opacityFactor;
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius), 0, Math.PI * 2);
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 1.2 * r.life;
        ctx.stroke();
        ctx.restore();
        r.life -= 0.02;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className={`hidden md:block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Heavy Giant Ambient Fume */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-brand-primary-red/5 rounded-full blur-[100px] pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          x: ambientX,
          y: ambientY,
          marginLeft: '-200px', // Offset by half size
          marginTop: '-200px',
          filter: 'blur(40px)',
        }}
      />

      {/* Canvas for the fast trailing particles */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40"
      />

      {/* Main Sharp Core Dot + Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-primary-red/50 pointer-events-none z-50 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-sm"
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: '-16px',
          marginTop: '-16px',
        }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </motion.div>
    </div>
  );
}
