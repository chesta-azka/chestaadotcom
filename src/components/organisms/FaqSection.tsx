import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Link as LinkIcon, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const faqs = [
  {
    id: 'jasa-pembuatan-website',
    q: 'Berapa lama waktu pembuatan website untuk bisnis atau perusahaan skala menengah di Tangerang?',
    a: 'Proses website development di CHESTAADOTCOM umumnya memakan waktu 4 hingga 8 minggu tergantung pada kompleksitas fitur, integrasi sistem pihak ketiga, dan skala arsitektur. Kami menggunakan teknologi mutakhir (React, Next.js) sehingga setiap tenggat waktu (timeline) dieksekusi secara presisi tinggi, memastikan klien kami di BSD dan Tangerang dapat meluncurkan produk lebih cepat ke pasar.'
  },
  {
    id: 'solusi-it-cisauk-bsd',
    q: 'Apakah CHESTAADOTCOM melayani pembuatan software kustom & Solusi IT di Cisauk, BSD City, dan sekitarnya?',
    a: 'Ya, kami adalah Elite Software House yang berpusat dan beroperasi di wilayah BSD City dan sekitarnya, termasuk Cisauk, Gading Serpong, hingga Jakarta. Kami menyediakan solusi IT end-to-end (hulu ke hilir) mulai dari pengembangan aplikasi web kustom (SaaS), modernisasi sistem usang, hingga implementasi Agentic AI untuk otomasi bisnis.'
  },
  {
    id: 'perbedaan-web-development-biasa',
    q: 'Apa yang membedakan Jasa Web Development CHESTAADOTCOM dengan web agency biasa?',
    a: 'Alih-alih menggunakan template instan atau CMS konvensional (seperti WordPress), CHESTAADOTCOM berfokus pada "High-Performance Custom Web Development". Kami membangun ekosistem digital dari nol menggunakan pendekatan engineering (Next.js, Tailwind, Cloud Server) yang menjamin skor kecepatan sempurna, keamanan tingkat tinggi, dan pondasi arsitektur SEO-ready secara bawaan.'
  },
  {
    id: 'optimasi-seo-lokal',
    q: 'Apakah paket pembuatan website sudah termasuk layanan Optimasi SEO Lokal?',
    a: 'Benar. Kami percaya bahwa website tercanggih pun tidak berguna jika tidak dapat ditemukan oleh target pasar Anda. Semua paket website development kami telah dibekali dengan optimasi SEO On-Page tingkat lanjut, penyematan metadata skema cerdas (Schema Markup), dan geo-targeting untuk mendominasi kata kunci lokal seperti "Solusi IT Cisauk" atau "Jasa Pembuatan Website BSD".'
  },
  {
    id: 'integrasi-ai-solusi',
    q: 'Bagaimana Solusi IT dari CHESTAADOTCOM mengintegrasikan kecerdasan buatan (AI)?',
    a: 'Kami mengintegrasikan agen AI otonom ke dalam perangkat lunak bisnis Anda. Contoh praktisnya meliputi: chatbot pintar untuk menangani dukungan pelanggan B2B secara otomatis (24/7), generator konten dinamis yang memangkas waktu produksi tim marketing Anda, dan sistem AI yang menganalisis serta mengolah data penjualan mentah menjadi insight berharga secara instan.'
  },
  {
    id: 'keamanan-data-layanan',
    q: 'Apakah infrastruktur IT dan website yang Anda bangun aman dari serangan siber?',
    a: 'Sangat aman. Komitmen kami terhadap enterprise-grade security tidak bisa dikompromi. Kami menerapkan praktik pengamanan data terbaik di industri (best practices), arsitektur cloud terenkripsi, manajemen akses IAM yang ketat, dan framework modern tanpa kerentanan usang yang sering menjangkiti CMS open-source tradisional.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const matchedIdx = faqs.findIndex(faq => faq.id === targetId);
      if (matchedIdx !== -1) {
        setOpenIndex(matchedIdx);
        const timer = setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const directUrl = `${window.location.origin}${window.location.pathname}#${id}`;
    
    navigator.clipboard.writeText(directUrl).then(() => {
      setCopiedId(id);
      navigate(`#${id}`, { replace: true });
      const timer = setTimeout(() => {
        setCopiedId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <section id="faq" className="py-8 sm:py-12 md:py-16 bg-transparent relative overflow-hidden flex justify-center items-center w-full">
      {/* Seamless background blending gradients for glassmorphism pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-[100px] pointer-events-none" />

      {/* JSON-LD FAQ Schema Markup for Google rich snippet visibility */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="mx-auto max-w-4xl px-3 sm:px-6 relative z-10 w-full">
        <motion.div 
          variants={{ hidden: { opacity: 0, scale: 0.95, y: 30 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} 
          className="mb-8 sm:mb-14 text-center"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl mx-auto">
            Resolusi strategis atas pertimbangan teknis seputar arsitektur website performa tinggi dan implementasi otomasi AI B2B.
          </p>
        </motion.div>
        
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => {
            const isCopied = copiedId === faq.id;
            const isOpen = openIndex === i;
            
            return (
              <motion.div 
                key={faq.id}
                id={faq.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`border border-slate-200 rounded-none overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-slate-50 shadow-sm'
                    : 'bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  onClick={() => toggleFaq(i)}
                  className="flex flex-wrap sm:flex-nowrap w-full items-center justify-between py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 text-left cursor-pointer group gap-3"
                >
                  <span className={`text-base sm:text-lg font-display font-black transition-colors flex-1 ${isOpen ? 'text-purple-800 font-black' : 'text-slate-900 group-hover:text-purple-600'}`}>
                    {faq.q}
                  </span>
                  
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-center ml-auto">
                    {/* Share Link Button */}
                    <button
                      onClick={(e) => handleCopyLink(e, faq.id)}
                      title="Salin tautan langsung"
                      className="p-1.5 sm:p-2 rounded-full border border-slate-200/70 bg-white/70 text-slate-600 hover:text-purple-600 hover:bg-white transition-all cursor-pointer relative"
                    >
                      {isCopied ? (
                        <Check strokeWidth={1.5} size={15} className="text-purple-600" />
                      ) : (
                        <LinkIcon strokeWidth={1.5} size={15} />
                      )}
                      
                      {/* Copied tooltip overlay */}
                      <AnimatePresence>
                        {isCopied && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -32, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.8 }}
                            className="absolute left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white font-mono text-[9px] font-bold py-1 px-2 rounded-md whitespace-nowrap shadow-lg pointer-events-none z-10"
                          >
                            LINK TERSALIN!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>

                    {/* Chevron toggler */}
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-purple-600 text-white shadow-2xs' : 'bg-slate-100/80 text-slate-600 shadow-2xs'}`}>
                      <ChevronDown strokeWidth={1.5} size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-7 text-slate-600 leading-relaxed font-sans text-xs sm:text-sm md:text-[15px] pt-1 border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
