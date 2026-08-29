import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useVisitorTracker() {
  const location = useLocation();
  const [sessionId] = useState(() => {
    let id = sessionStorage.getItem('visitor_session_id');
    if (!id) {
      id = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem('visitor_session_id', id);
    }
    return id;
  });

  const sourceRef = useRef<string>('');

  useEffect(() => {
    if (!sourceRef.current) {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get('utm_source');
      let finalSource = utmSource || document.referrer || 'Direct';
      
      // Clean up common referrers
      if (finalSource.includes('google.com')) finalSource = 'Google';
      if (finalSource.includes('instagram.com')) finalSource = 'Instagram';
      if (finalSource.includes('facebook.com')) finalSource = 'Facebook';
      if (finalSource.includes('linkedin.com')) finalSource = 'LinkedIn';
      if (finalSource.includes('twitter.com') || finalSource.includes('t.co')) finalSource = 'Twitter';
      if (finalSource === document.location.href) finalSource = 'Direct';

      sourceRef.current = finalSource;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const updatePresence = async () => {
      if (!isMounted) return;
      try {
        const visitorRef = doc(db, 'live_visitors', sessionId);
        await setDoc(visitorRef, {
          session_id: sessionId,
          source: sourceRef.current || 'Direct',
          current_page: location.pathname,
          last_active: serverTimestamp(),
          is_online: true
        }, { merge: true });
      } catch (e) {
        // silently fail tracking to avoid console spam
      }
    };

    // Initial ping on route change
    updatePresence();

    // Setup 5-second interval
    const interval = setInterval(updatePresence, 5000);

    // Attempt offline status on page leave
    const handleBeforeUnload = () => {
      try {
        const visitorRef = doc(db, 'live_visitors', sessionId);
        setDoc(visitorRef, { 
          is_online: false, 
          last_active: serverTimestamp() 
        }, { merge: true });
      } catch (e) {}
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionId, location.pathname]);
}
