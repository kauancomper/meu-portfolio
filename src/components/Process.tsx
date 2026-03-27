import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Layers, Monitor, TrendingUp, Search, Code } from 'lucide-react';
import kauanImage from '../assets/sesssaoprocesso.png';

const iconMap: Record<string, any> = {
  Search: Search,
  Layers: Layers,
  Code: Code,
  TrendingUp: TrendingUp,
  FileText: FileText,
  Monitor: Monitor,
};

export default function Process() {
  const { t } = useLanguage();
  const { process } = t;

  return (
    <section id="processo" className="relative py-24 px-6 lg:px-12 overflow-hidden bg-black">
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

        {/* Layout: Central Image and steps around */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-[350px] xl:gap-x-[450px] gap-y-12 lg:gap-y-24 items-center">
          {/* Central Image - Color version with red glow */}
          <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-0 mb-12 lg:mb-0 relative flex justify-center items-center pointer-events-none w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-brand-primary-red/50 md:bg-brand-primary-red/40 rounded-full blur-[100px] -z-10" />
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[280px] md:w-[350px] lg:w-[450px]"
            >
              <img
                src={kauanImage}
                alt="Kauan"
                className="w-full h-auto filter brightness-110 object-cover"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)'
                }}
              />
            </motion.div>
          </div>

          {process.steps.map((step: any, idx: number) => {
            const IconComponent = iconMap[step.icon];
            const isRight = idx % 2 !== 0;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative z-10 p-4 md:p-8 flex flex-col gap-6 transition-all duration-500 group ${
                  isRight 
                    ? 'lg:-ml-8 items-start lg:items-end text-left lg:text-right' 
                    : 'lg:-mr-8 items-start text-left'
                }`}
              >
                {/* Large Background Number */}
                <span className={`absolute -top-10 text-[10rem] font-black text-white/5 pointer-events-none select-none group-hover:text-brand-primary-red/10 transition-colors duration-700 ${
                  isRight ? '-left-6 lg:left-auto lg:-right-6' : '-left-6'
                }`}>
                  {step.id}
                </span>

                <div className={`flex w-full ${isRight ? 'justify-start lg:justify-end' : 'justify-start'}`}>
                  <div className="p-4 bg-brand-primary-red/10 rounded-2xl text-brand-primary-red ring-1 ring-brand-primary-red/20 group-hover:bg-brand-primary-red group-hover:text-white transition-all duration-500 inline-block">
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none uppercase hero-text-shadow">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>

                <div className={`flex flex-wrap gap-2 mt-2 w-full ${isRight ? 'justify-start lg:justify-end' : 'justify-start'}`}>
                  {step.tags.map((tag: string) => (
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
