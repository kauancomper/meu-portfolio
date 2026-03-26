import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon } from './Icons';
import { fetchGithubProjects, getRepoLanguageImage } from '../services/github';
import type { GithubRepo } from '../services/github';
import { portfolioContent } from '../data/content';

export default function RecentWorks() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchGithubProjects();
      setRepos(data.slice(0, 6)); // Top 6 mais recentes
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="relative w-full py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-10 right-10 w-64 h-64 border border-white/5 rounded-full pointer-events-none opacity-20" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 border border-brand-primary-red/10 rounded-full pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-bold text-brand-secondary-red uppercase tracking-[0.4em] mb-4 block"
          >
            GitHub Feed
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] hero-text-shadow"
          >
            Trabalhos <br />
            <span className="text-white/40">Recentes</span>
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-h-[400px]">
          {loading ? (
            // Simple Loading Skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-white/5 rounded-[40px] animate-pulse" />
            ))
          ) : repos.length > 0 ? (
            repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden hover:border-brand-primary-red/30 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={getRepoLanguageImage(repo.language)} 
                    alt={repo.name} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 font-bold"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                  
                  {/* Language Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-brand-primary-red/10 backdrop-blur-md border border-brand-primary-red/20 text-[10px] font-bold text-brand-secondary-red uppercase tracking-wider">
                      {repo.language || 'Geral'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 pb-10 flex flex-col gap-4">
                  <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase hero-text-shadow line-clamp-1">
                    {repo.name.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-sm font-bold text-brand-secondary-red/90 tracking-tight leading-snug line-clamp-3">
                    {repo.description || 'Projeto desenvolvido com foco em performance e automação inteligente.'}
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                      <GithubIcon size={18} className="text-white" />
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowUpRight size={18} className="text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Fallback to static points if no repos found
            portfolioContent.projects.items.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden hover:border-brand-primary-red/30 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-brand-primary-red/10 backdrop-blur-md border border-brand-primary-red/20 text-[10px] font-bold text-brand-secondary-red uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 pb-10 flex flex-col gap-4">
                  <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase hero-text-shadow line-clamp-1">{project.title}</h3>
                  <p className="text-sm font-bold text-brand-secondary-red/90 tracking-tight leading-snug line-clamp-3">{project.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Link 
            to="/projetos"
            className="group flex items-center gap-3 px-10 py-5 rounded-full border border-white/10 bg-white/5 hover:bg-brand-primary-red hover:border-brand-primary-red transition-all duration-300"
          >
            <span className="text-sm font-black text-white uppercase tracking-widest">
              Ver Todos no GitHub
            </span>
            <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
