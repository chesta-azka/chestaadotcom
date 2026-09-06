import { FirebaseProvider } from "./contexts/FirebaseContext.tsx";
import { PerformanceProvider } from "./contexts/PerformanceContext.tsx";
import { Toaster } from 'react-hot-toast';
import React from "react";
import { AuthProvider } from './contexts/AuthContext';

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ROUTE_METADATA } from './data/seo-metadata';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';

import WebVitalsTracker from './components/atoms/WebVitalsTracker.tsx';
import CommandPalette from './components/organisms/CommandPalette.tsx';
import Header from './components/organisms/Header.tsx';
import FooterSection from './components/organisms/FooterSection.tsx';
import FloatingAIAssistant from './components/organisms/FloatingAIAssistant.tsx';
import CommLinkAdmin from './components/CommLinkAdmin.tsx';
import LoadingScreen from './components/organisms/LoadingScreen.tsx';
import InteractiveBackground from './components/atoms/InteractiveBackground.tsx';

import HomePage from './pages/HomePage.tsx';
import BlogHubPage from './pages/BlogHubPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';
import PortfolioPage from './pages/PortfolioPage.tsx';
import ProjectDetailPage from './pages/ProjectDetailPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import WorkflowPage from './pages/WorkflowPage.tsx';
import AreaDetailPage from './pages/AreaDetailPage.tsx';
import AcademyPage from './pages/AcademyPage.tsx';
import AcademyMasterclassPage from './pages/AcademyMasterclassPage.tsx';
import AcademyResourcesPage from './pages/AcademyResourcesPage.tsx';

import QuizIndexPage from './pages/QuizIndexPage.tsx';
import AcademyQuizPage from './pages/AcademyQuizPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import ClientPortalPage from './pages/ClientPortalPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import CaseStudiesPage from './pages/CaseStudiesPage.tsx';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage.tsx';

import KeyboardShortcutsModal from './components/organisms/KeyboardShortcutsModal.tsx';

import { useVisitorTracker } from './hooks/useVisitorTracker.ts';
import { useClickTracker } from './hooks/useClickTracker.ts';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';



function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Inner component to use location for AnimatePresence
function AppContent({ appLoaded }: { appLoaded: boolean }) {
  const location = useLocation();
  useVisitorTracker();
  useClickTracker();
  
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
      <LoadingScreen onComplete={() => {}} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={appLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col flex-1"
      >
        {!/^\/academy\/.+/.test(location.pathname) && <Header />}
        
        <AnimatePresence mode="wait">
          <Routes location={location} >
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogHubPage /></PageWrapper>} />
            <Route path="/blog/:slug" element={<PageWrapper><BlogPostPage /></PageWrapper>} />
            <Route path="/portfolio" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
            <Route path="/portfolio/:id" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/workflow" element={<PageWrapper><WorkflowPage /></PageWrapper>} />
            <Route path="/academy" element={<PageWrapper><AcademyPage /></PageWrapper>} />
            <Route path="/academy/resources" element={<PageWrapper><AcademyResourcesPage /></PageWrapper>} />
            <Route path="/academy/:slug" element={<PageWrapper><AcademyMasterclassPage /></PageWrapper>} />
            <Route path="/quiz" element={<PageWrapper><QuizIndexPage /></PageWrapper>} />
            <Route path="/quiz/:moduleId" element={<PageWrapper><AcademyQuizPage /></PageWrapper>} />
            <Route path="/area/:cityName" element={<PageWrapper><AreaDetailPage /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
            <Route path="/portal" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            <Route path="/workspace/:slug" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            <Route path="/client/:slug" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            
            <Route path="/case-studies" element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
            <Route path="/case-studies/:slug" element={<PageWrapper><CaseStudyDetailPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        
        {!/^\/academy\/.+/.test(location.pathname) ? <FooterSection /> : null}
      </motion.div>
      <FloatingAIAssistant isLoaded={appLoaded} />
    </div>
  );
}

// Staggered animation variants for page wrapper content
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
};

// Simple page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentMeta = ROUTE_METADATA[location.pathname] || {
    title: 'ChestaCode | Premium Digital Solutions',
    description: 'Bespoke web applications, AI integration, and enterprise software.'
  };

  return (
    <>
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta property="twitter:title" content={currentMeta.title} />
        <meta property="twitter:description" content={currentMeta.description} />
      </Helmet>
      
      <motion.div
        key={location.pathname}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="flex flex-col flex-1"
      >
        <motion.div variants={itemVariants} className="flex flex-col flex-1">
          {children}
        </motion.div>
      </motion.div>

      {/* Wipe Animations */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-white z-50 origin-bottom pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-black z-50 origin-bottom pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
    </>
  );
}


export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    // Initial hydration signal
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 800);
    
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <HelmetProvider>
    <Router>
      <FirebaseProvider>
      <PerformanceProvider>
      <AuthProvider>
      <ScrollToTop />
      <Analytics />
      <main className="bg-[#fbfbfd] text-gray-900 relative min-h-screen">
        <InteractiveBackground />
        <WebVitalsTracker />
        <CommandPalette />
        
        <ErrorBoundary><AppContent appLoaded={appLoaded} /></ErrorBoundary>
        <CommLinkAdmin />
        <KeyboardShortcutsModal />
        <Toaster position="bottom-left" toastOptions={{ style: { background: "#1e293b", color: "#fff", fontSize: "14px", borderRadius: "12px", fontFamily: "sans-serif" } }} />
      </main>
      </AuthProvider>
      </PerformanceProvider>
      </FirebaseProvider>
    </Router>
    </HelmetProvider>
  );
}
