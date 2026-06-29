import { motion } from 'framer-motion';

const GLOW_SPOTS = [
  { x: '10%',  y: '15%', w: 700, h: 600, opacity: 0.30, dur: 7,  delay: 0   },
  { x: '85%',  y: '70%', w: 580, h: 580, opacity: 0.22, dur: 9,  delay: 1.5 },
  { x: '55%',  y: '45%', w: 500, h: 400, opacity: 0.14, dur: 11, delay: 3   },
  { x: '90%',  y: '5%',  w: 380, h: 380, opacity: 0.16, dur: 8,  delay: 2   },
];

export default function Background3D() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Grid quadriculado — sem pontos */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow spots — visíveis dentro do recorte da tela */}
      {GLOW_SPOTS.map((spot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: spot.x,
            top: spot.y,
            width: spot.w,
            height: spot.h,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse, rgba(239,68,68,${spot.opacity}) 0%, transparent 68%)`,
            filter: 'blur(60px)',
          }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: spot.dur, repeat: Infinity, ease: 'easeInOut', delay: spot.delay }}
        />
      ))}

      {/* Vinheta de borda */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
    </div>
  );
}
