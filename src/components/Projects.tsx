import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const { projects } = portfolioContent;

  return (
    <section id="projetos" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h2 className="text-sm font-mono text-brand-secondary-red font-mono text-sm tracking-widest uppercase mb-4">{projects.page_subtitle}</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white/90">{projects.page_title}</h3>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.items.map((project, idx) => (
          <motion.a
            href={project.link}
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * idx }}
            className="group relative flex flex-col glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-4 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:border-brand-primary-red/50 block cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="text-xs font-mono text-brand-secondary-red mb-3 font-bold uppercase tracking-widest">{project.category}</div>
              <h4 className="text-2xl font-bold text-white mb-4 hero-text-shadow">{project.title}</h4>
              <p className="text-white/70 mb-8 flex-1 leading-relaxed font-medium">{project.description}</p>
              
              <div className="flex items-center gap-2 text-brand-primary-red font-medium mt-auto transition-transform group-hover:translate-x-2">
                Ver Estudo de Caso
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
