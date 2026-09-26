import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_METADATA } from '../data/seo-metadata';

export interface RouteContextInfo {
  path: string;
  title: string;
  description: string;
  category: string;
  serviceName: string;
  pricingTier: string;
}

/**
 * Hook to capture current active path and page metadata without layout shifts.
 */
export function useRouteContext(): RouteContextInfo {
  const location = useLocation();

  return useMemo(() => {
    const path = location.pathname;
    const meta = ROUTE_METADATA[path] || {
      title: document.title || 'CHESTADOTCOM | Arsitek Web & AI',
      description: 'Layanan pengembangan website profesional dan automasi AI.'
    };

    let category = 'General Consulting';
    if (path.includes('blog')) category = 'Editorial & Insights';
    else if (path.includes('portfolio') || path.includes('project')) category = 'Portfolio Showcase';
    else if (path.includes('services') || path.includes('layanan')) category = 'Service Offerings';
    else if (path.includes('about')) category = 'Company Profile';
    else if (path.includes('quiz')) category = 'Interactive Assessment';

    let serviceName = 'Layanan Digital & Web Development Profesional';
    let pricingTier = 'Paket Promo UMKM Rp540K';
    if (path.includes('service') || path.includes('layanan')) {
      serviceName = 'High-Performance Web Systems & Cloud Architecture';
    } else if (path.includes('pricing') || path.includes('quotation')) {
      serviceName = 'Custom Quotation & Tiers Calculator';
    } else if (path.includes('case-study') || path.includes('portfolio')) {
      serviceName = 'Enterprise Case Studies & Portfolio Showcase';
    } else if (path.includes('academy') || path.includes('blog')) {
      serviceName = 'Academy & Tech Insights';
    }

    return {
      path,
      title: meta.title,
      description: meta.description,
      category,
      serviceName,
      pricingTier
    };
  }, [location.pathname]);
}
