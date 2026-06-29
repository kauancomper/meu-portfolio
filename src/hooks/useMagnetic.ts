import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMagnetic<T extends HTMLElement>(strength = 0.3, threshold = 90) {
  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < threshold) {
        rawX.set(dx * strength);
        rawY.set(dy * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [rawX, rawY, strength, threshold]);

  return { ref, style: { x, y } };
}
