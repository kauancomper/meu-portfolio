import { motion, AnimatePresence } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

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

  const navItems = [
    { id: '/', label: portfolioContent.nav.home },
    { id: '/sobre', label: portfolioContent.nav.about },
    { id: '/projetos', label: portfolioContent.nav.projects },
    { id: '/contato', label: portfolioContent.nav.contact },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-12 pointer-events-none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">

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

        {/* Center: Navigation Pill (Desktop) */}
        <nav className="hidden md:flex items-center bg-white/5 border border-white/10 backdrop-blur-md rounded-full p-1.5 shadow-2xl">
          {navItems.map((item) => {
            const isActive = currentPath === item.id || (currentPath === '' && item.id === '/');
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="header-active-dot"
                    className="w-1.5 h-1.5 bg-brand-primary-red rounded-sm shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Language & CTA (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-5 py-2.5 text-xs font-mono font-medium">
            <button className="text-white hover:text-brand-primary-red transition-colors">PT</button>
            <button className="text-white/40 hover:text-white transition-colors">EN</button>
            <button className="text-white/40 hover:text-white transition-colors">ES</button>
            <button className="text-white/40 hover:text-white transition-colors">CS</button>
          </div>

          <Link
            to="/contato"
            className="bg-brand-primary-red hover:bg-brand-secondary-red text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]"
          >
            Contato
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 z-50 relative pointer-events-auto"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-6">Contatos e Idiomas</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {['PT', 'EN', 'ES', 'CS'].map(lang => (
                    <button key={lang} className={`text-xl font-bold ${lang === 'PT' ? 'text-white' : 'text-white/30'}`}>
                      {lang}
                    </button>
                  ))}
                </div>
                <Link
                  to="/contato"
                  className="block w-full text-center bg-brand-primary-red py-6 rounded-3xl text-2xl font-black uppercase tracking-tighter"
                >
                  Vamos Conversar!
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
