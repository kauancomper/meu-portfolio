import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import heroVideo from '../assets/videoanimacaohero.mp4';

export default function Hero() {
  const { t } = useLanguage();
  const content = t.hero;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Background Video Animation */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/20" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Main content grid or column depending on screen */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col gap-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap items-center gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-primary-red animate-pulse" />
                  <span className="text-brand-secondary-red font-mono text-xs tracking-[0.4em] uppercase font-bold">
                    {content.badge_label}
                  </span>
                </div>
                
                <div className="hidden md:flex items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-widest border-l border-white/10 pl-6">
                  <span>{content.location}</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{content.remote}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col"
              >
                <h1 className="text-white font-black leading-[0.85] tracking-tighter uppercase flex flex-col">
                  <span className="text-5xl md:text-7xl lg:text-[8rem] opacity-40 hero-text-shadow">
                    {content.title_line1}
                  </span>
                  <span className="text-6xl md:text-8xl lg:text-[10rem] hero-text-shadow">
                    {content.title_line2}
                  </span>
                  <span className="text-6xl md:text-8xl lg:text-[10rem] text-brand-primary-red hero-text-shadow">
                    {content.title_name}
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col gap-6"
              >
                <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed font-medium">
                  {content.description}
                </p>

                <div className="flex flex-wrap gap-3 py-4">
                  {content.skills.split(' • ').map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                      className="px-4 py-2 rounded-full bg-brand-primary-red/10 backdrop-blur-md border border-brand-primary-red/20 flex items-center justify-center"
                    >
                      <span className="text-[10px] font-black text-brand-secondary-red uppercase tracking-[0.2em]">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action Row: CTAs (Left) and Stats (Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#recent-works"
                className="group relative px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                {content.cta_primary}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full text-white/60 hover:text-white transition-all text-xs font-black uppercase tracking-widest group">
                <Download size={16} className="group-hover:translate-y-[-2px] transition-transform" />
                {content.cta_secondary}
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-5 rounded-3xl flex flex-col items-center lg:items-end min-w-[140px]">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1 font-bold">
                  {content.exp_label}
                </span>
                <span className="text-2xl font-black text-white">
                  {content.exp_value}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-5 rounded-3xl flex flex-col items-center lg:items-end min-w-[220px]">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1 font-bold">
                  {content.projects_label}
                </span>
                <span className="text-2xl font-black text-white">
                  {content.projects_value}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
