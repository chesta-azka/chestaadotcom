import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ALL_ARTICLES } from '../../data/blogData';
import { toast } from 'sonner';

export default function FloatingWhatsAppButton() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('general');

  useEffect(() => {
    const handleScroll = () => {
      // If we are on the blog path, don't use hash/section checks
      if (location.pathname.startsWith('/blog')) {
        return;
      }

      const faqEl = document.getElementById('faq');
      const lokasiEl = document.getElementById('lokasi');
      const workEl = document.getElementById('work');
      
      const scrollY = window.scrollY + window.innerHeight / 2;

      if (faqEl && scrollY >= faqEl.offsetTop && scrollY < faqEl.offsetTop + faqEl.offsetHeight) {
        setActiveSection('faq');
      } else if (lokasiEl && scrollY >= lokasiEl.offsetTop && scrollY < lokasiEl.offsetTop + lokasiEl.offsetHeight) {
        setActiveSection('lokasi');
      } else if (workEl && scrollY >= workEl.offsetTop && scrollY < workEl.offsetTop + workEl.offsetHeight) {
        setActiveSection('work');
      } else {
        setActiveSection('general');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once at start
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsExpanded(false); // Collapse when scrolling
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsExpanded(true); // Expand when pause
      }, 1500); // 1.5s pause
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleClick = () => {
    // Determine the base message
    let message = 'Halo chestadotcom, saya tertarik untuk konsultasi pembuatan website premium. Boleh info lebih lanjut?';

    const queryParams = new URLSearchParams(location.search);
    const readSlug = queryParams.get('read');

    if (readSlug) {
      const article = ALL_ARTICLES.find(a => a.slug === readSlug);
      if (article) {
        message = `Halo chestadotcom, saya baru saja selesai membaca artikel "${article.title}" dan ingin berkonsultasi mengenai strategi digital untuk bisnis saya.`;
      }
    } else if (location.pathname.startsWith('/blog')) {
      message = 'Halo chestadotcom, saya sedang berkunjung di Journal Anda dan sangat menyukai analisis strategi digitalnya. Boleh konsultasi lebih lanjut?';
    } else if (activeSection === 'faq') {
      message = 'Saya butuh bantuan website dari halaman FAQ chestadotcom. Boleh dipandu untuk memilih paket yang sesuai?';
    } else if (activeSection === 'lokasi') {
      message = 'Halo chestadotcom, saya berdomisili di sekitar area layanan Anda (Cisauk / BSD / Gading Serpong / Bogor) and ingin menjadwalkan konsultasi offline.';
    } else if (activeSection === 'work') {
      message = 'Halo chestadotcom, saya melihat portofolio Selected Work Anda di website dan tertarik untuk membangun website dengan performa premium serupa.';
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6282125447232?text=${encodedMessage}`, '_blank');
    toast.success("Mengarahkan ke WhatsApp untuk konsultasi...");
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-[#D4FF00] p-4 text-[#06080F] shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:shadow-[0_0_30px_rgba(212,255,0,0.5)] transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ 
        scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
      }}
    >
      <MessageCircle size={24} />
      <motion.span 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        className="font-mono text-xs font-bold uppercase overflow-hidden whitespace-nowrap"
      >
        <span className="ml-3 mr-3">Konsultasi Web</span>
      </motion.span>
    </motion.button>
  );
}

