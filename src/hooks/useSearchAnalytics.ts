import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, logAnalyticsEvent } from '../lib/firebase';
import { SearchDocument, SearchCategory } from '../lib/searchEngine';
import { ALL_ARTICLES } from '../data/blogData';
import { caseStudyDB } from '../lib/caseStudies';
import { ACADEMY_DATA } from '../data/academyData';
import { SERVICES_DATA } from '../data/servicesData';
import { PROJECTS } from '../data/projects';

export const RECENT_SEARCHES_KEY = 'chesta_recent_search_queries_v1';
export const RECENT_PAGES_KEY = 'chesta_recent_navigated_pages_v1';
export const MAX_RECENT_SEARCHES = 10;
export const MAX_RECENT_PAGES = 10;

export interface NavigatedPageHistory {
  id: string;
  title: string;
  subtitle?: string;
  path: string;
  categoryKey: SearchCategory;
  category: string;
  badge?: string;
  timestamp: number;
}

export interface SearchClickPayload {
  item: SearchDocument;
  query: string;
  rankIndex: number;
  categoryFilter: string;
}

export interface AudienceIntent {
  isBsdCisaukAudience: boolean;
  intentCategory: 'local_bsd_cisauk' | 'b2b_enterprise' | 'umkm_promo' | 'service_inquiry' | 'case_study' | 'blog_knowledge' | 'general';
  localityTag?: string;
}

/**
 * Analyzes search text to detect geographical and commercial intent,
 * particularly for target BSD City & Cisauk audience.
 */
export function analyzeSearchAudience(query: string): AudienceIntent {
  const q = query.toLowerCase().trim();

  const bsdCisaukKeywords = [
    'bsd', 'bsd city', 'cisauk', 'serpong', 'gading serpong', 
    'tangerang', 'tangerang selatan', 'tangsel', 'suradita', 
    'intermoda', 'the icon', 'alaska', 'vanya park', 'navapark'
  ];

  const matchedLocality = bsdCisaukKeywords.find(keyword => q.includes(keyword));
  const isBsdCisauk = !!matchedLocality;

  let intentCategory: AudienceIntent['intentCategory'] = 'general';

  if (isBsdCisauk) {
    intentCategory = 'local_bsd_cisauk';
  } else if (q.includes('saas') || q.includes('enterprise') || q.includes('b2b') || q.includes('next.js') || q.includes('api') || q.includes('arsitektur')) {
    intentCategory = 'b2b_enterprise';
  } else if (q.includes('promo') || q.includes('540') || q.includes('650') || q.includes('murah') || q.includes('paket') || q.includes('diskon')) {
    intentCategory = 'umkm_promo';
  } else if (q.includes('layanan') || q.includes('jasa') || q.includes('harga') || q.includes('bikin web') || q.includes('landing page')) {
    intentCategory = 'service_inquiry';
  } else if (q.includes('portofolio') || q.includes('studi kasus') || q.includes('klien') || q.includes('proyek') || q.includes('hasil')) {
    intentCategory = 'case_study';
  } else if (q.includes('artikel') || q.includes('seo') || q.includes('tutorial') || q.includes('tips') || q.includes('panduan')) {
    intentCategory = 'blog_knowledge';
  }

  return {
    isBsdCisaukAudience: isBsdCisauk,
    intentCategory,
    localityTag: matchedLocality
  };
}

/**
 * Save a search term directly to local storage and sync across listeners
 */
export function saveRecentSearchGlobal(term: string) {
  if (typeof window === 'undefined') return;
  const trimmed = term.trim();
  if (!trimmed || trimmed.length < 2) return;

  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    const prev: string[] = stored ? JSON.parse(stored) : [];
    const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('chesta_history_updated'));
  } catch {}
}

/**
 * Resolve human-friendly page metadata for any application path
 */
export function resolvePageMetadata(pathname: string): {
  id: string;
  title: string;
  subtitle: string;
  categoryKey: SearchCategory;
  category: string;
  badge?: string;
} {
  const cleanPath = pathname.split('?')[0].split('#')[0];

  // Root
  if (cleanPath === '/' || cleanPath === '') {
    return {
      id: 'page_home',
      title: 'Beranda CHESTAADOTCOM',
      subtitle: 'Studio Rekayasa Web, Next.js, & AI BSD City Cisauk',
      categoryKey: 'pages',
      category: 'Halaman',
      badge: 'Utama'
    };
  }

  // Blog Root
  if (cleanPath === '/blog') {
    return {
      id: 'page_blog_hub',
      title: 'Strategic Engineering Journal',
      subtitle: 'Jurnal arsitektur web modern, SEO teknis, & AI',
      categoryKey: 'articles',
      category: 'Artikel & Insight',
      badge: 'Journal'
    };
  }

  // Blog Article Detail
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const foundArticle = ALL_ARTICLES.find(a => a.slug === slug);
    if (foundArticle) {
      return {
        id: `article_${foundArticle.slug}`,
        title: foundArticle.title,
        subtitle: foundArticle.desc || foundArticle.cat,
        categoryKey: 'articles',
        category: 'Artikel & Insight',
        badge: foundArticle.cat
      };
    }
  }

  // Case Studies Root
  if (cleanPath === '/case-studies') {
    return {
      id: 'page_case_studies',
      title: 'Koleksi Studi Kasus Klien',
      subtitle: 'Dampak bisnis nyata, metric flow, & ROI rekayasa web',
      categoryKey: 'portfolio',
      category: 'Studi Kasus & Portofolio',
      badge: 'Studi Kasus'
    };
  }

  // Case Study Detail
  if (cleanPath.startsWith('/case-studies/')) {
    const slug = cleanPath.replace('/case-studies/', '');
    const foundStudy = caseStudyDB.find(s => s.slug === slug);
    if (foundStudy) {
      return {
        id: `casestudy_${foundStudy.id}`,
        title: foundStudy.title,
        subtitle: `${foundStudy.client} • ${foundStudy.impact}`,
        categoryKey: 'portfolio',
        category: 'Studi Kasus & Portofolio',
        badge: foundStudy.impact
      };
    }
  }

  // Academy Root
  if (cleanPath === '/academy') {
    return {
      id: 'page_academy',
      title: 'CHESTAADOTCOM Academy',
      subtitle: 'Masterclass arsitektur web, engineering docs, & simulasi',
      categoryKey: 'articles',
      category: 'Academy & Docs',
      badge: 'Masterclass'
    };
  }

  // Academy Resources
  if (cleanPath === '/academy/resources') {
    return {
      id: 'page_academy_resources',
      title: 'Academy Resources & Cheatsheets',
      subtitle: 'Template arsitektur, checklist deployment, & snippets',
      categoryKey: 'articles',
      category: 'Academy & Docs',
      badge: 'Resources'
    };
  }

  // Academy Masterclass Detail
  if (cleanPath.startsWith('/academy/')) {
    const slug = cleanPath.replace('/academy/', '');
    const foundMasterclass = ACADEMY_DATA.find(a => a.slug === slug);
    if (foundMasterclass) {
      return {
        id: `academy_${foundMasterclass.slug}`,
        title: foundMasterclass.title,
        subtitle: foundMasterclass.desc,
        categoryKey: 'articles',
        category: 'Academy & Docs',
        badge: foundMasterclass.number
      };
    }
  }

  // Portfolio Root
  if (cleanPath === '/portfolio') {
    return {
      id: 'page_portfolio',
      title: 'Portofolio Proyek Terkurasi',
      subtitle: 'Galeri karya web Next.js production-grade & AI integration',
      categoryKey: 'portfolio',
      category: 'Studi Kasus & Portofolio',
      badge: 'Portofolio'
    };
  }

  // Portfolio Detail
  if (cleanPath.startsWith('/portfolio/')) {
    const id = cleanPath.replace('/portfolio/', '');
    const foundProj = PROJECTS.find(p => p.id === id);
    if (foundProj) {
      return {
        id: `proj_${foundProj.id}`,
        title: foundProj.title,
        subtitle: foundProj.description,
        categoryKey: 'portfolio',
        category: 'Studi Kasus & Portofolio',
        badge: foundProj.category
      };
    }
  }

  // Service Detail
  if (cleanPath.startsWith('/layanan/')) {
    const slug = cleanPath.replace('/layanan/', '');
    const serviceInfo = SERVICES_DATA[slug];
    if (serviceInfo) {
      return {
        id: `srv_${slug}`,
        title: serviceInfo.title,
        subtitle: serviceInfo.subtitle || serviceInfo.heroHeadline || 'Layanan rekayasa web',
        categoryKey: 'services',
        category: 'Layanan',
        badge: serviceInfo.badge || 'Layanan'
      };
    }
  }

  // Services Root
  if (cleanPath === '/services') {
    return {
      id: 'page_services',
      title: 'Layanan & Paket Rekayasa Web',
      subtitle: 'Pengembangan web Next.js, AI automation, & SEO BSD',
      categoryKey: 'services',
      category: 'Layanan',
      badge: 'Solusi'
    };
  }

  // Quiz
  if (cleanPath.startsWith('/quiz')) {
    return {
      id: 'page_quiz',
      title: 'Technical Assessment Quiz',
      subtitle: 'Evaluasi pemahaman arsitektur frontend, Next.js, & Firebase',
      categoryKey: 'pages',
      category: 'Fitur',
      badge: 'Asesmen'
    };
  }

  // Area Detail
  if (cleanPath.startsWith('/area/')) {
    const areaParam = cleanPath.replace('/area/', '').split('/')[0];
    const formattedArea = areaParam.charAt(0).toUpperCase() + areaParam.slice(1);
    return {
      id: `area_${areaParam}`,
      title: `Layanan Web Wilayah ${formattedArea}`,
      subtitle: `Optimasi SEO lokal Google Maps & web bisnis ${formattedArea}`,
      categoryKey: 'areas',
      category: 'Wilayah (BSD/Cisauk)',
      badge: 'Lokal'
    };
  }

  // About
  if (cleanPath === '/about') {
    return {
      id: 'page_about',
      title: 'Tentang Studio & Profil Engineering',
      subtitle: 'Standar rekayasa tanpa template & komitmen performa Core Web Vitals',
      categoryKey: 'pages',
      category: 'Halaman',
      badge: 'Profil'
    };
  }

  // Workflow
  if (cleanPath === '/workflow') {
    return {
      id: 'page_workflow',
      title: 'Alur Kerja Rekayasa Web (5 Fase)',
      subtitle: 'Transparansi proses riset, figma high-fidelity, hingga serverless edge',
      categoryKey: 'pages',
      category: 'Halaman',
      badge: 'Metodologi'
    };
  }

  // Fallback
  const cleanTitle = cleanPath.replace(/\//g, ' ').replace(/-/g, ' ').trim();
  return {
    id: `nav_${cleanPath.replace(/[^a-zA-Z0-9]/g, '_')}`,
    title: cleanTitle ? cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1) : 'Halaman Aplikasi',
    subtitle: cleanPath,
    categoryKey: 'pages',
    category: 'Halaman'
  };
}

/**
 * Save a navigated page item to local history and sync across app
 */
export function recordNavigatedPageGlobal(page: {
  id?: string;
  title: string;
  subtitle?: string;
  path: string;
  categoryKey?: SearchCategory;
  category?: string;
  badge?: string;
}) {
  if (typeof window === 'undefined' || !page.title || !page.path) return;
  // Ignore admin / api / telemetry routes
  if (page.path.startsWith('/admin') || page.path.startsWith('/api')) return;

  try {
    const stored = localStorage.getItem(RECENT_PAGES_KEY);
    const prev: NavigatedPageHistory[] = stored ? JSON.parse(stored) : [];
    
    const entry: NavigatedPageHistory = {
      id: page.id || `nav_${page.path.replace(/[^a-zA-Z0-9]/g, '_')}`,
      title: page.title,
      subtitle: page.subtitle || page.path,
      path: page.path,
      categoryKey: page.categoryKey || 'pages',
      category: page.category || 'Halaman',
      badge: page.badge,
      timestamp: Date.now()
    };

    const filtered = prev.filter(p => p.path !== entry.path && p.id !== entry.id);
    const updated = [entry, ...filtered].slice(0, MAX_RECENT_PAGES);
    localStorage.setItem(RECENT_PAGES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('chesta_history_updated'));
  } catch {}
}

export function useSearchAnalytics() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentNavigatedPages, setRecentNavigatedPages] = useState<NavigatedPageHistory[]>([]);
  const lastLoggedQueryRef = useRef<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const refreshFromStorage = useCallback(() => {
    try {
      const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      } else {
        setRecentSearches([]);
      }
      const storedPages = localStorage.getItem(RECENT_PAGES_KEY);
      if (storedPages) {
        setRecentNavigatedPages(JSON.parse(storedPages));
      } else {
        setRecentNavigatedPages([]);
      }
    } catch {
      // Fallback silently if localStorage blocked
    }
  }, []);

  // Initialize and listen for cross-component storage changes
  useEffect(() => {
    refreshFromStorage();

    window.addEventListener('chesta_history_updated', refreshFromStorage);
    window.addEventListener('storage', refreshFromStorage);
    return () => {
      window.removeEventListener('chesta_history_updated', refreshFromStorage);
      window.removeEventListener('storage', refreshFromStorage);
    };
  }, [refreshFromStorage]);

  // Save a search term to local history
  const saveRecentSearch = useCallback((term: string) => {
    saveRecentSearchGlobal(term);
    refreshFromStorage();
  }, [refreshFromStorage]);

  // Save a navigated page item to history
  const saveNavigatedPage = useCallback((item: Partial<NavigatedPageHistory> & { title: string; path: string }) => {
    recordNavigatedPageGlobal({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      path: item.path,
      categoryKey: item.categoryKey,
      category: item.category,
      badge: item.badge
    });
    refreshFromStorage();
  }, [refreshFromStorage]);

  // Remove a single recent search item
  const removeRecentSearch = useCallback((term: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(s => s !== term);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('chesta_history_updated'));
      } catch {}
      return updated;
    });
  }, []);

  // Remove a single navigated page from history
  const removeNavigatedPage = useCallback((idOrPath: string) => {
    setRecentNavigatedPages(prev => {
      const updated = prev.filter(p => p.id !== idOrPath && p.path !== idOrPath);
      try {
        localStorage.setItem(RECENT_PAGES_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('chesta_history_updated'));
      } catch {}
      return updated;
    });
  }, []);

  // Clear recent searches only
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      window.dispatchEvent(new Event('chesta_history_updated'));
    } catch {}
  }, []);

  // Clear recent navigated pages only
  const clearRecentNavigatedPages = useCallback(() => {
    setRecentNavigatedPages([]);
    try {
      localStorage.removeItem(RECENT_PAGES_KEY);
      window.dispatchEvent(new Event('chesta_history_updated'));
    } catch {}
  }, []);

  // Clear all search and navigation history
  const clearAllHistory = useCallback(() => {
    setRecentSearches([]);
    setRecentNavigatedPages([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      localStorage.removeItem(RECENT_PAGES_KEY);
      window.dispatchEvent(new Event('chesta_history_updated'));
    } catch {}
  }, []);

  /**
   * Logs search queries to telemetry with debouncing to avoid excessive writes while typing
   */
  const logSearchQuery = useCallback((query: string, resultsCount: number, categoryFilter: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery || cleanQuery.length < 2 || cleanQuery === lastLoggedQueryRef.current) {
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      lastLoggedQueryRef.current = cleanQuery;
      const audience = analyzeSearchAudience(cleanQuery);
      const sessionId = sessionStorage.getItem('visitor_session_id') || `sess-${Date.now()}`;

      // 1. Firebase Analytics event
      logAnalyticsEvent('search_query', {
        search_term: cleanQuery,
        results_count: resultsCount,
        category: categoryFilter,
        is_bsd_cisauk: audience.isBsdCisaukAudience,
        intent_type: audience.intentCategory
      });

      // 2. Persistent Firestore click & search telemetry logging
      try {
        await addDoc(collection(db, 'click_telemetry'), {
          eventType: 'search_query',
          query: cleanQuery,
          resultsCount,
          categoryFilter,
          isBsdCisaukAudience: audience.isBsdCisaukAudience,
          intentCategory: audience.intentCategory,
          localityTag: audience.localityTag || 'none',
          sessionId,
          pagePath: window.location.pathname,
          timestamp: serverTimestamp()
        });
      } catch {
        // Silently handle offline/mock state
      }
    }, 700);
  }, []);

  /**
   * Tracks click events on search results to identify popular content and conversion paths
   */
  const logSearchResultClick = useCallback(async ({ item, query, rankIndex, categoryFilter }: SearchClickPayload) => {
    const cleanQuery = query.trim();
    if (cleanQuery) {
      saveRecentSearch(cleanQuery);
    }
    // Automatically save navigated page to history
    saveNavigatedPage({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      path: item.path || '/',
      categoryKey: item.categoryKey,
      category: item.category,
      badge: item.badge
    });
    
    const audience = analyzeSearchAudience(cleanQuery || item.title);
    const sessionId = sessionStorage.getItem('visitor_session_id') || `sess-${Date.now()}`;

    // 1. Firebase Analytics event
    logAnalyticsEvent('search_result_click', {
      search_term: cleanQuery || 'direct_palette_click',
      item_id: item.id,
      item_slug: item.slug,
      item_title: item.title,
      item_category: item.category,
      item_path: item.path || '',
      rank_position: rankIndex + 1,
      category_filter: categoryFilter,
      is_bsd_cisauk: audience.isBsdCisaukAudience,
      intent_type: audience.intentCategory
    });

    // 2. Persistent Firestore click telemetry
    try {
      await addDoc(collection(db, 'click_telemetry'), {
        eventType: 'search_result_click',
        query: cleanQuery || 'direct_palette_click',
        itemId: item.id,
        itemSlug: item.slug,
        itemTitle: item.title,
        itemCategory: item.category,
        itemPath: item.path || '',
        rankPosition: rankIndex + 1,
        categoryFilter,
        isBsdCisaukAudience: audience.isBsdCisaukAudience,
        intentCategory: audience.intentCategory,
        localityTag: audience.localityTag || 'none',
        sessionId,
        pagePath: window.location.pathname,
        timestamp: serverTimestamp()
      });
    } catch {
      // Silently continue
    }
  }, [saveRecentSearch, saveNavigatedPage]);

  return {
    recentSearches,
    recentNavigatedPages,
    saveRecentSearch,
    saveNavigatedPage,
    removeRecentSearch,
    removeNavigatedPage,
    clearRecentSearches,
    clearRecentNavigatedPages,
    clearAllHistory,
    logSearchQuery,
    logSearchResultClick
  };
}
