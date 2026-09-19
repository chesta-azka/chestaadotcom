import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Link as LinkIcon, 
  Check, 
  Search, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Code2, 
  ArrowRight, 
  MessageSquare,
  X
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimatedHeading from '../atoms/AnimatedHeading';

interface FAQItem {
  id: string;
  category: 'teknis' | 'biaya' | 'ai' | 'proses';
  q: string;
  a: string;
  badge?: string;
  highlights?: string[];
}

const FAQ_CATEGORIES = [
  { id: 'all', label: 'Semua Pertanyaan' },
  { id: 'teknis', label: 'Layanan & Arsitektur' },
  { id: 'biaya', label: 'Biaya & Garansi' },
  { id: 'ai', label: 'AI & Otomasi Bisnis' },
  { id: 'proses', label: 'Proses & Lokasi' },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'waktu-pengerjaan-proyek',
    category: 'teknis',
    badge: 'Estimasi & Timeline',
    q: 'Berapa lama waktu pengerjaan pembuatan website atau aplikasi sistem di CHESTAADOTCOM?',
    a: 'Timeline pengerjaan disesuaikan dengan skala dan kompleksitas fungsional sistem: untuk Website Korporat & Landing Page Premium membutuhkan waktu 1 hingga 2 minggu; aplikasi web custom (seperti Dashboard Admin, Portal SaaS, atau Integrasi AI) memerlukan waktu 4 hingga 8 minggu. Kami selalu menyepakati Milestone Project terperinci sebelum kick-off sehingga jadwal peluncuran produk Anda terjamin tepat waktu.',
    highlights: [
      'Landing Page & Company Profile: 1–2 minggu',
      'Web App Kustom & SaaS: 4–8 minggu',
      'Update kemajuan mingguan via live staging URL'
    ]
  },
  {
    id: 'nextjs-vs-wordpress',
    category: 'teknis',
    badge: 'Keunggulan Arsitektur',
    q: 'Mengapa CHESTAADOTCOM membangun website dengan Next.js & React kustom, bukan WordPress atau template instan?',
    a: 'Kami mengutamakan keunggulan rekayasa performa tinggi (High-Performance Engineering). Berbeda dari WordPress yang rentan plugin usang, lambat, dan sering mengalami kebocoran keamanan, arsitektur Next.js & React kustom menghasilkan kecepatan load sub-detik (Core Web Vitals skor 95–100), indeks SEO organik yang jauh lebih kuat, ketahanan terhadap traffic lonjakan tinggi, serta tampilan UI unik 100% tanpa batasan tema.',
    highlights: [
      'Skor Core Web Vitals 95–100 Google PageSpeed',
      'Bebas risiko plugin bloating dan kerentanan keamanan CMS jadul',
      'Arsitektur Edge Caching & Serverless terdistribusi'
    ]
  },
  {
    id: 'integrasi-sistem-eksisting',
    category: 'teknis',
    badge: 'Integrasi Sistem',
    q: 'Apakah website atau aplikasi baru dapat diintegrasikan dengan sistem internal, ERP, CRM, atau Payment Gateway yang sudah ada?',
    a: 'Tentu saja. Spesialisasi kami mencakup integrasi sistem pihak ketiga yang kompleks. Kami dapat menghubungkan sistem Anda secara aman dengan ERP korporat (SAP, Odoo), CRM (HubSpot, Salesforce), Payment Gateway resmi Indonesia (Midtrans, Xendit), WhatsApp Cloud Business API, hingga basis data SQL/Cloud eksisting melalui arsitektur RESTful API atau GraphQL yang aman.',
    highlights: [
      'Dukungan API Payment Gateway (Midtrans, Xendit, QRIS)',
      'Sinkronisasi dua arah ke CRM, ERP, & WhatsApp API',
      'Audit keamanan koneksi API dengan autentikasi enkripsi JWT/OAuth'
    ]
  },
  {
    id: 'transparansi-biaya-dan-skema',
    category: 'biaya',
    badge: 'Investasi & Biaya',
    q: 'Bagaimana struktur harga dan skema pembayaran proyek? Apakah ada biaya tersembunyi?',
    a: 'Kami menjunjung tinggi prinsip transparansi harga 100% tanpa biaya tersembunyi. Anda akan menerima dokumen Proposal & Scope of Work (SOW) terperinci yang menjabarkan setiap deliverable secara gamblang. Skema pembayaran biasanya dibagi menjadi termin berbasis progres: Down Payment (DP) 30%–50% di awal, cicilan milestone saat fase demo arsitektur, dan pelunasan final setelah serah terima tuntas dan deployment produksi.',
    highlights: [
      '0% biaya tersembunyi: SOW disepakati di awal',
      'Termin pembayaran fleksibel berbasis milestone progres',
      'Faktur resmi dan tanda terima resmi berbadan hukum'
    ]
  },
  {
    id: 'kepemilikan-source-code',
    category: 'biaya',
    badge: 'Kepemilikan Aset',
    q: 'Apakah saya mendapatkan kepemilikan 100% atas source code dan repositori proyek setelah selesai?',
    a: 'Ya, 100% kepemilikan kode program (source code), repositori GitHub/GitLab, database, aset grafis, dan hak cipta diserahkan seutuhnya kepada Anda tanpa ikatan vendor lock-in. Bisnis Anda memegang kendali penuh atas properti digital yang telah dibangun.',
    highlights: [
      'Akses Repositori Git penuh (GitHub/GitLab)',
      'Dokumentasi arsitektur dan panduan setup lokal disertakan',
      'Bebas dipindahkan ke server atau developer internal Anda kapan saja'
    ]
  },
  {
    id: 'garansi-dan-pemeliharaan',
    category: 'biaya',
    badge: 'Garansi Purna Jual',
    q: 'Apakah ada garansi purna-jual (after-sales warranty) dan pemeliharaan sistem?',
    a: 'Setiap proyek yang kami selesaikan otomatis memperoleh Garansi Bug-Free selama 30 hari secara cuma-cuma setelah peluncuran publik. Jika terjadi anomali teknis atau galat fungsi pada fitur yang telah disepakati, kami menyelesaikannya secara prioritas. Untuk jangka panjang, kami juga menawarkan paket Maintenance & Security Retainer opsional mencakup monitoring performa 24/7, pencadangan data rutin, dan pembaruan berkala.',
    highlights: [
      '30 Hari garansi perbaikan bug & anomali gratis',
      'Service Level Agreement (SLA) respons cepat untuk kendala kritis',
      'Opsi paket pemeliharaan berkala (retainer) fleksibel'
    ]
  },
  {
    id: 'integrasi-agentic-ai',
    category: 'ai',
    badge: 'AI & Automasi',
    q: 'Bagaimana solusi Agentic AI CHESTAADOTCOM membantu meningkatkan efisiensi operasional bisnis kami?',
    a: 'Kami tidak sekadar memasang chatbot umum, melainkan merancang Agen AI yang mampu melakukan pekerjaan otonom: customer service cerdas 24/7 yang mengenali konteks produk perusahaan, otomasi pemrosesan faktur/dokumen digital (OCR cerdas), peringkasan laporan keuangan otomatis, serta asisten cerdas yang terhubung langsung ke basis data operasional tim Anda.',
    highlights: [
      'Automasi penanganan tiket layanan pelanggan hingga 70%',
      'Pemrosesan dokumen otomatis dengan zero-data leakage',
      'Integrasi model AI canggih (Gemini 2.5/3, Claude 3.7, DeepSeek)'
    ]
  },
  {
    id: 'keamanan-privasi-data-ai',
    category: 'ai',
    badge: 'Privasi & Kepatuhan',
    q: 'Apakah data rahasia korporat kami aman dan tidak akan dipakai untuk melatih model AI publik?',
    a: 'Sangat aman. Kami secara eksklusif menggunakan enterprise-tier API endpoints dengan perjanjian kerahasiaan ketat (Zero Data Retention Policy). Artinya, data bisnis, dokumen internal, dan informasi pelanggan Anda tidak pernah disimpan untuk melatih (training) model publik manapun, dilindungi enkripsi TLS 1.3 saat transmisi dan AES-256 saat penyimpanan.',
    highlights: [
      'Zero-Data Retention: Data tidak disimpan sebagai bahan training model',
      'Enkripsi standar industri (TLS 1.3 transit, AES-256 rest)',
      'Perjanjian Kerahasiaan (NDA) resmi sebelum akses data diberikan'
    ]
  },
  {
    id: 'lokasi-layanan-dan-klien-luar-kota',
    category: 'proses',
    badge: 'Wilayah Layanan',
    q: 'Di mana lokasi CHESTAADOTCOM dan apakah melayani klien di luar wilayah Jabodetabek?',
    a: 'CHESTAADOTCOM berpusat di BSD City, Tangerang Selatan (dekat kawasan Cisauk & Gading Serpong). Kami sangat terbuka untuk diskusi tatap muka (in-person meeting) bagi klien di koridor Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi). Kami juga melayani klien dari berbagai kota di Indonesia maupun luar negeri secara efektif melalui konsultasi online via Google Meet, Slack/WhatsApp, dan live preview staging.',
    highlights: [
      'Pertemuan tatap muka di area BSD City, Tangerang, & SCBD Jakarta',
      'Kolaborasi online terstruktur untuk klien luar Jabodetabek & mancanegara',
      'Akses live staging URL untuk memantau progres secara real-time'
    ]
  },
  {
    id: 'langkah-memulai-konsultasi',
    category: 'proses',
    badge: 'Cara Memulai',
    q: 'Bagaimana langkah awal untuk memulai konsultasi dan merekrut CHESTAADOTCOM untuk proyek kami?',
    a: 'Langkah pertama sangat mudah dan tanpa komitmen awal: hubungi kami melalui tombol WhatsApp atau formulir kontak di website ini untuk menjadwalkan Sesi Konsultasi Teknis Gratis (30 Menit). Kami akan mendiskusikan visi bisnis Anda, merekomendasikan arsitektur teknologi paling efisien, dan menyiapkan Proposal Penawaran & Scope of Work resmi dalam waktu 1–2 hari kerja.',
    highlights: [
      'Konsultasi kebutuhan teknis gratis selama 30 menit',
      'Proposal SOW transparan dalam 24–48 jam',
      'Kick-off proyek langsung bersama Lead Engineer'
    ]
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Filtered FAQ items based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      if (!normalizedQuery) return matchCategory;

      const matchQuery = 
        item.q.toLowerCase().includes(normalizedQuery) ||
        item.a.toLowerCase().includes(normalizedQuery) ||
        item.badge?.toLowerCase().includes(normalizedQuery) ||
        item.highlights?.some(h => h.toLowerCase().includes(normalizedQuery));

      return matchCategory && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  // Deep-link hash handling (#faq-id)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const matchedIdx = filteredFaqs.findIndex(faq => faq.id === targetId);
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
  }, [location.hash, filteredFaqs]);

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
      console.error('Failed to copy link: ', err);
    });
  };

  const handleExpandAll = () => {
    if (openIndex === -1) {
      setOpenIndex(0);
    } else {
      // Toggle all closed
      setOpenIndex(null);
    }
  };

  // Structured schema for search engines (FAQPage Schema.org)
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_ITEMS.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <section id="faq-section" aria-label="Frequently Asked Questions" className="w-full py-12 sm:py-16 md:py-20 relative overflow-hidden bg-transparent">
      {/* FAQ Schema for SEO / Rich Snippets */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Block with high-contrast typography and clear intent */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle size={14} className="text-purple-700" />
            <span>Pusat Informasi & Konsultasi</span>
          </div>

          <AnimatedHeading as="h2" className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 mb-4">
            Pertanyaan Yang Sering Diajukan
          </AnimatedHeading>
          <p className="text-slate-600 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            Semua jawaban esensial mengenai biaya investasi, keunggulan arsitektur performa tinggi, proteksi garansi, dan implementasi otomasi AI bisnis Anda.
          </p>
        </div>

        {/* Filter Controls: Search Bar & Category Pills */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(0);
              }}
              placeholder="Cari pertanyaan... (misal: garansi, harga, WordPress, AI, timeline)"
              className="w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                aria-label="Hapus pencarian"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? FAQ_ITEMS.length 
                : FAQ_ITEMS.filter(item => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(0);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-purple-900 text-white shadow-xs font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono ${
                    isActive ? 'bg-purple-800 text-purple-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Metadata & Actions */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>Menampilkan <strong>{filteredFaqs.length}</strong> pertanyaan</span>
          {filteredFaqs.length > 0 && (
            <button
              onClick={handleExpandAll}
              className="text-purple-700 hover:text-purple-900 font-semibold cursor-pointer underline-offset-2 hover:underline"
            >
              {openIndex !== null ? 'Tutup Semua' : 'Buka Pertama'}
            </button>
          )}
        </div>

        {/* Accordion List Container */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-white border border-slate-200">
            <HelpCircle size={32} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-semibold text-slate-800 mb-1">Pertanyaan tidak ditemukan</h3>
            <p className="text-sm text-slate-500 mb-4">
              Tidak ada jawaban yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              Reset Filter & Cari Ulang
            </button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-3.5">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const isCopied = copiedId === faq.id;

              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-purple-300 bg-white shadow-sm ring-1 ring-purple-100' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <div className="w-full p-4 sm:p-5 md:p-6 flex items-start sm:items-center justify-between gap-4 group">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="flex-1 text-left cursor-pointer focus:outline-none pr-2"
                    >
                      {faq.badge && (
                        <span className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase text-purple-800 bg-purple-50 border border-purple-200/60 px-2 py-0.5 rounded-sm mb-2">
                          {faq.badge}
                        </span>
                      )}
                      <h3 className={`text-base sm:text-lg font-display font-bold leading-snug transition-colors ${
                        isOpen ? 'text-purple-900' : 'text-slate-900 group-hover:text-purple-700'
                      }`}>
                        {faq.q}
                      </h3>
                    </button>

                    <div className="flex items-center gap-2 shrink-0 pt-0.5 sm:pt-0">
                      {/* Copy direct link button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(e, faq.id)}
                        title="Salin tautan ke pertanyaan ini"
                        aria-label={`Salin tautan pertanyaan: ${faq.q}`}
                        className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-purple-700 hover:bg-purple-50 transition-colors relative cursor-pointer"
                      >
                        {isCopied ? (
                          <Check size={16} className="text-emerald-600" />
                        ) : (
                          <LinkIcon size={16} />
                        )}
                        
                        {/* Tooltip feedback */}
                        <AnimatePresence>
                          {isCopied && (
                            <motion.span
                              initial={{ opacity: 0, y: 8, scale: 0.9 }}
                              animate={{ opacity: 1, y: -28, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.9 }}
                              className="absolute left-1/2 -translate-x-1/2 -top-1 bg-slate-900 text-white font-mono text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap shadow-md pointer-events-none z-20"
                            >
                              Tersalin!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>

                      {/* Expand / collapse chevron */}
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        aria-label={isOpen ? "Tutup jawaban" : "Buka jawaban"}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                          isOpen ? 'bg-purple-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Accordion Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        role="region"
                        aria-labelledby={faq.id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-2 border-t border-slate-100 text-slate-600 text-sm sm:text-base leading-relaxed font-sans space-y-4">
                          <p>{faq.a}</p>

                          {faq.highlights && faq.highlights.length > 0 && (
                            <div className="pt-2">
                              <div className="p-3.5 sm:p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block font-mono">
                                  Poin Kunci:
                                </span>
                                <ul className="space-y-1.5">
                                  {faq.highlights.map((point, hIdx) => (
                                    <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                                      <Check size={14} className="text-purple-700 shrink-0 mt-0.5" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Clean Consultation Banner for Unanswered Questions (Uncluttered) */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-800/60 border border-purple-600/40 flex items-center justify-center shrink-0 text-purple-200">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-display font-bold text-white mb-1">
                Punya Pertanyaan Spesifik Tentang Bisnis Anda?
              </h4>
              <p className="text-purple-200 text-xs sm:text-sm max-w-xl font-sans leading-relaxed">
                Setiap infrastruktur dan model bisnis memiliki keunikan tersendiri. Konsultasikan kebutuhan teknis, arsitektur website, atau automasi AI Anda langsung bersama Lead Engineer kami.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20IT%20/%20Website%20kami."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-purple-50 font-sans font-bold text-sm transition-all duration-150 flex items-center gap-2 shrink-0 shadow-sm hover:shadow"
          >
            <span>Tanya via WhatsApp</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
