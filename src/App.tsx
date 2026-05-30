/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
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
        
        {/* Subtle Noise Texture */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Global Architectural Grid Lines */}
        <div className="fixed inset-0 pointer-events-none z-[1] flex justify-center w-full max-w-7xl mx-auto border-x border-white/5">
          <div className="w-1/3 h-full border-r border-white/5 hidden md:block" />
          <div className="w-1/3 h-full border-r border-white/5 hidden md:block" />
          <div className="w-1/3 h-full" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
          <ProgressBar />
          <LoadingScreen />
          <Header />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogHubPage />} />
          </Routes>
          
          <FooterSection />
          <FloatingWhatsAppButton />
        </div>
      </motion.main>
    </Router>
  );
}
