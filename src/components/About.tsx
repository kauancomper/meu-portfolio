import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Wrench, Code, Cpu } from 'lucide-react';
import profilePhoto from '../assets/sessaosobre.png';
import Background3D from './Background3D';
import AmbientGlows from './AmbientGlows';

export default function About() {
  const { t } = useLanguage();
  const { about } = t;

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Design': return <Cpu className="w-4 h-4 text-brand-primary-red" />;
      case 'Desenvolvimento': return <Code className="w-4 h-4 text-brand-secondary-red" />;
      case 'Ferramentas': return <Wrench className="w-4 h-4 text-white/50" />;
      default: return <Briefcase className="w-4 h-4 text-white/50" />;
    }
  };

  return (
    <section id="sobre" className="relative py-28 px-6 lg:px-12 bg-black overflow-hidden">
      <Background3D />
      
      {/* Glow de fundo componentizado */}
      <AmbientGlows />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Grid: foto esquerda | conteúdo direita */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ---- ESQUERDA: Foto + Stats sobrepostos ---- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Texto decorativo de fundo */}
            <div
              aria-hidden
              className="absolute -left-4 top-1/2 -translate-y-1/2 text-[160px] lg:text-[220px] font-black text-white/[0.03] leading-none select-none pointer-events-none"
            >
              KC
            </div>

            {/* Foto */}
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={profilePhoto}
                alt="Kauan Comper"
                className="w-full h-auto object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              {/* Overlay gradiente natural */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Card de stats — abaixo da foto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-8">
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-0.5">
                    {t.hero.exp_label}
                  </p>
                  <p className="text-2xl font-black text-white">
                    {t.hero.exp_value}
                  </p>
                </div>
                <div className="w-px self-stretch bg-white/10" />
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-0.5">
                    {t.hero.projects_label}
                  </p>
                  <p className="text-2xl font-black text-white">
                    {t.hero.projects_value}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ---- DIREITA: Título + Bio + Quote + Skills ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-primary-red animate-pulse" />
              <span className="text-brand-secondary-red font-mono text-xs tracking-[0.4em] uppercase font-bold">
                {about.page_title}
              </span>
            </div>

            {/* Título grande */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white/90 leading-[1.05]">
              {about.bio_title}
            </h2>

            {/* Bio */}
            <div className="flex flex-col gap-4 text-white/60 text-base leading-relaxed">
              <p>{about.bio_p1}</p>
              <p>{about.bio_p2}</p>
              <p>{about.bio_p3}</p>
              <p>{about.bio_p4}</p>
            </div>

            {/* Destaque / Quote */}
            <div className="p-5 bg-white/[0.04] border border-white/10 rounded-2xl">
              <p className="text-white/70 font-medium italic text-sm">
                "{about.bio_highlight}"
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-4">
              {about.skills.map((skillGroup, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-wider">
                    {getIconForCategory(skillGroup.category)}
                    {skillGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 hover:bg-brand-primary-red/20 hover:border-brand-primary-red/40 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
