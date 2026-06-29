import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import PageTransition from './components/PageTransition';
import Background3D from './components/Background3D';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
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
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const Contact = lazy(() => import('./components/Contact'));
const Admin = lazy(() => import('./components/Admin'));

function Home() {
  return (
    <>
      <Hero />
      <RecentWorks />
      <Process />
      <Contact hideCalendar={true} />
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
          path="/projetos/:slug"
          element={
            <PageTransition path="/projetos/:slug">
              <Suspense fallback={null}>
                <ProjectDetail />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={null}>
              <Admin />
            </Suspense>
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

function PortfolioShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-brand-primary-red/30 font-sans">
      {!isAdmin && (
        <>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Background3D />
          </div>
          <ScrollProgress />
          <div className="grain-overlay" aria-hidden="true" />
          <CustomCursor />
          <BackToTop />
          <Header />
        </>
      )}
      <main className={isAdmin ? undefined : 'relative z-10'}>
        <AnimatedRoutes />
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <PortfolioShell />
      </Router>
    </LanguageProvider>
  );
}

export default App;
