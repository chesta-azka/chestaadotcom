import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Link as LinkIcon, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const faqs = [
  { id: 'durasi-pengerjaan', q: 'Berapa lama waktu pengerjaan?', a: 'Biasanya 3-5 hari kerja untuk website standar, tergantung kompleksitas fitur yang diinginkan.' },
  { id: 'domain-hosting', q: 'Apakah harga sudah termasuk domain dan hosting?', a: 'Kami dapat memberikan rekomendasi, namun biaya domain dan hosting biasanya dipisahkan agar Anda memiliki kontrol penuh atas aset digital Anda.' },
  { id: 'sesi-revisi', q: 'Apakah bisa melakukan revisi setelah desain selesai?', a: 'Tentu, paket kami sudah mencakup hingga 2x sesi revisi minor untuk memastikan hasil akhir sesuai dengan ekspektasi Anda.' },
  { id: 'metode-pembayaran', q: 'Bagaimana cara pembayarannya?', a: 'Untuk menjaga komitmen kedua belah pihak, kami menerapkan sistem DP 50% di awal, dan pelunasan sisanya setelah website sudah live dan Anda terima.' },
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
        // Scroll to the element smoothly
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
    e.stopPropagation(); // Prevent toggling the FAQ item open/close
    
    // Construct the direct url
    const directUrl = `${window.location.origin}${window.location.pathname}#${id}`;
    
    navigator.clipboard.writeText(directUrl).then(() => {
      setCopiedId(id);
      // Update hash in URL silently without breaking history or causing aggressive jumps
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
    <section id="faq" className="py-14 md:py-18 bg-transparent relative overflow-hidden">
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none" />
      {/* JSON-LD FAQ Schema Markup for Google rich snippet visibility */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.8, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="mb-16 text-center"
        >
          <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-4">
            07 — F.A.Q
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white animate-fade-in">
            Pertanyaan Umum
          </h2>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isCopied = copiedId === faq.id;
            const isOpen = openIndex === i;
            
            return (
              <motion.div 
                key={faq.id}
                id={faq.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#D4FF00]/40 bg-[#131825]/80 shadow-[0_4px_24px_rgba(212,255,0,0.03)]'
                    : 'border-white/10 bg-[#131825]'
                }`}
              >
                <div
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between py-5 px-6 text-left cursor-pointer transition-colors hover:bg-white/5 group"
                >
                  <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-[#D4FF00]' : 'text-white group-hover:text-white/90'}`}>{faq.q}</span>
                  
                  <div className="flex items-center gap-3">
                    {/* Share Link Button */}
                    <button
                      onClick={(e) => handleCopyLink(e, faq.id)}
                      title="Salin tautan langsung"
                      className="p-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-[#D4FF00] hover:border-[#D4FF00]/20 transition-all cursor-pointer relative"
                    >
                      {isCopied ? (
                        <Check size={14} className="text-[#D4FF00]" />
                      ) : (
                        <LinkIcon size={14} />
                      )}
                      
                      {/* Copied tooltip overlay */}
                      <AnimatePresence>
                        {isCopied && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -28, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.8 }}
                            className="absolute left-1/2 -translate-x-1/2 bg-[#0D111A] border border-[#D4FF00]/30 text-[#D4FF00] font-mono text-[9px] font-bold py-1 px-2 rounded-md whitespace-nowrap shadow-lg pointer-events-none"
                          >
                            LINK TERSALIN!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>

                    {/* Chevron toggler */}
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown className="text-gray-400" />
                    </motion.div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-400 leading-relaxed font-sans border-t border-white/5 pt-4">{faq.a}</p>
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
