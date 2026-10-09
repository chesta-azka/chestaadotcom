import { FirebaseProvider } from "./contexts/FirebaseContext.tsx";
import { PerformanceProvider } from "./contexts/PerformanceContext.tsx";
import { Toaster } from 'react-hot-toast';
import React from "react";
import { AuthProvider } from './contexts/AuthContext';

import { motion, AnimatePresence } from 'motion/react';
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
import LiveChatWidget from './components/organisms/LiveChatWidget.tsx';

import CommLinkAdmin from './components/CommLinkAdmin.tsx';
import LoadingScreen from './components/organisms/LoadingScreen.tsx';
import InteractiveBackground from './components/atoms/InteractiveBackground.tsx';
import CustomCursor from './components/atoms/CustomCursor.tsx';

import HomePage from './pages/HomePage.tsx';
import BlogHubPage from './pages/BlogHubPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';
import PortfolioPage from './pages/PortfolioPage.tsx';
import ProjectDetailPage from './pages/ProjectDetailPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import WorkflowPage from './pages/WorkflowPage.tsx';
import AreaDetailPage from './pages/AreaDetailPage.tsx';
import ServicesHubPage from './pages/ServicesHubPage.tsx';
import ServiceDetailPage from './pages/ServiceDetailPage.tsx';
import ProgrammaticServicePage from './pages/ProgrammaticServicePage.tsx';
import GlossaryTermPage from './pages/GlossaryTermPage.tsx';
import InsightDetailPage from './pages/InsightDetailPage.tsx';
import CaseStudiesPage from './pages/CaseStudiesPage.tsx';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import TrustCenterPage from './app/trust/page.tsx';

// Code-splitting for heavy non-critical pages to drastically shrink initial JS bundle
const AcademyPage = React.lazy(() => import('./pages/AcademyPage.tsx'));
const AcademyMasterclassPage = React.lazy(() => import('./pages/AcademyMasterclassPage.tsx'));
const AcademyResourcesPage = React.lazy(() => import('./pages/AcademyResourcesPage.tsx'));
const QuizIndexPage = React.lazy(() => import('./pages/QuizIndexPage.tsx'));
const AcademyQuizPage = React.lazy(() => import('./pages/AcademyQuizPage.tsx'));
const AdminPage = React.lazy(() => import('./pages/AdminPage.tsx'));
const OmniAdminDashboard = React.lazy(() => import('./app/admin/page.tsx'));
const AiAuditAdminPage = React.lazy(() => import('./app/admin/ai-audit/page.tsx'));
const ClientPortalPage = React.lazy(() => import('./pages/ClientPortalPage.tsx'));

import KeyboardShortcutsModal from './components/organisms/KeyboardShortcutsModal.tsx';
import SpecialPromoAlert from './components/organisms/SpecialPromoAlert.tsx';
import ServerAnalyticsTracker from './components/atoms/ServerAnalyticsTracker.tsx';

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

import SEOMetadata from './components/atoms/SEOMetadata';
import PremiumTransition from './components/atoms/PremiumTransition';
import DynamicBreadcrumbSchema from './components/atoms/DynamicBreadcrumbSchema';

// Inner component to use location for AnimatePresence
function AppContent({ appLoaded, onLoadingComplete }: { appLoaded: boolean; onLoadingComplete: () => void }) {
  const location = useLocation();
  useVisitorTracker();
  useClickTracker();
  
  return (
    <div className="relative w-full flex flex-col overflow-x-hidden min-h-screen">
      <ServerAnalyticsTracker />
      <LoadingScreen onComplete={onLoadingComplete} />
      <SpecialPromoAlert />
      
      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col flex-1 bg-[#fbfbfd]"
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
            <Route path="/admin" element={<PageWrapper><OmniAdminDashboard /></PageWrapper>} />
            <Route path="/admin/ai-audit" element={<PageWrapper><AiAuditAdminPage /></PageWrapper>} />
            <Route path="/portal" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            <Route path="/workspace/:slug" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            <Route path="/client/:slug" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            
            <Route path="/case-studies" element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
            <Route path="/case-studies/:slug" element={<PageWrapper><CaseStudyDetailPage /></PageWrapper>} />
            <Route path="/trust" element={<PageWrapper><TrustCenterPage /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><ServicesHubPage /></PageWrapper>} />
            <Route path="/layanan" element={<PageWrapper><ServicesHubPage /></PageWrapper>} />
            <Route path="/services/:industry/:city" element={<PageWrapper><ProgrammaticServicePage /></PageWrapper>} />
            <Route path="/kamus-ai-teknologi/:term" element={<PageWrapper><GlossaryTermPage /></PageWrapper>} />
            <Route path="/insights/:slug" element={<PageWrapper><InsightDetailPage /></PageWrapper>} />
            <Route path="/services/:slug" element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
            <Route path="/layanan/:slug" element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>

        {/* Global Footer */}
        {!/^\/academy\/.+/.test(location.pathname) && <FooterSection />}
      </motion.div>

      <LiveChatWidget />
    </div>
  );
}

// Staggered animation variants for page wrapper content
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

import Breadcrumbs from './components/atoms/Breadcrumbs';

// Simple page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentMeta = ROUTE_METADATA[location.pathname] || {
    title: 'CHESTAA | Studio Arsitektur Web Next.js & Otomasi AI B2B',
    description: 'Jasa pembuatan website performa tinggi, sistem enterprise, dan otomatisasi AI otonom di BSD City, Tangerang & Jakarta.'
  };

  return (
    <>
      <SEOMetadata 
        title={currentMeta.title}
        description={currentMeta.description}
      />
      <DynamicBreadcrumbSchema currentTitle={currentMeta.title} />
      
      <motion.div
        key={location.pathname}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="flex flex-col flex-1"
      >
        {location.pathname !== '/' && (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-3 pb-1">
            <Breadcrumbs currentTitle={currentMeta.title} hideOnHome={true} />
          </div>
        )}
        
        <motion.div variants={itemVariants} className="flex flex-col flex-1 w-full">
          <React.Suspense fallback={
            <div className="flex-1 min-h-[50vh] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
            </div>
          }>
            {children}
          </React.Suspense>
        </motion.div>
      </motion.div>

      <PremiumTransition />
    </>
  );
}


export default function App() {
  const [appLoaded, setAppLoaded] = useState(true);

  useEffect(() => {
    // BUTTERY SMOOTH SCROLL (LENIS)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

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
    <HelmetProvider>
    <Router>
      <FirebaseProvider>
      <PerformanceProvider>
      <AuthProvider>
      <ScrollToTop />
      <Analytics />
      <main className="bg-[#fbfbfd] text-gray-900 relative min-h-screen w-full overflow-x-hidden">
        <InteractiveBackground />
        <WebVitalsTracker />
        <CommandPalette />
        
        <ErrorBoundary><AppContent appLoaded={appLoaded} onLoadingComplete={() => setAppLoaded(true)} /></ErrorBoundary>
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
