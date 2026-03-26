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
      setRepos(data); // Carrega todos disponíveis para o carrossel
      setLoading(false);
    }
    load();
  }, []);

  // Duplicate repos for infinite loop
  const displayRepos = repos.length > 0 ? [...repos, ...repos] : [...portfolioContent.projects.items, ...portfolioContent.projects.items];

  return (
    <section className="relative w-full py-24 overflow-hidden bg-black">
      
      {/* Glow de fundo da seção Projetos */}
      <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-brand-primary-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16 px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-bold text-brand-secondary-red uppercase tracking-[0.4em] mb-4 block"
          >
            GitHub Showcase
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

        {/* Marquee Container */}
        <div className="w-full relative pause-on-hover">
          <div className="flex animate-marquee gap-8 px-4">
            {loading ? (
              // Simple Loading Skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[350px] md:w-[450px] aspect-[4/3] bg-white/5 rounded-[40px] animate-pulse shrink-0" />
              ))
            ) : (
              displayRepos.map((item: any, index) => {
                const isGithub = !!item.html_url;
                const title = isGithub ? item.name.replace(/_/g, ' ') : item.title;
                const desc = isGithub ? (item.description || 'Projeto desenvolvido com foco em performance e automação inteligente.') : item.description;
                const lang = isGithub ? (item.language || 'Geral') : item.category;
                const img = isGithub ? getRepoLanguageImage(item.language) : item.image;
                const link = isGithub ? item.html_url : item.link;

                return (
                  <motion.div
                    key={`${item.id}-${index}`}
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: 'rgba(239, 68, 68, 0.5)',
                      boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)'
                    }}
                    className="group relative w-[350px] md:w-[450px] shrink-0 bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={img} 
                        alt={title} 
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 font-bold"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                      
                      {/* Language Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 rounded-full bg-brand-primary-red/10 backdrop-blur-md border border-brand-primary-red/20 text-[10px] font-bold text-brand-secondary-red uppercase tracking-wider">
                          {lang}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 pb-10 flex flex-col gap-4">
                      <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase hero-text-shadow line-clamp-1">
                        {title}
                      </h3>
                      <p className="text-sm font-bold text-brand-secondary-red/90 tracking-tight leading-snug line-clamp-2">
                        {desc}
                      </p>

                      <div className="flex items-center gap-4 mt-auto pt-4">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-primary-red transition-all">
                          <GithubIcon size={18} className="text-white" />
                        </a>
                        {item.homepage && (
                          <a href={item.homepage} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-primary-red transition-all">
                            <ArrowUpRight size={18} className="text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 px-6"
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
