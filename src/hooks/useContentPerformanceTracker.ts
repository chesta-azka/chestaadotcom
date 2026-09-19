'use client';

import { useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PerformanceMetrics {
  slug: string;
  scrollDepth: number;
  readTimeSeconds: number;
  isBounce: boolean;
  timestamp: any;
}

export function useContentPerformanceTracker(slug: string) {
  const startTime = useRef<number>(Date.now());
  const maxScroll = useRef<number>(0);
  const interactionOccurred = useRef<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    startTime.current = Date.now();
    maxScroll.current = 0;
    interactionOccurred.current = false;

    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.min(100, Math.round(((scrollTop + winHeight) / docHeight) * 100));
      
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent;
      }
      
      if (!interactionOccurred.current && scrollTop > 100) {
        interactionOccurred.current = true;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        reportMetrics();
      }
    };

    const reportMetrics = async () => {
      const endTime = Date.now();
      const durationSeconds = Math.round((endTime - startTime.current) / 1000);
      
      // If they spent less than 10 seconds and didn't scroll much, it's a bounce
      const isBounce = durationSeconds < 15 && maxScroll.current < 25;

      // Only report if they spent at least 5 seconds or scrolled
      if (durationSeconds > 5 || maxScroll.current > 10) {
        try {
          await addDoc(collection(db, 'content_performance'), {
            slug,
            scrollDepth: maxScroll.current,
            readTimeSeconds: durationSeconds,
            isBounce,
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent,
          });
        } catch (error) {
          console.error('Error reporting performance metrics:', error);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', reportMetrics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', reportMetrics);
      // We don't call reportMetrics here to avoid duplicate reports on component unmount
      // unless we haven't reported yet. But in SPAs, it's better to report on unmount if it's the last view.
      reportMetrics();
    };
  }, [slug]);
}
