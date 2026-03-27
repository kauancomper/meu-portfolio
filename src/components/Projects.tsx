import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { ArrowUpRight } from 'lucide-react';
import { fetchGithubProjects, getRepoLanguageImage } from '../services/github';
import type { GithubRepo } from '../services/github';
import Background3D from './Background3D';
import AmbientGlows from './AmbientGlows';

export default function Projects() {
  const { projects } = portfolioContent;
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchGithubProjects();
      setRepos(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <Background3D />
      
      {/* Componentized background glows */}
      <AmbientGlows />

      <section id="projetos" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h2 className="text-sm font-mono text-brand-secondary-red tracking-widest uppercase mb-4">{projects.page_subtitle}</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">{projects.page_title}</h3>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[400px] bg-white/5 rounded-3xl animate-pulse" />
          ))
        ) : repos.length > 0 ? (
          repos.map((repo, idx) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="group relative flex flex-col h-[480px] lg:h-[550px] rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(239,68,68,0.15)] ring-1 ring-white/10 hover:ring-white/30 block cursor-pointer"
            >
              {/* Image filling whole card surface */}
              <div className="absolute inset-0">
                <img 
                  src={getRepoLanguageImage(repo.language)} 
                  alt={repo.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Thick overlay for text readability from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent/20" />
              </div>
              
              <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full">
                {/* Pill Category */}
                <div className="w-fit mb-5 px-4 py-1 bg-brand-primary-red/10 backdrop-blur-md rounded-full border border-brand-primary-red/30 shadow-lg">
                  <span className="text-[10px] md:text-xs font-bold text-brand-secondary-red uppercase tracking-widest">
                    {repo.language || 'Projeto'}
                  </span>
                </div>

                <h4 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight uppercase leading-[1.1]">
                  {repo.name.replace(/_/g, ' ')}
                </h4>
                
                {/* Red specific highlight */}
                <p className="text-brand-secondary-red font-medium text-sm md:text-base leading-relaxed mb-5 line-clamp-2">
                  {repo.description || 'Automação inteligente focada em performance e gerenciamento estrutural.'}
                </p>
                
                <p className="text-white/50 text-xs md:text-sm line-clamp-3 leading-relaxed mb-6">
                  Processos desenhados e otimizados gerando escalabilidade crítica à infraestrutura de serviços, com foco extremo em redução de atrasos manuais.
                </p>
                
                <div className="flex items-center gap-2 text-brand-secondary-red text-sm font-bold mt-auto transition-transform group-hover:translate-x-2 opacity-0 group-hover:opacity-100 duration-300">
                  Ver no GitHub
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </div>
            </motion.a>
          ))
        ) : (
          // Fallback static items
          portfolioContent.projects.items.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="group relative flex flex-col h-[480px] lg:h-[550px] rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(239,68,68,0.15)] ring-1 ring-white/10 hover:ring-white/30 block cursor-pointer"
            >
              <div className="absolute inset-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent/20" />
              </div>

              <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full">
                <div className="w-fit mb-5 px-4 py-1 bg-brand-primary-red/10 backdrop-blur-md rounded-full border border-brand-primary-red/30 shadow-lg">
                  <span className="text-[10px] md:text-xs font-bold text-brand-secondary-red uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
                
                <h4 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight uppercase leading-[1.1]">
                  {project.title}
                </h4>
                
                <p className="text-brand-secondary-red font-medium text-sm md:text-base leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                <p className="text-white/50 text-xs md:text-sm line-clamp-3 leading-relaxed mb-6">
                  Solução técnica e analítica focada em resultados concretos. Estruturada visando excelência técnica, manutenção a longo prazo e facilidade de adaptação.
                </p>

                <div className="flex items-center gap-2 text-brand-secondary-red text-sm font-bold mt-auto transition-transform group-hover:translate-x-2 opacity-0 group-hover:opacity-100 duration-300">
                  Explorar Case
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
    </div>
  );
}
