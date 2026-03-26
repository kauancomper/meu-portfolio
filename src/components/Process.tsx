import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { FileText, Layers, Monitor, TrendingUp } from 'lucide-react';
import kauanImage from '../assets/kauan.png';

const iconMap: Record<string, any> = {
  FileText: FileText,
  Layers: Layers,
  Monitor: Monitor,
  TrendingUp: TrendingUp,
};

export default function Process() {
  const { process } = portfolioContent;

  return (
    <section id="processo" className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black/20">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary-red/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-brand-secondary-red tracking-[0.3em] uppercase mb-4 block">
            {process.subtitle}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6 hero-text-shadow">
            {process.title}
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            {process.description}
          </p>
        </motion.div>

        <div className="relative flex flex-col lg:grid lg:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-16 items-center">
          {/* Central Image - Displayed with different sizes for mobile/desktop */}
          <div className="lg:absolute left-1/2 top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-0 opacity-30 lg:opacity-40 mb-12 lg:mb-0">
            <motion.img 
              src={kauanImage} 
              alt="Kauan" 
              className="w-[250px] md:w-[320px] lg:w-[400px] grayscale filter mx-auto"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {process.steps.map((step, idx) => {
            const IconComponent = iconMap[step.icon];
            // Determine alignment classes based on index for the 2x2 grid
            const isRight = idx % 2 !== 0; 
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative z-10 p-8 glass-card rounded-[2.5rem] flex flex-col gap-6 hover:border-brand-primary-red/30 transition-colors group ${
                  isRight ? 'lg:ml-12' : 'lg:mr-12'
                }`}
              >
                {/* Large Background Number */}
                <span className="absolute -top-6 -left-4 text-8xl font-black text-white/5 pointer-events-none select-none">
                  {step.id}
                </span>

                <div className="flex items-start justify-between">
                  <div className="p-4 bg-brand-primary-red/10 rounded-2xl text-brand-primary-red ring-1 ring-brand-primary-red/20 group-hover:bg-brand-primary-red group-hover:text-white transition-all duration-500">
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none uppercase hero-text-shadow">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
