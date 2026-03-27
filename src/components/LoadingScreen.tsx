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
          
          {/* Logo Kauan Comper - Animated scale */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10"
          >
            <img 
              src="/logokauancomper.svg" 
              alt="Logo Kauan Comper" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" 
            />
          </motion.div>
        </div>

        <motion.div 
          className="font-display text-brand-secondary-red text-sm md:text-base tracking-[0.4em] font-bold uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Iniciando Experiência
        </motion.div>
      </div>
    </motion.div>
  );
}
