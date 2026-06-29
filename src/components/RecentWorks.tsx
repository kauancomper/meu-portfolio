import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';
import { GithubIcon } from './Icons';
import { fetchGithubProjects, getRepoLanguageImage } from '../services/github';
import type { GithubRepo } from '../services/github';
import { loadProjects } from '../services/projectsData';
import type { ProjectData } from '../services/projectsData';
import { useLanguage } from '../context/LanguageContext';
import { REPO_DESCRIPTIONS } from '../data/projectsData';

export default function RecentWorks() {
  const { t, language } = useLanguage();
  const content = t.recent_works;
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [cmsProjects, setCmsProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const viewAllMag = useMagnetic<HTMLDivElement>(0.25);

  useEffect(() => {
    async function load() {
      const [data, cms] = await Promise.all([
        fetchGithubProjects(),
        loadProjects(),
      ]);
      setRepos(data);
      setCmsProjects(cms);
      setLoading(false);
    }
    load();
  }, []);

  function getCms(repoName: string): ProjectData | undefined {
    return cmsProjects.find(p => p.repoName === repoName);
  }

  // Duplicate for infinite marquee
  const displayRepos = repos.length > 0 ? [...repos, ...repos, ...repos] : [];

  return (
    <section id="recent-works" className="relative w-full py-24 overflow-hidden">

      {/* Top fade — blends into Hero background */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      {/* Background Glows */}
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
            {content.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] hero-text-shadow"
          >
            {content.title_part1} <br />
            <span className="text-white/40">{content.title_part2}</span>
          </motion.h2>
        </div>

        {/* Marquee Container */}
        <div className="w-full relative pause-on-hover px-4 overflow-hidden">
          {/* Vignette lateral */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[350px] md:w-[450px] aspect-[4/3] bg-white/5 rounded-[40px] animate-pulse shrink-0" />
              ))
            ) : (
              displayRepos.map((item, index) => {
                const cms = getCms(item.name);

                // Prioridade: CMS → REPO_DESCRIPTIONS estático → fallback GitHub
                const image =
                  (cms?.coverImage || undefined) ||
                  REPO_DESCRIPTIONS[item.name]?.image ||
                  getRepoLanguageImage(item.language);

                const displayName =
                  cms?.[language]?.name ||
                  item.name.replace(/[-_]/g, ' ');

                const highlight =
                  cms?.[language]?.highlight ||
                  REPO_DESCRIPTIONS[item.name]?.[language]?.highlight ||
                  item.description ||
                  (language === 'pt'
                    ? 'Projeto desenvolvido com foco em performance e automação inteligente.'
                    : 'Project developed with focus on performance and intelligent automation.');

                const liveUrl =
                  cms?.liveUrl ||
                  REPO_DESCRIPTIONS[item.name]?.url ||
                  item.homepage;

                return (
                  <motion.div
                    key={`${item.id}-${index}`}
                    whileHover={{
                      scale: 1.02,
                      borderColor: 'rgba(239, 68, 68, 0.5)',
                      boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)'
                    }}
                    className="group relative w-[350px] md:w-[450px] shrink-0 bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-[40px] overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt={displayName}
                        className="w-full h-full object-cover transition-all duration-700 font-bold group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                      {/* Language Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 rounded-full bg-brand-primary-red/10 backdrop-blur-md border border-brand-primary-red/20 text-[10px] font-bold text-brand-secondary-red uppercase tracking-wider">
                          {item.language || (language === 'pt' ? 'Geral' : 'General')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 pb-10 flex flex-col gap-4">
                      <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase hero-text-shadow line-clamp-1">
                        {displayName}
                      </h3>
                      <p className="text-sm font-bold text-brand-secondary-red/90 tracking-tight leading-snug line-clamp-2">
                        {highlight}
                      </p>

                      <div className="flex items-center gap-4 mt-auto pt-4">
                        <a href={item.html_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-primary-red transition-all">
                          <GithubIcon size={18} className="text-white" />
                        </a>
                        {liveUrl && (
                          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-primary-red transition-all">
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

        {/* View All Button — magnético */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 px-6 flex justify-center"
        >
          <motion.div ref={viewAllMag.ref} style={viewAllMag.style}>
            <Link
              to="/projetos"
              className="group flex items-center gap-3 px-10 py-5 rounded-full border border-white/10 bg-white/5 hover:bg-brand-primary-red hover:border-brand-primary-red transition-all duration-300"
            >
              <span className="text-sm font-black text-white uppercase tracking-widest">
                {content.view_all}
              </span>
              <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
