import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D';
import Header from './components/Header';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';

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
      <div className="min-h-screen bg-background text-white selection:bg-brand-primary-red/30 font-sans">
        <Background3D />
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {isInitialLoading && (
            <LoadingScreen key="initial-loader" onComplete={() => setIsInitialLoading(false)} />
          )}
        </AnimatePresence>

        <Header />
        <main className="relative">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
