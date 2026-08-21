/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';
import WebVitalsTracker from './components/atoms/WebVitalsTracker.tsx';
import CommandPalette from './components/organisms/CommandPalette.tsx';
import Header from './components/organisms/Header.tsx';
import FooterSection from './components/organisms/FooterSection.tsx';
import FloatingAIAssistant from './components/organisms/FloatingAIAssistant.tsx';
import LoadingScreen from './components/organisms/LoadingScreen.tsx';
import InteractiveBackground from './components/atoms/InteractiveBackground.tsx';
import HomePage from './pages/HomePage.tsx';
import BlogHubPage from './pages/BlogHubPage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import PortfolioPage from './pages/PortfolioPage.tsx';
import ProjectDetailPage from './pages/ProjectDetailPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ServiceDetailPage from './pages/ServiceDetailPage.tsx';
import AreaDetailPage from './pages/AreaDetailPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 6000], [0, -360]);

  return (
    <Router>
        <ScrollToTop />
        <Analytics />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="bg-white text-gray-900 relative min-h-screen"
      >
        <InteractiveBackground />
        <WebVitalsTracker />
        <CommandPalette />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
          <LoadingScreen onComplete={() => setAppLoaded(true)} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={appLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col flex-1"
          >
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogHubPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/layanan/:slug" element={<ServiceDetailPage />} />
              <Route path="/area/:cityName" element={<AreaDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <FooterSection />
          </motion.div>
          <FloatingAIAssistant />
        </div>
      </motion.main>
    </Router>
  );
}
