import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface GeoIntent {
  location: string;
  isCustomized: boolean;
  getLocalizedTitle: (baseTitle: string) => string;
  getLocalizedH1: (baseH1: string) => string;
  getLocalizedDesc: (baseDesc: string) => string;
}

export function useGeoIntentManager(defaultLocation = 'Tangerang Selatan & BSD City'): GeoIntent {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(defaultLocation);
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    // Detect location intent from URL (e.g., ?loc=jakarta-selatan) or referral parameters
    const geoParam = searchParams.get('loc') || searchParams.get('ref_geo');
    
    if (geoParam) {
      // Format slug back to readable text (e.g., jakarta-selatan -> Jakarta Selatan)
      const formattedLoc = geoParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      setLocation(formattedLoc);
      setIsCustomized(true);
      // Persist user location intent for session
      localStorage.setItem('geo_intent_loc', formattedLoc);
    } else {
      const savedLoc = localStorage.getItem('geo_intent_loc');
      if (savedLoc) {
        setLocation(savedLoc);
        setIsCustomized(true);
      }
    }
  }, [searchParams]);

  const getLocalizedTitle = (baseTitle: string) => isCustomized ? `${baseTitle} di ${location}` : baseTitle;
  
  const getLocalizedH1 = (baseH1: string) => isCustomized ? `${baseH1} Area ${location}` : baseH1;
  
  const getLocalizedDesc = (baseDesc: string) => {
    return isCustomized 
      ? `${baseDesc} Layanan dan optimasi khusus untuk bisnis di ${location}.` 
      : baseDesc;
  };
  
  return { location, isCustomized, getLocalizedTitle, getLocalizedH1, getLocalizedDesc };
}
