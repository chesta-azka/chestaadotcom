/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/organisms/Header.tsx';
import FooterSection from './components/organisms/FooterSection.tsx';
import FloatingWhatsAppButton from './components/organisms/FloatingWhatsAppButton.tsx';
import LoadingScreen from './components/organisms/LoadingScreen.tsx';
import ProgressBar from './components/atoms/ProgressBar.tsx';
import MouseGlow from './components/atoms/MouseGlow.tsx';
import HomePage from './pages/HomePage.tsx';
import BlogHubPage from './pages/BlogHubPage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import PortfolioPage from './pages/PortfolioPage.tsx';
import ProjectDetailPage from './pages/ProjectDetailPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ServiceDetailPage from './pages/ServiceDetailPage.tsx';
import AreaDetailPage from './pages/AreaDetailPage.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
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
  // Subtle parallax multiplier of -0.06: the background grid drifts upwards at a slower rate
  const gridY = useTransform(scrollY, [0, 6000], [0, -360]);

  return (
    <Router>
      <ScrollToTop />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="bg-transparent text-white relative"
      >
        <MouseGlow />
        
        {/* Global Blur Elements */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#D4FF00]/5 rounded-full blur-[120px] pointer-events-none z-[0]" />
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4F46E5]/5 rounded-full blur-[150px] pointer-events-none z-[0]" />

        {/* Subtle Noise Texture */}
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Global Architectural Grid Lines */}
        <div 
          className="fixed inset-0 pointer-events-none z-[2] opacity-20"
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
          <ProgressBar />
          <LoadingScreen />
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
          </Routes>
          
          <FooterSection />
          <FloatingWhatsAppButton />
        </div>
      </motion.main>
    </Router>
  );
}

