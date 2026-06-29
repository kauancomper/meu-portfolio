import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Fragment } from 'react';
import { WhatsappIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { useMagnetic } from '../hooks/useMagnetic';
import MatrixRain from './MatrixRain';
import processPhoto from '../assets/sesssaoprocesso.png';

// ─── MaterializeText ─────────────────────────────────────────────────────────

interface MaterializeTextProps { text: string; delay?: number; stagger?: number; className?: string }

function MaterializeText({ text, delay = 0, stagger = 0.04, className }: MaterializeTextProps) {
  if (!text) return null;
  const words = text.split(' ');
  let count = 0;
  return (
    <span className={className}>
      {words.map((word, wi) => {
        const start = count; count += word.length + 1;
        return (
          <Fragment key={wi}>
            <span style={{ display: 'inline-block' }}>
              {Array.from(word).map((char, ci) => (
                <motion.span key={ci} style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, filter: 'blur(12px)', textShadow: '0 0 40px rgba(248,113,113,1)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)', textShadow: '0 0 0px rgba(248,113,113,0)' }}
                  transition={{ duration: 0.7, delay: delay + (start + ci) * stagger, ease: [0.22, 1, 0.36, 1] }}
                >{char}</motion.span>
              ))}
            </span>
            {wi < words.length - 1 && ' '}
          </Fragment>
        );
      })}
    </span>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useLanguage();
  const c = t.hero;
  const primaryMag = useMagnetic<HTMLAnchorElement>(0.28);
  const secondaryMag = useMagnetic<HTMLAnchorElement>(0.28);

  return (
    <section className="relative min-h-[100svh] lg:h-screen flex flex-col overflow-hidden">

      {/* Matrix Rain */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
        <MatrixRain className="opacity-70" />
      </div>

      {/* ── Grid de duas colunas — ocupa o espaço disponível entre header e marquee ── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-12 px-6 lg:px-12 pt-24 pb-6 max-w-7xl mx-auto w-full">

        {/* ── COLUNA ESQUERDA ── */}
        <div className="flex flex-col justify-between gap-4">

          {/* Meta */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/30 font-mono text-[10px] uppercase tracking-widest flex items-center gap-3"
          >
            {c.location}
            <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
            {c.remote}
          </motion.p>

          {/* Título */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="block font-black tracking-tighter uppercase leading-none text-3xl md:text-5xl lg:text-[4.8rem] text-white/35"
            >{c.title_line1}</motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="block font-black tracking-tighter uppercase leading-none text-4xl md:text-6xl lg:text-[4.8rem] text-white"
            >{c.title_line2}</motion.span>

            <MaterializeText
              text={c.title_name?.split(' ')[0] ?? ''} delay={0.38} stagger={0.035}
              className="block font-black tracking-tighter uppercase leading-none text-4xl md:text-6xl lg:text-[6.8rem] text-brand-primary-red"
            />
            <MaterializeText
              text={c.title_name?.split(' ').slice(1).join(' ') ?? ''} delay={0.65} stagger={0.035}
              className="block font-black tracking-tighter uppercase leading-none text-4xl md:text-6xl lg:text-[6.8rem] text-brand-primary-red"
            />
          </div>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-white/45 text-sm max-w-md leading-relaxed"
          >
            {c.description}
          </motion.p>

          {/* Botões */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            style={{ marginTop: '2rem' }}
            className="flex items-center gap-3 flex-wrap"
          >
            <motion.a
              ref={secondaryMag.ref} style={secondaryMag.style}
              href={t.contact.whatsapp} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary-red rounded-full text-white text-xs font-black uppercase tracking-widest shadow-[0_0_18px_rgba(239,68,68,0.35)] hover:bg-brand-secondary-red hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all"
            >
              <WhatsappIcon size={14} />
              {c.cta_secondary}
            </motion.a>

            <motion.a
              ref={primaryMag.ref} style={primaryMag.style}
              href="#recent-works"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/6 border border-white/18 backdrop-blur-xl rounded-full text-white text-xs font-black uppercase tracking-widest hover:bg-white/12 hover:border-white/35 transition-all"
            >
              {c.cta_primary}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

        </div>

        {/* ── COLUNA DIREITA: Foto + Terminal ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl lg:rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[260px] lg:min-h-0"
        >
          {/* Foto — desktop only */}
          <img
            src={processPhoto}
            alt="Kauan Comper"
            className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Camadas de fusão — desktop only */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-brand-primary-red/6 via-transparent to-transparent" style={{ mixBlendMode: 'screen' }} />

          {/* Mobile: fundo escuro sutil para o terminal */}
          <div className="block lg:hidden absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl" />

          {/* Linha de scan animada — desktop only */}
          <motion.div
            className="hidden lg:block absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary-red/25 to-transparent pointer-events-none"
            animate={{ top: ['15%', '80%', '15%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Cantos estilo viewfinder — desktop only */}
          <div className="hidden lg:block absolute top-5 left-5 pointer-events-none">
            <div className="w-6 h-[2px] bg-brand-primary-red/60" />
            <div className="w-[2px] h-6 bg-brand-primary-red/60 mt-[-2px]" />
          </div>
          <div className="hidden lg:block absolute top-5 right-5 pointer-events-none">
            <div className="w-6 h-[2px] bg-brand-primary-red/60 ml-auto" />
            <div className="w-[2px] h-6 bg-brand-primary-red/60 ml-auto mt-[-2px]" />
          </div>

          {/* Glow vermelho — desktop only */}
          <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-28 bg-brand-primary-red/12 blur-[50px] pointer-events-none" />

          {/* Terminal flutuante com animação */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 p-3 lg:p-4"
          >
            <div className="bg-black/80 backdrop-blur-2xl border border-white/[0.12] rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(239,68,68,0.06)]">
              {/* Barra do terminal */}
              <div className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-auto text-[8px] lg:text-[9px] font-mono text-white/20 uppercase tracking-widest">kauan@portfolio</span>
              </div>

              {/* Linhas */}
              <div className="px-3 lg:px-5 py-3 lg:py-4 font-mono grid grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-1 lg:gap-y-1.5">
                {([
                  ['text-brand-secondary-red', '$ whoami', 'text-white/50', '→ Kauan Comper'],
                  ['text-brand-secondary-red', '$ role', 'text-white/50', '→ Dev Sistemas & IA'],
                  ['text-brand-secondary-red', '$ stack', 'text-white/50', '→ Node · Python · React'],
                  ['text-brand-secondary-red', '$ status', 'text-White/100', '→ DISPONÍVEL ✓'],
                ] as [string, string, string, string][]).map(([c1, l1, c2, l2], i) => (
                  <Fragment key={i}>
                    <motion.span
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.25, duration: 0.3 }}
                      className={`${c1} text-[9px] lg:text-[10px]`}
                    >{l1}</motion.span>
                    <motion.span
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.85 + i * 0.25, duration: 0.3 }}
                      className={`${c2} text-[9px] lg:text-[10px]`}
                    >{l2}</motion.span>
                  </Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Marquee — fixa na base do h-screen ── */}
      <div
        className="relative z-10 w-full py-3 border-t border-white/[0.06] overflow-hidden pause-on-hover shrink-0"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div className="animate-marquee flex items-center gap-8 w-max">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 whitespace-nowrap">
              {c.skills.split(' • ').map((skill, idx) => (
                <div key={idx} className="flex items-center gap-8">
                  <span className="text-[11px] font-bold text-white/55 uppercase tracking-widest">{skill}</span>
                  <span className="text-brand-primary-red/35">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
