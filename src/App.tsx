import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { resolveRedirectTarget } from './config/redirects';
import { parseLocalizedPath } from './lib/i18n';
import {
  initUnifiedMotionEngine,
  getActiveLenis,
  prefersReducedMotion,
} from './lib/motion';

import Header from './components/organisms/Header.tsx';
import FooterSection from './components/organisms/FooterSection.tsx';
import StickyMobileWhatsApp from './components/atoms/StickyMobileWhatsApp.tsx';
import SEOMetadata from './components/atoms/SEOMetadata';
import HomePage from './pages/HomePage.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// Code-splitting auxiliary modals (loaded only on user keyboard shortcut interaction)
const CommandPalette = React.lazy(() => import('./components/organisms/CommandPalette.tsx'));
const KeyboardShortcutsModal = React.lazy(() => import('./components/organisms/KeyboardShortcutsModal.tsx'));

// Code-splitting for secondary pages
const BlogHubPage = React.lazy(() => import('./pages/BlogHubPage.tsx'));
const BlogTopicClusterPage = React.lazy(() => import('./pages/BlogTopicClusterPage.tsx'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage.tsx'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage.tsx'));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage.tsx'));
const AboutPage = React.lazy(() => import('./pages/AboutPage.tsx'));
const PricingPage = React.lazy(() => import('./pages/PricingPage.tsx'));
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorksPage.tsx'));
const FAQPage = React.lazy(() => import('./pages/FAQPage.tsx'));
const WorkflowPage = React.lazy(() => import('./pages/WorkflowPage.tsx'));
const AreaDetailPage = React.lazy(() => import('./pages/AreaDetailPage.tsx'));
const AreasHubPage = React.lazy(() => import('./pages/AreasHubPage.tsx'));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage.tsx'));
const ServiceAreaPage = React.lazy(() => import('./pages/ServiceAreaPage.tsx'));
const ProgrammaticServicePage = React.lazy(() => import('./pages/ProgrammaticServicePage.tsx'));
const GlossaryTermPage = React.lazy(() => import('./pages/GlossaryTermPage.tsx'));
const InsightDetailPage = React.lazy(() => import('./pages/InsightDetailPage.tsx'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage.tsx'));
const CaseStudyDetailPage = React.lazy(() => import('./pages/CaseStudyDetailPage.tsx'));
const FreeAuditPage = React.lazy(() => import('./pages/FreeAuditPage.tsx'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage.tsx'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.tsx'));
const TrustCenterPage = React.lazy(() => import('./app/trust/page.tsx'));
const AcademyPage = React.lazy(() => import('./pages/AcademyPage.tsx'));
const AcademyMasterclassPage = React.lazy(() => import('./pages/AcademyMasterclassPage.tsx'));
const AcademyResourcesPage = React.lazy(() => import('./pages/AcademyResourcesPage.tsx'));
const QuizIndexPage = React.lazy(() => import('./pages/QuizIndexPage.tsx'));
const AcademyQuizPage = React.lazy(() => import('./pages/AcademyQuizPage.tsx'));
const OmniAdminDashboard = React.lazy(() => import('./app/admin/page.tsx'));
const AiAuditAdminPage = React.lazy(() => import('./app/admin/ai-audit/page.tsx'));
const ClientPortalPage = React.lazy(() => import('./pages/ClientPortalPage.tsx'));
const DevCoversPage = React.lazy(() => import('./pages/DevCoversPage.tsx'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };
      if (scrollToHash()) return;
      const timer = window.setTimeout(scrollToHash, 140);
      return () => window.clearTimeout(timer);
    }
    const lenis = getActiveLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function ViewTransitionLinkInterceptor() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href]') as
        | HTMLAnchorElement
        | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const rawHref = anchor.getAttribute('href');
      if (
        !rawHref ||
        rawHref.startsWith('#') ||
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') ||
        rawHref.startsWith('http')
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;

      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
      };
      if (!doc.startViewTransition || prefersReducedMotion()) return;

      e.preventDefault();
      const currentLocale = parseLocalizedPath(location.pathname).locale;
      const targetLocale = parseLocalizedPath(url.pathname).locale;
      const isLangSwitch = currentLocale !== targetLocale;

      if (isLangSwitch) {
        document.documentElement.setAttribute('data-lang-switching', 'true');
      }

      const vt = doc.startViewTransition(() => {
        navigate(`${url.pathname}${url.search}${url.hash}`);
      });

      vt.finished.finally(() => {
        document.documentElement.removeAttribute('data-lang-switching');
      });
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [location.pathname, location.search, navigate]);

  return null;
}

const ROUTE_PREFIXES = ['/id', '/en', '', '/ind', '/eng'] as const;

function AppContent() {
  const location = useLocation();

  const redirectTarget = resolveRedirectTarget(location.pathname);
  if (redirectTarget && redirectTarget !== location.pathname) {
    return <Navigate to={redirectTarget} replace />;
  }

  const { cleanPath, barePath } = parseLocalizedPath(location.pathname);
  const hideChrome = /^\/academy\/.+/.test(cleanPath);
  const isHomeRoute = barePath === '/' || barePath === '';

  return (
    <div className="relative w-full flex flex-col overflow-x-clip min-h-screen bg-[#FFFFFF] text-[#17122B]">
      {isHomeRoute && <SEOMetadata />}
      <ViewTransitionLinkInterceptor />

      <div className="relative z-10 flex flex-col flex-1 bg-[#FFFFFF]">
        {!hideChrome && <Header />}

        <div id="app-page-content" className="flex flex-col flex-1">
          <Routes location={location}>
            {ROUTE_PREFIXES.map((prefix) => (
              <React.Fragment key={prefix || 'default'}>
                <Route path={prefix || '/'} element={<HomePage />} />
                <Route path={`${prefix}/blog`} element={<PageWrapper><BlogHubPage /></PageWrapper>} />
                <Route path={`${prefix}/blog/halaman/:page`} element={<PageWrapper><BlogHubPage /></PageWrapper>} />
                <Route path={`${prefix}/blog/page/:page`} element={<PageWrapper><BlogHubPage /></PageWrapper>} />
                <Route path={`${prefix}/blog/topik/:cluster`} element={<PageWrapper><BlogTopicClusterPage /></PageWrapper>} />
                <Route path={`${prefix}/blog/topic/:cluster`} element={<PageWrapper><BlogTopicClusterPage /></PageWrapper>} />
                <Route path={`${prefix}/blog/kategori/:category`} element={<PageWrapper><BlogHubPage /></PageWrapper>} />
                <Route path={`${prefix}/blog/:slug`} element={<PageWrapper><BlogPostPage /></PageWrapper>} />
                <Route path={`${prefix}/portfolio`} element={<PageWrapper><PortfolioPage /></PageWrapper>} />
                <Route path={`${prefix}/portfolio/:slug`} element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/about`} element={<PageWrapper><AboutPage /></PageWrapper>} />
                <Route path={`${prefix}/tentang`} element={<PageWrapper><AboutPage /></PageWrapper>} />
                <Route path={`${prefix}/harga`} element={<PageWrapper><PricingPage /></PageWrapper>} />
                <Route path={`${prefix}/pricing`} element={<PageWrapper><PricingPage /></PageWrapper>} />
                <Route path={`${prefix}/cara-kerja`} element={<PageWrapper><HowItWorksPage /></PageWrapper>} />
                <Route path={`${prefix}/how-it-works`} element={<PageWrapper><HowItWorksPage /></PageWrapper>} />
                <Route path={`${prefix}/faq`} element={<PageWrapper><FAQPage /></PageWrapper>} />
                <Route path={`${prefix}/audit-gratis`} element={<PageWrapper><FreeAuditPage /></PageWrapper>} />
                <Route path={`${prefix}/free-audit`} element={<PageWrapper><FreeAuditPage /></PageWrapper>} />
                <Route path={`${prefix}/privasi`} element={<PageWrapper><PrivacyPage /></PageWrapper>} />
                <Route path={`${prefix}/privacy`} element={<PageWrapper><PrivacyPage /></PageWrapper>} />
                <Route path={`${prefix}/workflow`} element={<PageWrapper><WorkflowPage /></PageWrapper>} />
                <Route path={`${prefix}/academy`} element={<PageWrapper><AcademyPage /></PageWrapper>} />
                <Route path={`${prefix}/academy/resources`} element={<PageWrapper><AcademyResourcesPage /></PageWrapper>} />
                <Route path={`${prefix}/academy/:slug`} element={<PageWrapper><AcademyMasterclassPage /></PageWrapper>} />
                <Route path={`${prefix}/quiz`} element={<PageWrapper><QuizIndexPage /></PageWrapper>} />
                <Route path={`${prefix}/quiz/:moduleId`} element={<PageWrapper><AcademyQuizPage /></PageWrapper>} />
                <Route path={`${prefix}/area`} element={<PageWrapper><AreasHubPage /></PageWrapper>} />
                <Route path={`${prefix}/areas`} element={<PageWrapper><AreasHubPage /></PageWrapper>} />
                <Route path={`${prefix}/area/:areaSlug`} element={<PageWrapper><AreaDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/areas/:areaSlug`} element={<PageWrapper><AreaDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/case-studies`} element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
                <Route path={`${prefix}/case-studies/:slug`} element={<PageWrapper><CaseStudyDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/studi-kasus`} element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
                <Route path={`${prefix}/studi-kasus/:slug`} element={<PageWrapper><CaseStudyDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/trust`} element={<PageWrapper><TrustCenterPage /></PageWrapper>} />
                <Route path={`${prefix}/services`} element={<Navigate to={`${prefix || '/id'}/#layanan`} replace />} />
                <Route path={`${prefix}/layanan`} element={<Navigate to={`${prefix || '/id'}/#layanan`} replace />} />
                <Route path={`${prefix}/jasa`} element={<Navigate to={`${prefix || '/id'}/#layanan`} replace />} />
                <Route path={`${prefix}/jasa/:serviceSlug/:areaSlug`} element={<PageWrapper><ServiceAreaPage /></PageWrapper>} />
                <Route path={`${prefix}/services/:serviceSlug/:areaSlug`} element={<PageWrapper><ServiceAreaPage /></PageWrapper>} />
                <Route path={`${prefix}/layanan/:serviceSlug/:areaSlug`} element={<PageWrapper><ServiceAreaPage /></PageWrapper>} />
                <Route path={`${prefix}/jasa/:slug`} element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/services/:slug`} element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/layanan/:slug`} element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
                <Route path={`${prefix}/industri/:industry`} element={<PageWrapper><ProgrammaticServicePage /></PageWrapper>} />
                <Route path={`${prefix}/industri/:industry/:city`} element={<PageWrapper><ProgrammaticServicePage /></PageWrapper>} />
                <Route path={`${prefix}/kamus-ai-teknologi/:term`} element={<PageWrapper><GlossaryTermPage /></PageWrapper>} />
                <Route path={`${prefix}/insights/:slug`} element={<PageWrapper><InsightDetailPage /></PageWrapper>} />
              </React.Fragment>
            ))}

            <Route path="/admin" element={<PageWrapper><OmniAdminDashboard /></PageWrapper>} />
            <Route path="/admin/ai-audit" element={<PageWrapper><AiAuditAdminPage /></PageWrapper>} />
            <Route path="/portal" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            <Route path="/workspace/:slug" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            <Route path="/client/:slug" element={<PageWrapper><ClientPortalPage /></PageWrapper>} />
            <Route path="/dev/covers" element={<PageWrapper><DevCoversPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>

          {!hideChrome && <FooterSection />}
        </div>
      </div>

      <StickyMobileWhatsApp />
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="flex flex-col flex-1 w-full"
    >
      <React.Suspense
        fallback={<div className="flex-1 min-h-[120vh] bg-[#FFFFFF]" aria-busy="true" />}
      >
        {children}
      </React.Suspense>
    </div>
  );
}

export default function App() {
  const [loadShortcuts, setLoadShortcuts] = useState(false);

  useEffect(() => {
    const cleanup = initUnifiedMotionEngine();
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        setLoadShortcuts(true);
      } else if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        setLoadShortcuts(true);
      }
    };
    window.addEventListener('keydown', onKeyDown, { passive: true });
    return () => {
      cleanup();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <main className="bg-[#FFFFFF] text-[#17122B] relative min-h-screen w-full overflow-x-clip">
        {loadShortcuts && (
          <React.Suspense fallback={null}>
            <CommandPalette />
            <KeyboardShortcutsModal />
          </React.Suspense>
        )}
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </main>
    </Router>
  );
}
