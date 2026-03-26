import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { ArrowUpRight } from 'lucide-react';
import { fetchGithubProjects, getRepoLanguageImage } from '../services/github';
import type { GithubRepo } from '../services/github';

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
    <section id="projetos" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h2 className="text-sm font-mono text-brand-secondary-red tracking-widest uppercase mb-4">{projects.page_subtitle}</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white/90 uppercase">{projects.page_title}</h3>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="group relative flex flex-col glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:border-brand-primary-red/50 block cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={getRepoLanguageImage(repo.language)} 
                  alt={repo.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-xs font-mono text-brand-secondary-red mb-3 font-bold uppercase tracking-widest">
                  {repo.language || 'Projeto'}
                </div>
                <h4 className="text-2xl font-black text-white mb-4 hero-text-shadow uppercase line-clamp-1">
                  {repo.name.replace(/_/g, ' ')}
                </h4>
                <p className="text-white/70 mb-8 flex-1 leading-relaxed font-medium line-clamp-3">
                  {repo.description || 'Exploração técnica e desenvolvimento de código focado em soluções escaláveis.'}
                </p>
                
                <div className="flex items-center gap-2 text-brand-primary-red font-medium mt-auto transition-transform group-hover:translate-x-2">
                  Ver no GitHub
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
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
              className="group relative flex flex-col glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:border-brand-primary-red/50 block cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-xs font-mono text-brand-secondary-red mb-3 font-bold uppercase tracking-widest">{project.category}</div>
                <h4 className="text-2xl font-black text-white mb-4 hero-text-shadow uppercase">{project.title}</h4>
                <p className="text-white/70 mb-8 flex-1 leading-relaxed font-medium">{project.description}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
