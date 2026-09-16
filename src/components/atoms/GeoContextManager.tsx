import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useGeoIntentManager } from '../../hooks/useGeoIntentManager';

export default function GeoContextManager() {
  const geoIntent = useGeoIntentManager();
  const location = useLocation();

  if (!geoIntent.isCustomized) return null;

  // We only want to hyper-localize standard marketing pages, not admin or dashboard
  const isExcluded = ['/admin', '/portal', '/workspace', '/client'].some(path => location.pathname.startsWith(path));
  if (isExcluded) return null;

  // Generate hyper-localized titles based on route or intent
  let localTitle = `IT Solutions & Jasa Pembuatan Website di ${geoIntent.location}`;
  let localDesc = `CHESTAADOTCOM menyediakan layanan IT, pengembangan website performa tinggi, dan AI Automation khusus untuk ekosistem bisnis di ${geoIntent.location}.`;

  if (location.pathname.includes('/blog')) {
    localTitle = `Insight & Artikel Digital Strategy di ${geoIntent.location}`;
  } else if (location.pathname.includes('/layanan') || location.pathname.includes('/services')) {
    localTitle = `Layanan Digital Marketing & Arsitektur Web di ${geoIntent.location}`;
  }

  return (
    <Helmet>
      <title>{localTitle}</title>
      <meta name="description" content={localDesc} />
      <meta name="geo.placename" content={geoIntent.location} />
      <meta name="geo.region" content="ID" />
    </Helmet>
  );
}
