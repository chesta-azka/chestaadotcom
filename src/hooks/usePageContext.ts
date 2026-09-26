import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export interface PageContext {
  activeSubPage: string;
  pricingTier: string;
  featureSpecs: string[];
  category: string;
}

export function usePageContext(): PageContext {
  const location = useLocation();

  return useMemo(() => {
    const path = location.pathname;

    if (path.includes('web-development-nextjs')) {
      return {
        activeSubPage: 'Web Development Next.js Enterprise',
        pricingTier: 'Base Package Rp 540.000 | Add-ons: Static Rp250K, Dynamic Rp350K-400K',
        featureSpecs: [
          'Next.js 15 App Router & React 19',
          'Domain .com + Hosting Kilat 1 Tahun',
          'Static Pages (@250K) & Dynamic Pages (@350K-400K)',
          'Core Web Vitals 95+ & Tailwind CSS'
        ],
        category: 'Web Development'
      };
    } else if (path.includes('ai-integration')) {
      return {
        activeSubPage: 'AI & Chatbot Automation',
        pricingTier: 'Mulai Rp 1.500.000 / sistem',
        featureSpecs: [
          'Google Gemini 2.5 / Groq Llama 3 Integration',
          'Contextual Sales Agent 24/7',
          'Lead Scoring & Auto CRM Sync',
          'WhatsApp & Telegram Bot Gateway'
        ],
        category: 'AI Solutions'
      };
    } else if (path.includes('ecommerce-automation')) {
      return {
        activeSubPage: 'E-Commerce & Checkout Automation',
        pricingTier: 'Mulai Rp 1.200.000',
        featureSpecs: [
          'Midtrans / Xendit Payment Gateway',
          'Auto WhatsApp Order Notification',
          'Inventory & Stock Management',
          'Fast Checkout Funnel'
        ],
        category: 'E-Commerce'
      };
    } else if (path.includes('landing-page')) {
      return {
        activeSubPage: 'High-Converting Landing Page',
        pricingTier: 'Rp 750.000 (All-in)',
        featureSpecs: [
          'High Conversion Copywriting Framework',
          'A/B Testing Ready & Analytics Tracking',
          'Lightning Fast Loading Speed',
          'Mobile Optimized Responsive Design'
        ],
        category: 'Marketing'
      };
    } else if (path.includes('portfolio') || path.includes('case-studies')) {
      return {
        activeSubPage: 'Portfolio & Case Studies',
        pricingTier: 'Custom Enterprise / Project Based',
        featureSpecs: [
          'Real-world production case studies',
          'Measured ROI & Performance Metrics',
          'Scalable Microservices Architecture'
        ],
        category: 'Showcase'
      };
    } else if (path.includes('blog') || path.includes('academy')) {
      return {
        activeSubPage: 'Tech Insights & Developer Academy',
        pricingTier: 'Free & Open Source Docs',
        featureSpecs: [
          'Vibe Coding Tutorials & Guides',
          'Next.js & AI Engineering Best Practices',
          'Interactive Developer Quizzes'
        ],
        category: 'Developers'
      };
    } else {
      return {
        activeSubPage: 'CHESTAADOTCOM Homepage',
        pricingTier: 'Paket Promo UMKM Rp 540.000 (Domain + Hosting All-in)',
        featureSpecs: [
          'Paket Base Website: Rp 540.000',
          'Halaman Statis Tambahan: @ Rp 250.000',
          'Halaman Dinamis / CMS: Rp 350.000 - Rp 400.000',
          'Modul Kustom & AI Integrations'
        ],
        category: 'Home'
      };
    }
  }, [location.pathname]);
}
