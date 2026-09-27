'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  FileCode, 
  Server, 
  Smartphone, 
  Gauge, 
  Lock, 
  Cpu, 
  Headphones, 
  ArrowRight 
} from 'lucide-react';

interface DeliverableItem {
  title: string;
  desc: string;
  impact: string;
  tag: string;
}

interface SOWCategory {
  id: string;
  name: string;
  icon: any;
  items: DeliverableItem[];
}

const SOW_CATEGORIES: SOWCategory[] = [
  {
    id: 'design',
    name: 'Desain & UI/UX',
    icon: Layers,
    items: [
      {
        title: 'Figma UI Kit & Design Tokens Lengkap',
        desc: 'Komponen visual modular, palet warna, tipografi berhierarki, dan state interaktif siap skala.',
        impact: 'Konsistensi identitas visual brand di semua kanal digital.',
        tag: 'Design System'
      },
      {
        title: 'Desain Responsif Mobile-First',
        desc: 'Tata letak yang dioptimalkan presisi untuk pengalaman navigasi jari satu tangan di smartphone.',
        impact: 'Memaksimalkan konversi 80%+ pengunjung yang datang dari HP.',
        tag: 'UX Research'
      },
      {
        title: 'Wireframe & Psikologi Copywriting B2B',
        desc: 'Struktur alur halaman yang memandu calon klien dari problem recognition ke call-to-action tanpa gesekan.',
        impact: 'Menurunkan bounce rate dan melipatgandakan rasio closing sales.',
        tag: 'Conversion Rate'
      }
    ]
  },
  {
    id: 'engineering',
    name: 'Kode & Arsitektur',
    icon: Code2,
    items: [
      {
        title: 'Next.js 15 App Router Murni',
        desc: 'Pemanfaatan React Server Components (RSC) untuk eliminasi JavaScript payload berat di browser.',
        impact: 'Kecepatan render instan sub-detik bahkan pada koneksi 4G lambat.',
        tag: 'Modern Stack'
      },
      {
        title: '100% Type-Safe TypeScript & Tailwind CSS v4',
        desc: 'Basis kode bersih, terdokumentasi, dan bebas error runtime berkat pengetikan statis ketat.',
        impact: 'Biaya pemeliharaan jangka panjang jauh lebih murah dan mudah dikembangkan.',
        tag: 'Clean Code'
      },
      {
        title: 'Garansi Google Lighthouse 95-100',
        desc: 'Skor sempurna untuk Performance, Accessibility, Best Practices, dan SEO diuji sebelum peluncuran.',
        impact: 'Prioritas ranking organik teratas oleh algoritma Google Search 2026.',
        tag: 'Core Web Vitals'
      },
      {
        title: '100% Hak Milik Repositori Privat GitHub',
        desc: 'Seluruh repositori kode sumber diserahterimakan penuh ke akun organisasi Anda tanpa lisensi sewa.',
        impact: 'Bebas dari vendor lock-in; bisnis Anda memegang kendali penuh.',
        tag: 'Full Ownership'
      }
    ]
  },
  {
    id: 'cloud',
    name: 'Infrastruktur & Cloud',
    icon: Server,
    items: [
      {
        title: 'Vercel Edge Global & Jakarta Edge CDN',
        desc: 'Konten disajikan dari edge point of presence terdekat di Jakarta untuk latensi terendah.',
        impact: 'Waktu muat halaman pertama di bawah 300ms di wilayah Jabodetabek.',
        tag: 'Edge CDN'
      },
      {
        title: 'Keamanan SSL Grade A+ & Proteksi Serangan DDoS',
        desc: 'Enkripsi data HTTPS end-to-end, proteksi header ketat, dan firewall Cloudflare.',
        impact: 'Data pelanggan dan reputasi brand terlindungi dari serangan siber.',
        tag: 'Bank-Grade'
      },
      {
        title: 'Cloud Data Vault dengan Latensi Kueri Milidetik',
        desc: 'Penyimpanan data cloud modern dengan sinkronisasi real-time instan tanpa server lemot.',
        impact: 'Operasional bisnis lancar tanpa lag saat lonjakan traffic tinggi.',
        tag: 'High Availability'
      }
    ]
  },
  {
    id: 'automation',
    name: 'Otomasi & Analitik',
    icon: Cpu,
    items: [
      {
        title: 'Integrasi WhatsApp Direct API & Lead Routing',
        desc: 'Tombol kontak dengan pre-filled message dinamis yang langsung menghubungkan prospek ke admin.',
        impact: 'Calon pelanggan bisa langsung chat tanpa perlu simpan nomor manual.',
        tag: 'Lead Gen'
      },
      {
        title: 'Google Analytics 4 & Search Console Setup',
        desc: 'Pelacakan konversi peristiwa (event tracking), asal traffic, dan indeks kata kunci Google.',
        impact: 'Keputusan marketing berbasis data riil, bukan sekadar tebak-tebakan.',
        tag: 'Analytics'
      },
      {
        title: 'Schema.org JSON-LD Terstruktur Komprehensif',
        desc: 'Metadata mesin pencari otomatis untuk rich snippets Google dan integrasi regional BSD City.',
        impact: 'Tampilan bintang ulasan, harga, dan FAQ langsung di hasil pencarian Google.',
        tag: 'Semantic SEO'
      }
    ]
  },
  {
    id: 'warranty',
    name: 'Garansi & Layanan',
    icon: ShieldCheck,
    items: [
      {
        title: '30 Hari Garansi Bebas Bug Pasca Rilis',
        desc: 'Dukungan perbaikan gratis jika ditemukan anomali atau bug setelah situs resmi live.',
        impact: 'Ketenangan operasional penuh tanpa kekhawatiran biaya tak terduga.',
        tag: 'Zero Risk'
      },
      {
        title: 'Sesi Onboarding & Panduan Operasional Video',
        desc: 'Video tutorial rekaman cara mengubah teks, gambar, dan mengelola pesan masuk secara mandiri.',
        impact: 'Tim internal Anda bisa langsung mengoperasikan sistem tanpa ketergantungan.',
        tag: 'Handover'
      },
      {
        title: 'Jalur Komunikasi VIP Direct Principal Engineer',
        desc: 'Komunikasi langsung via WhatsApp dengan Principal Engineer tanpa perantara account manager.',
        impact: 'Eksekusi teknis kilat dan konsultasi arsitektur langsung dari sumbernya.',
        tag: 'Direct Access'
      }
    ]
  }
];

export default function ServiceDeliverablesSOW() {
  const [activeTab, setActiveTab] = useState<string>('design');

  const currentCategory = SOW_CATEGORIES.find(c => c.id === activeTab) || SOW_CATEGORIES[0];

  return (
    <section className="mb-24" id="deliverables">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <FileCode size={13} className="text-purple-700" />
          <span>Statement of Work &amp; Deliverables</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 tracking-tight">
          Apa Saja yang Anda Dapatkan?
        </h2>
        <p className="text-slate-600 font-sans text-sm sm:text-base mt-3">
          Transparansi mutlak serah terima proyek. Kami memastikan setiap rupiah investasi Anda terwujud dalam bentuk aset digital berkualitas korporat.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {SOW_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-purple-900 text-white shadow-md shadow-purple-900/20 ring-2 ring-purple-400/40'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-purple-300' : 'text-slate-400'} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Deliverable Items Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {currentCategory.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-50 border border-purple-100 text-[10px] font-mono font-bold text-purple-800 uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-sans text-purple-900 font-medium bg-purple-50/60 p-2.5 rounded-xl">
                <Sparkles size={13} className="text-purple-600 shrink-0" />
                <span><strong>Dampak Bisnis:</strong> {item.impact}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Assurance Summary Footer */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600">
        <div className="flex items-center gap-2">
          <Lock size={14} className="text-purple-700" />
          <span><strong>Integritas Kontrak:</strong> Seluruh poin tertuang resmi dalam lembar penugasan kerja proyek.</span>
        </div>
        <span className="text-purple-800 font-bold">100% Source Code Hak Milik Klien</span>
      </div>
    </section>
  );
}
