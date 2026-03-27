import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { ArrowUpRight, Download } from 'lucide-react';
import RecentWorks from './RecentWorks';
import Process from './Process';
import heroVideo from '../assets/videoanimacaohero.mp4';

export default function Hero() {
  const { hero } = portfolioContent;

  return (
    <>
    <section id="hero" className="relative min-h-screen w-full flex items-center overflow-hidden bg-black">
      {/* Immersive Video Layer - Complete Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full object-cover opacity-60"
        />
        {/* Dark overlay to reduce video brightness */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Protection Masks */}
        {/* 1. Left to Right Fade (Hides video text on the left) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent lg:via-black/40" />
        {/* 2. Bottom Fade (Smooth transition to next section) */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 lg:px-12 pt-24 pb-24">
        <div className="max-w-4xl flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary-red animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <span className="text-brand-secondary-red font-mono text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
              {hero.badge_label}
            </span>
          </motion.div>

          <div className="flex flex-col gap-0">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-9xl font-black leading-[1.0] tracking-tighter uppercase"
            >
              <span className="block text-white/30">{hero.title_line1}</span>
              <span className="block text-white/90">{hero.title_line2}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-red to-[#F87171] drop-shadow-[0_10px_40px_rgba(239,68,68,0.2)]">
                {hero.title_name}
              </span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 max-w-lg text-base md:text-lg leading-relaxed font-medium hero-text-shadow mt-2"
          >
          {hero.description}
          </motion.p>
        </div>

        {/* Linha: botões à esquerda + stats à direita */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-4 mt-8 w-full"
          >
            {/* Botões */}
            <button className="group relative px-8 py-4 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/20 whitespace-nowrap shrink-0">
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-tight text-sm">
                {hero.cta_primary}
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-brand-secondary-red/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 bg-white/5 text-white font-black rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md uppercase tracking-tight text-sm whitespace-nowrap shrink-0">
              {hero.cta_secondary}
              <Download className="w-4 h-4" />
            </button>

            {/* Stats Card alinhado à direita */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="ml-auto"
            >
              <div className="bg-black/40 backdrop-blur-3xl border border-white/10 px-8 py-5 rounded-[2rem] shadow-2xl inline-flex gap-10 hover:border-brand-primary-red/30 transition-all duration-500 group">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/30 tracking-[0.4em] uppercase mb-1">{hero.exp_label}</span>
                  <span className="text-2xl font-black text-white group-hover:text-brand-primary-red transition-colors">{hero.exp_value}</span>
                </div>
                <div className="w-px self-stretch bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/30 tracking-[0.4em] uppercase mb-1">{hero.projects_label}</span>
                  <span className="text-2xl font-black text-white group-hover:text-brand-primary-red transition-colors">{hero.projects_value}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
      </div>
    </section>
    <RecentWorks />
    <Process />
    </>
  );
}
