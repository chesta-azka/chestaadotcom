import { useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useLocation } from 'react-router-dom';

export function useClickTracker() {
  const location = useLocation();

  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest clickable element (button, link, or element with role="button")
      const clickable = target.closest('button, a, [role="button"], input[type="submit"]') as HTMLElement;
      
      if (clickable) {
        const elementId = clickable.id || '';
        const elementText = (clickable.innerText || clickable.textContent || '').trim().substring(0, 100);
        const elementTag = clickable.tagName.toLowerCase();
        const elementHref = clickable.getAttribute('href') || '';
        
        // Only log if there's meaningful identification
        if (elementId || elementText) {
          try {
            await addDoc(collection(db, 'click_telemetry'), {
              elementId,
              elementText,
              elementTag,
              elementHref,
              pagePath: location.pathname,
              timestamp: serverTimestamp(),
              sessionId: sessionStorage.getItem('visitor_session_id') || 'unknown'
            });
          } catch (error) {
            // Silently ignore to prevent console spam and maintain performance
          }
        }
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [location.pathname]);
}
