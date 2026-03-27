import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../data/content';
import { ArrowUpRight } from 'lucide-react';
import { fetchGithubProjects, getRepoLanguageImage } from '../services/github';
import type { GithubRepo } from '../services/github';
import Background3D from './Background3D';
import AmbientGlows from './AmbientGlows';

const REPO_DESCRIPTIONS: Record<string, Record<Language, { highlight: string; detail: string }> & { image?: string }> = {
  'meu-portfolio': {
    pt: {
      highlight: 'Portfólio de alta performance com React, Vite e Framer Motion.',
      detail: 'Desenvolvimento focado em design premium, animações fluidas e otimização extrema de Core Web Vitals para uma experiência sênior.'
    },
    en: {
      highlight: 'High-performance portfolio with React, Vite, and Framer Motion.',
      detail: 'Development focused on premium design, fluid animations, and extreme Core Web Vitals optimization for a senior experience.'
    },
    es: {
      highlight: 'Portafolio de alto rendimiento con React, Vite y Framer Motion.',
      detail: 'Desarrollo enfocado en diseño premium, animaciones fluidas y optimización extrema de Core Web Vitals para una experiencia senior.'
    }
  },
  'portfolio_kc': {
    pt: {
      highlight: 'Versão experimental e minimalista do portfólio pessoal.',
      detail: 'Exploração de fundamentos de design e animações puras em HTML/CSS para estabelecer a identidade visual da marca Kauan Comper.'
    },
    en: {
      highlight: 'Experimental and minimalist version of the personal portfolio.',
      detail: 'Exploration of design fundamentals and pure HTML/CSS animations to establish the Kauan Comper brand visual identity.'
    },
    es: {
      highlight: 'Versión experimental y minimalista del portafolio personal.',
      detail: 'Exploración de fundamentos de diseño y animaciones puras en HTML/CSS para establecer la identidad visual de la marca Kauan Comper.'
    }
  },
  'portfolio_jn_redesign': {
    pt: {
      highlight: 'Redesign completo de portfólio profissional para cliente.',
      detail: 'Implementação de automação com Playwright para extração de dados e arquitetura baseada em Docker para facilitação de deploy.'
    },
    en: {
      highlight: 'Complete redesign of a professional portfolio for a client.',
      detail: 'Implementation of automation with Playwright for data extraction and Docker-based architecture for easy deployment.'
    },
    es: {
      highlight: 'Rediseño completo de un portafolio profesional para un cliente.',
      detail: 'Implementación de automatización com Playwright para extracción de datos y arquitetura basada en Docker para facilitar el despliegue.'
    },
    image: '/portfolio-jn.png'
  },
  'portfolio_JordaoNunes': {
    pt: {
      highlight: 'Ecossistema digital focado em branding e presença profissional.',
      detail: 'Integração de feeds dinâmicos e arquitetura limpa desenvolvida para escalar a presença digital do profissional Jordão Nunes.'
    },
    en: {
      highlight: 'Digital ecosystem focused on branding and professional presence.',
      detail: 'Integration of dynamic feeds and clean architecture developed to scale the digital presence of the professional Jordão Nunes.'
    },
    es: {
      highlight: 'Ecosistema digital enfocado en branding y presencia profesional.',
      detail: 'Integración de feeds dinámicos y arquitectura limpia desarrollada para escalar la presencia digital del profesional Jordão Nunes.'
    },
    image: '/portfolio-jn.png'
  },
  'BDII-TGI': {
    pt: {
      highlight: 'Sistema de Gestão Imobiliária robusto com FastAPI e Postgres.',
      detail: 'Mapeamento ORM complexo, modelagem de banco de dados relacional e containerização completa para ambiente de desenvolvimento.'
    },
    en: {
      highlight: 'Robust Real Estate Management System with FastAPI and Postgres.',
      detail: 'Complex ORM mapping, relational database modeling, and full containerization for a development environment.'
    },
    es: {
      highlight: 'Sistema de Gestión Inmobiliaria robusto con FastAPI y Postgres.',
      detail: 'Mapeo ORM complejo, modelado de bases de datos relacionales y contenedorización completa para el entorno de desarrollo.'
    },
    image: '/apache-imobiliaria.png'
  }
};

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
