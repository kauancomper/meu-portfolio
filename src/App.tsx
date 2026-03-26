import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';

// Pages
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition path="/"><Hero /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition path="/sobre"><About /></PageTransition>} />
        <Route path="/projetos" element={<PageTransition path="/projetos"><Projects /></PageTransition>} />
        <Route path="/contato" element={<PageTransition path="/contato"><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-white selection:bg-brand-primary-red/30 font-sans">
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {isInitialLoading && (
            <LoadingScreen key="initial-loader" onComplete={() => setIsInitialLoading(false)} />
          )}
        </AnimatePresence>

        <Header />
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
