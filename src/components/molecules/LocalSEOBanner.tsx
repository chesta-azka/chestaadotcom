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

  return (
    <AnimatePresence onExitComplete={() => window.dispatchEvent(new Event('resize'))}>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0, height: 'auto' }}
          animate={{ y: 0, opacity: 1, height: 'auto' }}
          exit={{ y: -50, opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-900 text-white px-4 py-2.5 sm:py-3 relative z-50 flex items-center justify-center text-xs sm:text-sm font-sans shadow-xs overflow-hidden"
        >
          <div className="flex items-center justify-center max-w-4xl mx-auto px-6">
            <MapPin className="w-4 h-4 mr-2 text-purple-200 shrink-0" />
            <span className="text-center line-clamp-1 sm:line-clamp-none">
              Kabar Gembira! Kini layanan <strong className="font-semibold text-purple-100">Digital Architect & AI Agentic</strong> kami beroperasi lebih dekat untuk bisnis di <strong className="font-semibold text-white underline decoration-purple-400">{locationName}</strong>.
            </span>
          </div>
          <button 
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
            }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup Banner"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-200" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
