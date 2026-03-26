import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { ArrowUpRight, Download } from 'lucide-react';
import kauanImage from '../assets/kauan.png';
import RecentWorks from './RecentWorks';
import Process from './Process';

export default function Hero() {
  const { hero } = portfolioContent;

  return (
    <>
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 px-6 lg:px-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-brand-primary-red/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand-primary-red animate-pulse" />
            <span className="text-brand-secondary-red font-mono text-sm tracking-wider uppercase">
              {hero.badge_label || "Disponível para trabalho"}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-[1.05] tracking-tighter hero-text-shadow"
          >
            <span className="block text-white/40 mb-2">{hero.title_line1}</span>
            <span className="block text-white/90">{hero.title_line2}</span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F87171] pb-2 pr-4">{hero.title_name}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 max-w-2xl leading-relaxed mt-4 hero-text-shadow font-medium"
          >
            {hero.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
              <span className="relative z-10 flex items-center gap-2">
                {hero.cta_primary}
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-brand-secondary-red/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-md">
              {hero.cta_secondary}
              <Download className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Right Content - Stylized Image with Background Text & Stats */}
        <div className="relative flex justify-center lg:justify-end items-center h-[400px] lg:h-[600px] w-full mt-12 lg:mt-0">
          {/* Background 'DEV' Text - Subtle on Mobile */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-50 lg:opacity-100">
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 0.05, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[180px] lg:text-[400px] font-black font-sans leading-none tracking-tighter text-brand-primary-red"
            >
              DEV
            </motion.span>
          </div>

          {/* User Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative z-10 lg:mr-12"
          >
            <motion.img 
              src={kauanImage} 
              alt="Kauan Comper"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-[280px] lg:w-[450px] object-contain drop-shadow-[0_0_50px_rgba(239,68,68,0.3)] filter grayscale hover:grayscale-0 transition-all duration-700"
            />

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 lg:bottom-10 -right-4 z-20 bg-white/10 backdrop-blur-2xl border border-white/20 p-5 lg:p-6 rounded-[2rem] shadow-2xl flex gap-6 lg:gap-8"
            >
              <div className="flex flex-col">
                <span className="text-[9px] lg:text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">{hero.exp_label || "EXPERIÊNCIA"}</span>
                <span className="text-xl lg:text-2xl font-black text-white">{hero.exp_value || "+7 Anos"}</span>
              </div>
              <div className="w-px h-full bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[9px] lg:text-[10px] font-bold text-white/40 tracking-widest uppercase mb-1">{hero.projects_label || "PROJETOS"}</span>
                <span className="text-xl lg:text-2xl font-black text-white">{hero.projects_value || "+40 Clientes"}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements around the image */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary-red/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
    <RecentWorks />
    <Process />
    </>
  );
}
