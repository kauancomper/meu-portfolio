import { motion, animate, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const count = useMotionValue(0);
  const displayRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Contador 0→100 em 2.2s
    const controls = animate(count, 100, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        const rounded = Math.round(v);
        if (displayRef.current) displayRef.current.textContent = String(rounded);
        if (barRef.current) barRef.current.style.width = `${v}%`;
      },
    });
    return () => controls.stop();
  }, [count]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      transition={{ delay: 2.6, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onComplete}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-brand-primary-red/8 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-[280px] px-0">
        {/* Logo com anel pulsante */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-brand-primary-red/25"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img
            src="/logokauancomper.svg"
            alt="Kauan Comper"
            className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_24px_rgba(239,68,68,0.6)]"
          />
        </motion.div>

        {/* Counter + barra */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.45em]">
              Carregando
            </span>
            <span className="font-display text-xs font-bold tracking-widest">
              <span ref={displayRef} className="text-brand-secondary-red">0</span>
              <span className="text-white/25">%</span>
            </span>
          </div>

          {/* Track */}
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary-red to-brand-secondary-red"
              style={{ width: '0%', transition: 'width 0.05s linear' }}
            />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="font-display text-brand-secondary-red text-[11px] tracking-[0.5em] uppercase font-bold text-center"
        >
          Iniciando Experiência
        </motion.p>
      </div>
    </motion.div>
  );
}
