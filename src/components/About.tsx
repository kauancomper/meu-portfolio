import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Briefcase, User, Wrench, Code } from 'lucide-react';

export default function About() {
  const { about } = portfolioContent;

  const getIconForCategory = (category: string) => {
    switch(category) {
      case 'Design': return <User className="w-5 h-5 text-brand-primary-red" />;
      case 'Desenvolvimento': return <Code className="w-5 h-5 text-brand-secondary-red" />;
      case 'Ferramentas': return <Wrench className="w-5 h-5 text-white/50" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <section id="sobre" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-sm font-mono text-brand-secondary-red tracking-widest uppercase mb-4">{about.page_title}</h2>
        <h3 className="text-4xl md:text-5xl font-black text-white/90">{about.bio_title}</h3>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column - Biography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 glass-card p-8 md:p-12 rounded-3xl"
        >
          <div className="flex flex-col gap-6 text-white/70 text-lg leading-relaxed">
            <p>{about.bio_p1}</p>
            <p>{about.bio_p2}</p>
            <p>{about.bio_p3}</p>
            <p>{about.bio_p4}</p>
            <div className="mt-4 p-6 bg-brand-primary-red/10 border border-brand-primary-red/20 rounded-2xl">
              <p className="text-brand-secondary-red font-medium italic">
                "{about.bio_highlight}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Bento Boxes */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Bento 1 - Skills Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl h-full flex flex-col justify-center"
          >
            <h4 className="text-2xl font-bold mb-6 text-white/90">{about.skills_title}</h4>
            <div className="flex flex-col gap-6">
              {about.skills.map((skillGroup, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-white/50 text-sm font-mono">
                    {getIconForCategory(skillGroup.category)}
                    {skillGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/80 transition-colors hover:bg-brand-primary-red/20 hover:border-brand-primary-red/50 cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bento 2 - Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-2 hover:bg-brand-primary-red/5 cursor-pointer">
              <span className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-brand-primary-red mb-2">
                {portfolioContent.hero.exp_value}
              </span>
              <span className="text-sm text-white/50">{portfolioContent.hero.exp_label}</span>
            </div>
            <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-2 hover:bg-brand-primary-red/5 cursor-pointer">
              <span className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-brand-primary-red mb-2">
                {portfolioContent.hero.projects_value}
              </span>
              <span className="text-sm text-white/50">{portfolioContent.hero.projects_label}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
