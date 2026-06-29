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
    <section id="processo" className="relative py-16 sm:py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-sm font-mono text-brand-secondary-red tracking-[0.3em] uppercase mb-4 block">
            {process.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-4 sm:mb-6 hero-text-shadow">
            {process.title}
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
            {process.description}
          </p>
        </motion.div>

        {/* Mobile: lista vertical simples de cards */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* Imagem central — mobile */}
          <div className="relative flex justify-center items-center pointer-events-none py-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] bg-brand-primary-red/40 rounded-full blur-[100px]" />
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-[180px] sm:w-[240px]"
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

          {/* Cards de steps — mobile */}
          {process.steps.map((step: any, idx: number) => {
            const IconComponent = iconMap[step.icon];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4 group"
              >
                {/* Número de fundo */}
                <span className="absolute -top-4 -right-2 text-[5rem] font-black text-white/[0.04] pointer-events-none select-none leading-none group-hover:text-brand-primary-red/[0.07] transition-colors duration-700">
                  {step.id}
                </span>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary-red/10 rounded-xl text-brand-primary-red ring-1 ring-brand-primary-red/20 group-hover:bg-brand-primary-red group-hover:text-white transition-colors duration-400 shrink-0">
                    {IconComponent && <IconComponent size={22} />}
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight leading-tight uppercase hero-text-shadow pt-1">
                    {step.title}
                  </h3>
                </div>

                <p className="text-white/50 leading-relaxed text-sm">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: layout com imagem central e steps ao redor */}
        <div className="hidden lg:block">
        <div className="relative grid grid-cols-2 gap-x-[350px] xl:gap-x-[450px] gap-y-24 items-center">
          {/* Central Image */}
          <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-0 relative flex justify-center items-center pointer-events-none w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary-red/40 rounded-full blur-[100px] -z-10" />
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-[450px]"
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-10 w-full p-8 flex flex-col gap-6 transition-all duration-500 group ${
                  isRight
                    ? '-ml-8 items-end text-right'
                    : '-mr-8 items-start text-left'
                }`}
              >
                <span className={`absolute -top-10 text-[10rem] font-black text-white/5 pointer-events-none select-none group-hover:text-brand-primary-red/10 transition-colors duration-700 ${
                  isRight ? 'left-auto -right-6' : '-left-6'
                }`}>
                  {step.id}
                </span>

                <div className={`flex w-full ${isRight ? 'justify-end' : 'justify-start'}`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-brand-primary-red/10 rounded-2xl text-brand-primary-red ring-1 ring-brand-primary-red/20 group-hover:bg-brand-primary-red group-hover:text-white transition-colors duration-500 inline-block"
                  >
                    {IconComponent && <IconComponent size={28} />}
                  </motion.div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none uppercase hero-text-shadow">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>

                <div className={`flex flex-wrap gap-2 mt-2 w-full ${isRight ? 'justify-end' : 'justify-start'}`}>
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
      </div>
    </section>
  );
}
