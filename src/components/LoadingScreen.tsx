import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        {/* Glow behind the logo */}
        <div className="absolute inset-0 rounded-full bg-brand-primary-red/40 blur-[20px] animate-pulse-glow" />
        
        {/* The VN Logo from the site */}
        <svg width="100%" height="100%" viewBox="0 0 268 267" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-24 h-24">
          <path d="M153 165.5L238 25.5H267L153 207.5L55 45.5H38L146 220.5L132.5 241.5L0 25.5H68L153 165.5ZM153.5 140.5L140 120L185.5 45.5H169.5L132.5 106L83.5 25.5H224L153.5 140.5ZM121.25 46.5L132.505 66.5L144.25 46.5H121.25Z" stroke="#EF4444" strokeWidth="2" fill="#EF4444" fillOpacity="0" pathLength="1" strokeDashoffset="0" strokeDasharray="0 1">
            <animate attributeName="stroke-dasharray" values="0 1; 1 0" dur="1.5s" fill="freeze" />
            <animate attributeName="fill-opacity" values="0; 1" dur="0.5s" begin="1.5s" fill="freeze" />
          </path>
        </svg>

        <motion.div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-display text-brand-secondary-red text-sm tracking-[0.1em] whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          CARREGANDO
        </motion.div>
      </div>
    </motion.div>
  );
}
