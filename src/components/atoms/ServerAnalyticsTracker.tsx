'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackServerEvent } from '../../app/actions/track';

export default function ServerAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackServerEvent(location.pathname, navigator.userAgent).catch(err => {
      console.error('Analytics tracking failed:', err);
    });
  }, [location.pathname]);

  return null;
}
