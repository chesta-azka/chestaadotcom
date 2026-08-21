import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';

export default function LocalSEOBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [locationName, setLocationName] = useState('Tangerang Raya & Sekitarnya');
  const { cityName } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (cityName) {
      // If we are on an area page, use that city
      setLocationName(cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase());
    } else {
      // Very basic client-side approximation or fallback
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone === 'Asia/Jakarta') {
        // We know it's WIB, we can rotate or show a generic local area
        // to enhance relevance for our target market: BSD and Cisauk
        setLocationName('BSD, Cisauk, dan Jabodetabek');
      }
    }
  }, [cityName, location.pathname]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="w-full bg-indigo-600 text-white px-4 py-3 relative z-50 flex items-center justify-center text-sm font-sans"
      >
        <MapPin className="w-4 h-4 mr-2 text-indigo-200" />
        <span className="text-center">
          Kabar Gembira! Kini layanan <strong>Digital Architect & AI Agentic</strong> kami beroperasi lebih dekat untuk bisnis di <strong>{locationName}</strong>.
        </span>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-indigo-500 rounded-full transition-colors"
          aria-label="Tutup Banner"
        >
          <X className="w-4 h-4 text-indigo-200" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
