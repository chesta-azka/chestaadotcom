import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, addDoc, serverTimestamp, doc, setDoc, increment } from 'firebase/firestore';
import { db, logAnalyticsEvent } from '../lib/firebase';
import { SearchDocument } from '../lib/searchEngine';

const RECENT_SEARCHES_KEY = 'chesta_recent_search_queries_v1';
const MAX_RECENT_SEARCHES = 6;

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

export function useSearchAnalytics() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const lastLoggedQueryRef = useRef<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // Fallback silently if localStorage blocked
    }
  }, []);

  // Save a search term to local history
  const saveRecentSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed || trimmed.length < 2) return;

    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Remove a single recent search item
  const removeRecentSearch = useCallback((term: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(s => s !== term);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Clear all recent search history
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
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
    saveRecentSearch(cleanQuery || item.title);
    
    const audience = analyzeSearchAudience(cleanQuery || item.title);
    const sessionId = sessionStorage.getItem('visitor_session_id') || `sess-${Date.now()}`;

    // 1. Firebase Analytics event
    logAnalyticsEvent('search_result_click', {
      search_term: cleanQuery || 'direct_palette_click',
      item_id: item.id,
      item_slug: item.slug,
      item_title: item.title,
      item_category: item.category,
      target_path: item.path || '',
      rank_position: rankIndex,
      is_bsd_cisauk: audience.isBsdCisaukAudience,
      intent_type: audience.intentCategory
    });

    // 2. Persistent Firestore telemetry
    try {
      await addDoc(collection(db, 'click_telemetry'), {
        eventType: 'search_result_click',
        elementId: `search-item-${item.id}`,
        elementText: item.title,
        elementTag: 'search_result_card',
        elementHref: item.path || '',
        query: cleanQuery,
        targetSlug: item.slug,
        targetTitle: item.title,
        targetCategory: item.category,
        rankIndex,
        categoryFilter,
        isBsdCisaukAudience: audience.isBsdCisaukAudience,
        intentCategory: audience.intentCategory,
        localityTag: audience.localityTag || 'none',
        pagePath: window.location.pathname,
        sessionId,
        timestamp: serverTimestamp()
      });
    } catch {
      // Silently handle offline/mock state
    }
  }, [saveRecentSearch]);

  return {
    recentSearches,
    saveRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    logSearchQuery,
    logSearchResultClick
  };
}
