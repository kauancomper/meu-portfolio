import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';

// Pages lazily loaded to drastically reduce initial JS bundle size
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition path="/"><Suspense fallback={null}><Hero /></Suspense></PageTransition>} />
        <Route path="/sobre" element={<PageTransition path="/sobre"><Suspense fallback={null}><About /></Suspense></PageTransition>} />
        <Route path="/projetos" element={<PageTransition path="/projetos"><Suspense fallback={null}><Projects /></Suspense></PageTransition>} />
        <Route path="/contato" element={<PageTransition path="/contato"><Suspense fallback={null}><Contact /></Suspense></PageTransition>} />
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
