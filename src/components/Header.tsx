import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

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
          className="flex items-center gap-2 group"
        >
          {/* Logo Mark */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary-red group-hover:text-brand-secondary-red transition-colors">
            <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M12 10L6 22H18L12 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="text-xl font-display font-medium text-white tracking-wide">
            Kauan Comper
          </span>
        </Link>

        {/* Center: Navigation Pill */}
        <nav className="hidden md:flex items-center bg-white/5 border border-white/10 backdrop-blur-md rounded-full p-1.5 shadow-2xl">
          {[
            { id: '/', label: portfolioContent.nav.home },
            { id: '/sobre', label: portfolioContent.nav.about },
            { id: '/projetos', label: portfolioContent.nav.projects },
            { id: '/contato', label: portfolioContent.nav.contact },
          ].map((item) => {
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

        {/* Right: Language & CTA */}
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
        <button className="md:hidden text-white p-2">
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </div>
    </motion.header>
  );
}
