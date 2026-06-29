import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon, WhatsappIcon } from './Icons';

export default function Footer() {
  const { t, language } = useLanguage();
  const { contact, hero, nav } = t;

  return (
    <footer className="relative z-10 w-full px-6 lg:px-12 pb-8 pt-8 overflow-hidden">

      <div className="max-w-7xl mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] px-6 md:px-10 py-6 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary-red/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Logo & Info */}
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-2 group w-fit">
                <img
                  src="/logokauancomper.svg"
                  alt="Logo Kauan Comper"
                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />
                <span className="text-lg font-display font-medium text-white tracking-tight">
                  {hero.title_name}
                </span>
              </Link>
              <p className="text-white/40 text-xs leading-relaxed max-w-xs">
                {hero.subtitle}
              </p>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 w-fit px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary-red animate-pulse shadow-[0_0_10px_#EF4444]" />
                <span className="text-white/60 text-[9px] font-mono uppercase tracking-widest font-bold">
                  {hero.badge_label}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white/90 font-bold text-[9px] uppercase tracking-[0.3em]">
                {language === 'pt' ? 'Navegação' : language === 'es' ? 'Navegación' : 'Navigation'}
              </h4>
              <nav className="flex flex-col gap-2">
                {[
                  { label: nav.home, path: '/' },
                  { label: nav.about, path: '/sobre' },
                  { label: nav.projects, path: '/projetos' },
                  { label: nav.contact, path: '/contato' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-white/40 hover:text-white text-xs transition-all w-fit hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Channels */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white/90 font-bold text-[9px] uppercase tracking-[0.3em]">
                {language === 'pt' ? 'Canais Sociais' : language === 'es' ? 'Canales Sociales' : 'Social Channels'}
              </h4>
              <motion.div
                className="flex flex-col gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
              >
                {[
                  { href: `mailto:${contact.email}`, label: 'E-mail', icon: <Mail size={13} />, external: false },
                  { href: contact.linkedin, label: 'LinkedIn', icon: <LinkedinIcon size={13} />, external: true },
                  { href: contact.github, label: 'GitHub', icon: <GithubIcon size={13} />, external: true },
                  { href: contact.whatsapp, label: 'WhatsApp', icon: <WhatsappIcon size={13} />, external: true },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    whileHover={{ x: 6, color: '#ffffff' }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 text-white/40 text-xs w-fit"
                  >
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(239,68,68,0.2)', color: '#EF4444' }}
                      className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center transition-colors"
                    >
                      {item.icon}
                    </motion.div>
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center lg:items-end gap-3">
              <Link
                to="/contato"
                className="px-5 py-2.5 rounded-xl bg-brand-primary-red text-white hover:bg-brand-secondary-red transition-all text-[10px] font-bold w-fit shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
              >
                {language === 'pt' ? 'VAMOS TRABALHAR?' : language === 'es' ? '¿VAMOS A TRABAJAR?' : "LET'S WORK?"}
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary-red/40 to-transparent origin-left"
            />
            <p className="text-white/20 text-[9px] font-mono uppercase tracking-[0.2em] text-center sm:text-center">
              © {new Date().getFullYear()} {hero.title_name} — {language === 'pt' ? 'Todos os direitos reservados' : language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
