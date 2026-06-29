import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { fetchGithubProjects, getRepoLanguageImage } from '../services/github';
import type { GithubRepo } from '../services/github';
import { loadProjects, findProject } from '../services/projectsData';
import type { ProjectData } from '../services/projectsData';
import AmbientGlows from './AmbientGlows';

// ─── TiltCard ────────────────────────────────────────────────────────────────

interface TiltCardProps {
  repoName: string;
  index: number;
  children: React.ReactNode;
}

function TiltCard({ repoName, index, children }: TiltCardProps) {
  const navigate = useNavigate();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawX, { stiffness: 200, damping: 20 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    rawX.set((xRatio - 0.5) * 14);
    rawY.set((yRatio - 0.5) * -14);
    setShinePos({ x: xRatio * 100, y: yRatio * 100 });
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setShinePos({ x: 50, y: 50 });
  }

  return (
    <motion.div
      onClick={() => navigate(`/projetos/${repoName}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.08 * index }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col h-[480px] lg:h-[550px] rounded-3xl overflow-hidden ring-1 ring-white/10 hover:ring-brand-primary-red/30 hover:shadow-[0_0_50px_rgba(239,68,68,0.15)] transition-shadow duration-500 cursor-pointer"
    >
      <div
        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at ${shinePos.x}% ${shinePos.y}%, rgba(239,68,68,0.10) 0%, transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

export default function Projects() {
  const { t, language } = useLanguage();
  const { projects } = t;
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [enrichment, setEnrichment] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchGithubProjects(), loadProjects()]).then(([ghRepos, localData]) => {
      setRepos(ghRepos);
      setEnrichment(localData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
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
          ) : (
            repos.map((repo, idx) => {
              const local = findProject(enrichment, repo.name);
              const coverImg = local?.coverImage || getRepoLanguageImage(repo.language);
              const name = local?.[language]?.name || repo.name.replace(/[-_]/g, ' ');
              const highlight = local?.[language]?.highlight || repo.description || '';
              const detail = local?.[language]?.detail || '';
              const tool = local?.tools?.[0] || repo.language || '';

              return (
                <TiltCard key={repo.id} repoName={repo.name} index={idx}>
                  <div className="absolute inset-0">
                    <img
                      src={coverImg}
                      alt={name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent/20" />
                  </div>

                  <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full">
                    {tool && (
                      <div className="w-fit mb-4 px-3 py-1 bg-brand-primary-red/10 backdrop-blur-md rounded-full border border-brand-primary-red/30">
                        <span className="text-[10px] font-bold text-brand-secondary-red uppercase tracking-widest">
                          {tool}
                        </span>
                      </div>
                    )}
                    <h4 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight uppercase leading-tight drop-shadow-lg">
                      {name}
                    </h4>
                    {highlight && (
                      <p className="text-brand-secondary-red font-bold text-xs md:text-sm tracking-wider uppercase mb-3 drop-shadow-sm">
                        {highlight}
                      </p>
                    )}
                    {detail && (
                      <p className="text-white/70 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6 max-w-[90%] drop-shadow-md">
                        {detail}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-brand-secondary-red text-[10px] md:text-xs font-black uppercase tracking-widest transition-transform group-hover:translate-x-2 opacity-0 group-hover:opacity-100 duration-300">
                      {language === 'pt' ? 'Visualizar Case' : language === 'es' ? 'Ver Caso' : 'View Case'}
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:rotate-45" />
                    </div>
                  </div>
                </TiltCard>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
