import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Link as LinkIcon, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const faqs = [
  { 
    id: 'durasi-pengerjaan', 
    q: 'Berapa lama waktu pengembangan arsitektur B2B dan integrasi AI?', 
    a: 'Untuk website enterprise dan landing page B2B berkonversi tinggi, rata-rata memakan waktu 2-4 minggu. Integrasi Agentic AI dan sistem otomasi backend biasanya membutuhkan tambahan waktu 1-2 minggu tergantung pada kompleksitas alur kerja operasional bisnis Anda.' 
  },
  { 
    id: 'keunggulan-ai', 
    q: 'Apa keunggulan Agentic AI dibandingkan chatbot konvensional?', 
    a: 'Chatbot konvensional hanya merespons berdasarkan skrip yang kaku. Agentic AI kami didesain untuk memahami konteks secara semantik, melakukan tindakan otonom (seperti kualifikasi prospek atau penjadwalan), dan beradaptasi dengan kebutuhan klien B2B Anda secara real-time 24/7 tanpa henti.' 
  },
  { 
    id: 'strategi-seo', 
    q: 'Bagaimana strategi Local SEO untuk area BSD, Cisauk, dan sekitarnya?', 
    a: 'Kami mengimplementasikan arsitektur Generative Engine Optimization (GEO) dan schema markup tingkat lanjut (JSON-LD LocalBusiness). Ini memastikan algoritma mesin pencari mengidentifikasi infrastruktur digital Anda sebagai otoritas utama secara presisi di area target Anda.' 
  },
  { 
    id: 'keamanan-data', 
    q: 'Apakah infrastruktur web yang dibangun aman untuk data Enterprise?', 
    a: 'Sangat aman. Kami menerapkan protokol keamanan tingkat enterprise, teknologi Edge computing, dan enkripsi data standar industri. Setiap arsitektur dirancang secara khusus untuk menangani beban trafik tinggi (High-Performance) tanpa mengorbankan keamanan dan privasi data klien Anda.' 
  },
  { 
    id: 'layanan-maintenance', 
    q: 'Apakah CHESTAADOTCOM menyediakan layanan pemeliharaan proaktif?', 
    a: 'Tentu. Kami menyediakan dukungan proaktif pasca-peluncuran. Ini mencakup pemantauan uptime 24/7, pembaruan keamanan, optimasi performa berkelanjutan, serta fine-tuning alur kerja AI agar infrastruktur bisnis digital Anda selalu beroperasi pada performa puncak.' 
  },
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
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
           className="mb-8 sm:mb-14 text-center"
        >
          <span className="text-purple-600 font-mono font-bold text-xs uppercase tracking-widest block mb-3">
            07 — F.A.Q & JAWABAN TEKNIS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-slate-900 mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-white/40 backdrop-blur-2xl border-white/60 shadow-xl shadow-purple-900/5'
                    : 'bg-white/20 backdrop-blur-xl border-white/40 hover:bg-white/40 hover:border-white/60 shadow-sm'
                }`}
              >
                <div
                  onClick={() => toggleFaq(i)}
                  className="flex flex-wrap sm:flex-nowrap w-full items-center justify-between py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 text-left cursor-pointer group gap-3"
                >
                  <span className={`text-base sm:text-lg font-display font-medium transition-colors flex-1 ${isOpen ? 'text-purple-800 font-semibold' : 'text-slate-900 group-hover:text-purple-600'}`}>
                    {faq.q}
                  </span>
                  
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-center ml-auto">
                    {/* Share Link Button */}
                    <button
                      onClick={(e) => handleCopyLink(e, faq.id)}
                      title="Salin tautan langsung"
                      className="p-1.5 sm:p-2 rounded-full border border-slate-200/70 bg-white/70 text-slate-500 hover:text-purple-600 hover:bg-white transition-all cursor-pointer relative"
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
