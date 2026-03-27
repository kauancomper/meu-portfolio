import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.1-.34 6.36-1.54 6.36-7a5.2 5.2 0 0 0-1.5-3.78c.15-.38.65-1.8-.15-3.78 0 0-1.2-.38-3.9 1.45a13.4 13.4 0 0 0-7 0c-2.7-1.83-3.9-1.45-3.9-1.45-.8 1.98-.3 3.4-.15 3.78a5.2 5.2 0 0 0-1.5 3.78c0 5.42 3.2 6.66 6.3 7 0 0 0 0 0 0A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 18c-4.5 1.5-5.5-2-7-2" />
  </svg>
);

const WhatsappIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  const { t, language } = useLanguage();
  const { contact, hero, nav } = t;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full px-6 lg:px-12 pb-12 pt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[4rem] px-8 md:px-16 py-16 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary-red/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo & Info */}
            <div className="flex flex-col gap-6">
              <Link to="/" className="flex items-center gap-2 group w-fit">
                <img
                  src="/logokauancomper.svg"
                  alt="Logo Kauan Comper"
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />
                <span className="text-2xl font-display font-medium text-white tracking-tight">
                  {hero.title_name}
                </span>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
                {hero.subtitle}
              </p>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 w-fit px-4 py-2 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary-red animate-pulse shadow-[0_0_10px_#EF4444]" />
                <span className="text-white/60 text-[10px] font-mono uppercase tracking-widest font-bold">
                  {hero.badge_label}
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-8">
              <h4 className="text-white/90 font-bold text-[10px] uppercase tracking-[0.3em]">
                {language === 'pt' ? 'Navegação' : language === 'es' ? 'Navegación' : 'Navigation'}
              </h4>
              <nav className="flex flex-col gap-4">
                {[
                  { label: nav.home, path: '/' },
                  { label: nav.about, path: '/sobre' },
                  { label: nav.projects, path: '/projetos' },
                  { label: nav.contact, path: '/contato' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-white/40 hover:text-white text-sm transition-all w-fit hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-8">
              <h4 className="text-white/90 font-bold text-[10px] uppercase tracking-[0.3em]">
                {language === 'pt' ? 'Canais Sociais' : language === 'es' ? 'Canales Sociales' : 'Social Channels'}
              </h4>
              <div className="flex flex-col gap-5">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-sm group w-fit">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary-red/20 group-hover:text-brand-primary-red transition-all">
                    <Mail size={16} />
                  </div>
                  E-mail
                </a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-sm group w-fit">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary-red/20 group-hover:text-brand-primary-red transition-all">
                    <LinkedinIcon size={16} />
                  </div>
                  LinkedIn
                </a>
                <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-sm group w-fit">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary-red/20 group-hover:text-brand-primary-red transition-all">
                    <GithubIcon size={16} />
                  </div>
                  GitHub
                </a>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-sm group w-fit">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary-red/20 group-hover:text-brand-primary-red transition-all">
                    <MessageSquare size={16} />
                  </div>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* CTA / Quick Actions */}
            <div className="flex flex-col gap-8 lg:items-end">
              <h4 className="text-white/90 font-bold text-[10px] uppercase tracking-[0.3em] lg:text-right w-full">
                {language === 'pt' ? 'Configurações' : language === 'es' ? 'Ajustes' : 'Settings'}
              </h4>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group w-fit"
              >
                <span className="text-xs font-bold text-white/50 group-hover:text-white transition-colors">
                  {language === 'pt' ? 'Voltar ao Topo' : language === 'es' ? 'Volver al Inicio' : 'Back to Top'}
                </span>
                <div className="w-6 h-6 rounded-lg bg-brand-primary-red/10 flex items-center justify-center group-hover:animate-bounce">
                  <ArrowUp size={14} className="text-brand-primary-red" />
                </div>
              </button>
              <Link
                to="/contato"
                className="px-8 py-4 rounded-2xl bg-brand-primary-red text-white hover:bg-brand-secondary-red transition-all text-xs font-bold w-fit shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
              >
                {language === 'pt' ? 'VAMOS TRABALHAR?' : language === 'es' ? '¿VAMOS A TRABAJAR?' : 'LET\'S WORK?'}
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[9px] font-mono uppercase tracking-[0.2em] text-center sm:text-left">
              © {new Date().getFullYear()} {hero.title_name} — {language === 'pt' ? 'Todos os direitos reservados' : language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}
            </p>
            <div className="flex items-center gap-6">
              <p className="text-white/20 text-[9px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                Feito com <span className="text-brand-primary-red animate-pulse">❤</span> & Vibecoding
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
