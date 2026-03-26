import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.2, duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="relative flex items-center justify-center">
          {/* Enhanced Glow behind the logo */}
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-brand-primary-red/30 blur-[40px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* The VN Logo - Animated scale and rotate */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <svg width="120" height="120" viewBox="0 0 268 267" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
              <path 
                d="M153 165.5L238 25.5H267L153 207.5L55 45.5H38L146 220.5L132.5 241.5L0 25.5H68L153 165.5ZM153.5 140.5L140 120L185.5 45.5H169.5L132.5 106L83.5 25.5H224L153.5 140.5ZM121.25 46.5L132.505 66.5L144.25 46.5H121.25Z" 
                stroke="#EF4444" 
                strokeWidth="3" 
                fill="#EF4444" 
                fillOpacity="0"
              >
                <motion.path
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ 
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    fillOpacity: { delay: 1.5, duration: 0.5 }
                  }}
                />
              </path>
            </svg>
          </motion.div>
        </div>

        <motion.div 
          className="font-display text-brand-secondary-red text-sm tracking-[0.3em] font-bold"
          initial={{ opacity: 0, y: 10, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          CARREGANDO
        </motion.div>
      </div>
    </motion.div>
  );
}
