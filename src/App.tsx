import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import { LanguageProvider } from './context/LanguageContext';

// Components lazy loaded
const Hero = lazy(() => import('./components/Hero'));
const RecentWorks = lazy(() => import('./components/RecentWorks'));
const Process = lazy(() => import('./components/Process'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function Home() {
  return (
    <>
      <Hero />
      <RecentWorks />
      <Process />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition path="/">
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            </PageTransition>
          } 
        />
        <Route 
          path="/sobre" 
          element={
            <PageTransition path="/sobre">
              <Suspense fallback={null}>
                <About />
              </Suspense>
            </PageTransition>
          } 
        />
        <Route 
          path="/projetos" 
          element={
            <PageTransition path="/projetos">
              <Suspense fallback={null}>
                <Projects />
              </Suspense>
            </PageTransition>
          } 
        />
        <Route 
          path="/contato" 
          element={
            <PageTransition path="/contato">
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <LanguageProvider>
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
    </LanguageProvider>
  );
}

export default App;
