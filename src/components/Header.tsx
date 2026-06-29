import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Detectar scroll para aplicar background no Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar o menu ao mudar de página
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  // Bloquear scroll quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Em páginas de detalhe de projeto o fundo do header fica sempre visível
  const alwaysShowBg = currentPath.startsWith('/projetos/') && currentPath !== '/projetos';

  const navItems = [
    { id: '/', label: t.nav.home },
    { id: '/sobre', label: t.nav.about },
    { id: '/projetos', label: t.nav.projects },
    { id: '/contato', label: t.nav.contact },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
    >
      {/* Background overlay on scroll */}
      <div
        className={`absolute inset-0 transition-all duration-300 pointer-events-auto ${isScrolled || alwaysShowBg ? 'bg-black/90 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-transparent'
          }`}
      />

      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto relative z-10 py-5 px-6 lg:px-12">

        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group z-50"
        >
          {/* Logo Mark */}
          <img
            src="/logokauancomper.svg"
            alt="Logo Kauan Comper"
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          />
          <span className="text-xl font-display font-medium text-white tracking-wide">
            Kauan Comper
          </span>
        </Link>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.id || (currentPath === '' && item.id === '/');
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`px-5 py-2 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-brand-primary-red' : 'text-white/50 hover:text-white'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Language & CTA (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs font-mono font-bold">
            {(['pt', 'en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`transition-colors duration-200 uppercase ${language === lang ? 'text-brand-primary-red' : 'text-white/35 hover:text-white'}`}
              >
                {lang}
              </button>
            ))}
          </div>

          <Link
            to="/contato"
            className="bg-brand-primary-red hover:bg-brand-secondary-red text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]"
          >
            {t.nav.contact}
          </Link>
        </div>

        {/* Mobile Menu Button — hamburger animado */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          className="md:hidden text-white p-2 z-50 relative pointer-events-auto flex flex-col justify-center items-center gap-[6px] w-10 h-10"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="w-6 h-[2px] bg-white block origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-[2px] bg-white block"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="w-6 h-[2px] bg-white block origin-center"
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl md:hidden overflow-hidden flex flex-col p-8 pt-32 pointer-events-auto"
            >
              <div className="flex flex-col gap-8">
                {navItems.map((item, idx) => {
                  const isActive = currentPath === item.id || (currentPath === '' && item.id === '/');
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <Link
                        to={item.id}
                        className="flex items-center justify-between text-4xl font-black tracking-tighter uppercase"
                      >
                        <span className={isActive ? 'text-brand-primary-red' : 'text-white/40'}>
                          {item.label}
                        </span>
                        {isActive && <div className="w-3 h-3 bg-brand-primary-red rounded-full" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto pt-12 border-t border-white/10">
                <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-6">{language === 'pt' ? 'Contatos e Idiomas' : language === 'en' ? 'Contact and Language' : 'Contacto e Idioma'}</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {(['pt', 'en', 'es'] as const).map(lang => (
                    <button 
                      key={lang} 
                      onClick={() => setLanguage(lang)}
                      className={`text-xl font-bold uppercase ${lang === language ? 'text-white' : 'text-white/30'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <Link
                  to="/contato"
                  className="block w-full text-center bg-brand-primary-red py-6 rounded-3xl text-2xl font-black uppercase tracking-tighter"
                >
                  {t.nav.contact === 'Contact' ? 'Let\'s Talk!' : t.nav.contact === 'Contacto' ? '¡Hablemos!' : 'Vamos Conversar!'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
