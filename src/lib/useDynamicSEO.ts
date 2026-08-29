import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useLocation } from 'react-router-dom';

/**
 * Utility hook to dynamically fetch SEO metadata from Firestore
 * mapping the current path to a Firestore document id.
 */
export function useDynamicSEO(defaultTitle: string, defaultDesc: string, defaultOgImage: string = 'https://chestaadotcom.com/default-og.png') {
  const location = useLocation();
  const [seo, setSeo] = useState({
    title: defaultTitle,
    description: defaultDesc,
    ogImage: defaultOgImage
  });

  useEffect(() => {
    // Reset to defaults when route changes
    setSeo({
      title: defaultTitle,
      description: defaultDesc,
      ogImage: defaultOgImage
    });
    
    const fetchDynamicSEO = async () => {
      try {
        const docId = location.pathname === '/' ? 'home' : location.pathname.replace(/\//g, '_');
        const docRef = doc(db, 'seo_settings', docId);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          const data = snap.data();
          setSeo(prev => ({
            title: data.title || prev.title,
            description: data.description || prev.description,
            ogImage: data.ogImage || prev.ogImage
          }));
        }
      } catch (err: any) {
        // Fallback to default SEO if offline or permission denied
        if (err.message && err.message.includes('offline')) {
          console.warn("Firestore is offline. Using default SEO metadata.");
        } else {
          console.warn("Failed to fetch dynamic SEO (using defaults):", err.message);
        }
      }
    };
    
    fetchDynamicSEO();
  }, [location.pathname, defaultTitle, defaultDesc]);

  return seo;
}
