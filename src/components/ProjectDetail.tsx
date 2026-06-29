import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Wrench, ImageIcon } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { loadProjects } from '../services/projectsData';
import type { ProjectData } from '../services/projectsData';
import { getRepoLanguageImage } from '../services/github';
import AmbientGlows from './AmbientGlows';

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    loadProjects().then(list => {
      const found = list.find(p => p.repoName === slug) ?? null;
      setProject(found);
      setLoading(false);
    });
  }, [slug]);

  if (!slug) return null;

  function safeUrl(url: string | undefined): string {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol) ? url : '';
    } catch { return ''; }
  }

  const coverImage = safeUrl(project?.coverImage) || getRepoLanguageImage(null);
  const highlight = project?.[language]?.highlight ?? '';
  const detail = project?.[language]?.detail ?? '';
  const tools = project?.tools ?? [];
  const screenshots = (project?.screenshots ?? []).filter(s => !!safeUrl(s));
  const liveUrl = safeUrl(project?.liveUrl);
  const githubUrl = `https://github.com/kauancomper/${encodeURIComponent(slug)}`;
  const projectTitle = (project?.[language]?.name || slug).replace(/[-_]/g, ' ').toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientGlows />

      {/* ── HERO IMAGE (apenas imagem + botão voltar) ── */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img
          src={coverImage}
          alt={slug}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradiente leve só nas bordas — não esconde a imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Botão voltar posicionado abaixo do header fixo */}
        <div className="absolute top-0 left-0 right-0 pt-28 px-6 lg:px-16 max-w-7xl mx-auto">
          <Link
            to="/projetos"
            className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors w-fit group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Projetos
          </Link>
        </div>
      </div>

      {/* ── TÍTULO E DESCRIÇÃO (abaixo da imagem) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-10 border-b border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {tools.length > 0 && (
            <span className="inline-block mb-4 text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-brand-secondary-red border border-brand-primary-red/30 bg-brand-primary-red/10 px-3 py-1 rounded-full">
              {tools[0]}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-4">
            {loading ? slug.replace(/[-_]/g, ' ').toUpperCase() : projectTitle}
          </h1>
          {highlight && (
            <p className="text-white/55 text-base md:text-lg max-w-3xl leading-relaxed">
              {highlight}
            </p>
          )}
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-16 space-y-20"
      >
        {/* Links */}
        <motion.div variants={item} className="flex items-center gap-4 flex-wrap">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/6 border border-white/15 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-widest hover:bg-white/12 hover:border-white/30 transition-all"
          >
            <GithubIcon size={16} />
            Repositório
          </a>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary-red rounded-full text-white text-xs font-black uppercase tracking-widest shadow-[0_0_18px_rgba(239,68,68,0.35)] hover:bg-brand-secondary-red hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Ver ao vivo
            </a>
          )}
          {loading && (
            <div className="w-2 h-2 rounded-full bg-brand-primary-red animate-pulse" />
          )}
        </motion.div>

        {/* Description */}
        {detail && (
          <motion.div variants={item} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-brand-primary-red rounded-full" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-white/40">
                Sobre o projeto
              </h2>
            </div>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl pl-4 border-l border-white/[0.06]">
              {detail}
            </p>
          </motion.div>
        )}

        {/* Tools */}
        {tools.length > 0 && (
          <motion.div variants={item} className="space-y-6">
            <div className="flex items-center gap-3">
              <Wrench className="w-4 h-4 text-brand-primary-red" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-white/40">
                Tecnologias utilizadas
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <motion.span
                  key={tool}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono font-bold text-white/70 hover:border-brand-primary-red/40 hover:text-white hover:bg-brand-primary-red/8 transition-all cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <motion.div variants={item} className="space-y-6">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-4 h-4 text-brand-primary-red" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-white/40">
                Galeria do projeto
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightbox(src)}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in group"
                >
                  <img
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sem dados */}
        {!loading && !project && (
          <motion.div variants={item} className="text-center py-20">
            <p className="text-white/30 text-sm font-mono">Projeto não encontrado no JSON de dados.</p>
            <p className="text-white/15 text-xs font-mono mt-2">Adicione-o pelo painel /admin</p>
          </motion.div>
        )}
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img src={lightbox} alt="Screenshot" className="max-w-full max-h-full rounded-xl shadow-2xl" />
        </motion.div>
      )}
    </div>
  );
}
