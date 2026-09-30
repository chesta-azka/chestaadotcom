import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { db } from './firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

export const adminDb = db;

export interface CachedArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  coverImage: string;
  seoDescription: string;
  content: string;
}

export const getCachedInsightArticle = unstable_cache(
  async (slug: string): Promise<CachedArticle | null> => {
    try {
      const q = query(collection(db, 'insights'), where('slug', '==', slug), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      const data = snapshot.docs[0].data() as CachedArticle;
      return data;
    } catch (err) {
      return null;
    }
  },
  ['insight-article-cache'],
  { revalidate: 86400, tags: ['insights'] }
);

export const getCachedAllInsights = unstable_cache(
  async (): Promise<CachedArticle[]> => {
    try {
      const snapshot = await getDocs(collection(db, 'insights'));
      return snapshot.docs.map(doc => doc.data() as CachedArticle);
    } catch (err) {
      return [];
    }
  },
  ['all-insights-cache'],
  { revalidate: 86400, tags: ['insights'] }
);

export const getPseoTargets = unstable_cache(
  async () => {
    try {
      const industries = ['enterprise', 'fintech', 'logistik', 'e-commerce', 'saas', 'properti', 'manufaktur'];
      const cities = ['jakarta', 'tangerang', 'bsd-city', 'surabaya', 'bandung', 'medan', 'bali'];
      return { industries, cities };
    } catch (err) {
      return { industries: [], cities: [] };
    }
  },
  ['pseo-targets-cache'],
  { revalidate: 86400, tags: ['pseo'] }
);

export const getGlossaryTerm = unstable_cache(
  async (term: string) => {
    try {
      const q = query(collection(db, 'glossary'), where('term', '==', term), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      return snapshot.docs[0].data();
    } catch (err) {
      return null;
    }
  },
  ['glossary-term-cache'],
  { revalidate: 86400, tags: ['glossary'] }
);

export const getAllGlossarySlugs = unstable_cache(
  async () => {
    try {
      const snapshot = await getDocs(collection(db, 'glossary'));
      return snapshot.docs.map(doc => ({ term: doc.data().term }));
    } catch (err) {
      return [];
    }
  },
  ['all-glossary-slugs-cache'],
  { revalidate: 86400, tags: ['glossary'] }
);
