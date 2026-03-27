import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { fetchGithubProjects, getRepoLanguageImage } from '../services/github';
import type { GithubRepo } from '../services/github';
import Background3D from './Background3D';
import AmbientGlows from './AmbientGlows';
import { REPO_DESCRIPTIONS } from '../data/projectsData';

export default function Projects() {
  const { t, language } = useLanguage();
  const { projects } = t;
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
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Background3D />
      <AmbientGlows />
      
      <section className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-4xl mb-20 lg:mb-32">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-brand-secondary-red font-mono text-xs tracking-[0.4em] uppercase font-bold mb-6 block"
          >
            {projects.page_subtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase hero-text-shadow"
          >
            {projects.title_line1} <br />
            <span className="text-white/40">{projects.title_line2}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {projects.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[480px] lg:h-[550px] bg-white/5 rounded-3xl animate-pulse ring-1 ring-white/10" />
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
                    src={REPO_DESCRIPTIONS[repo.name]?.image || getRepoLanguageImage(repo.language)} 
                    alt={repo.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Thick overlay for text readability from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent/20" />
                </div>
                
                <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full">
                  {/* Pill Category */}
                  <div className="w-fit mb-4 px-3 py-1 bg-brand-primary-red/10 backdrop-blur-md rounded-full border border-brand-primary-red/30">
                    <span className="text-[10px] font-bold text-brand-secondary-red uppercase tracking-widest">
                      {repo.language || (language === 'pt' ? 'Projeto' : language === 'es' ? 'Proyecto' : 'Project')}
                    </span>
                  </div>

                  <h4 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight uppercase leading-tight drop-shadow-lg">
                    {repo.name.replace(/_/g, ' ')}
                  </h4>
                  
                  {/* Description - Highlight and Detail */}
                  <p className="text-brand-secondary-red font-bold text-xs md:text-sm tracking-wider uppercase mb-3 drop-shadow-sm">
                    {REPO_DESCRIPTIONS[repo.name]?.[language]?.highlight || repo.description || (language === 'pt' ? 'Infraestrutura e Performance.' : language === 'es' ? 'Infraestructura y Rendimiento.' : 'Infrastructure and Performance.')}
                  </p>
                  
                  <p className="text-white/70 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6 max-w-[90%] drop-shadow-md">
                    {REPO_DESCRIPTIONS[repo.name]?.[language]?.detail || (language === 'pt' ? 'Processos desenhados e otimizados com foco em redução de atrasos e métricas críticas.' : language === 'es' ? 'Procesos diseñados y optimizados con enfoque en la reducción de retrasos y métricas críticas.' : 'Processes designed and optimized focusing on delay reduction and critical metrics.')}
                  </p>
                  
                  <div className="flex items-center gap-2 text-brand-secondary-red text-[10px] md:text-xs font-black uppercase tracking-widest transition-transform group-hover:translate-x-2 opacity-0 group-hover:opacity-100 duration-300">
                    {language === 'pt' ? 'Visualizar Case' : language === 'es' ? 'Ver Caso' : 'View Case'}
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            // Fallback static items
            projects.items.map((project: any, idx: number) => (
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
                    {language === 'pt' ? 'Solução técnica e analítica focada em resultados concretos.' : language === 'es' ? 'Solución técnica y analítica enfocada en resultados concretos.' : 'Technical and analytical solution focused on concrete results.'}
                  </p>

                  <div className="flex items-center gap-2 text-brand-secondary-red text-sm font-bold mt-auto transition-transform group-hover:translate-x-2 opacity-0 group-hover:opacity-100 duration-300">
                    {language === 'pt' ? 'Explorar Case' : language === 'es' ? 'Explorar Caso' : 'Explore Case'}
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
