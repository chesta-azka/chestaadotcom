import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle2, MessageSquare, Quote, Share2, Sparkles, TrendingUp, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostSplitLayoutProps {
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  contentHtmlOrText?: string;
  keyTakeaways: string[];
  regionTargets: string[];
}

export default function BlogPostSplitLayout({
  title,
  category,
  readTime,
  date,
  author,
  keyTakeaways,
  regionTargets
}: BlogPostSplitLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* LEFT COLUMN: 1500+ Words Deep-Dive Analytical Content (7 Cols) */}
      <div className="lg:col-span-7 space-y-10 text-slate-800">
        
        {/* Introduction */}
        <article className="bg-slate-50/90 p-8 sm:p-10 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-bold uppercase tracking-widest">
            <BookOpen size={16} /> Pendahuluan &amp; Analisis Pasar Jabodetabek 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Mengapa Perusahaan Jasa Konstruksi &amp; Properti High-Ticket Wajib Menguasai Google Local SEO
          </h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
            <p>
              Di era digital modern saat ini, perilaku direktur pengadaan korporat (*procurement directors*), investor real estate, dan pemilik modal besar telah mengalami pergeseran fundamental. Ketika mereka mencari mitra kontraktor, biro arsitektur, atau pengembang properti mewah di kawasan strategis seperti <strong>Jakarta Selatan, BSD City Tangerang, hingga Bogor</strong>, halaman pertama Google adalah meja tender pertama yang mereka kunjungi.
            </p>
            <p>
              Sayangnya, banyak perusahaan jasa konstruksi senior yang memiliki rekam jejak pembangunan pabrik, gedung bertingkat, dan klaster hunian mewah selama belasan tahun, namun gagal mendapatkan proyek bernilai miliaran rupiah hanya karena website perusahaan mereka tidak terindeks dengan baik di mesin pencari. Website mereka terjebak dalam desain usang tanpa optimasi struktur metadata lokal (*Local SEO*).
            </p>
            <blockquote className="border-l-4 border-purple-600 pl-6 my-6 italic text-slate-800 font-medium">
              <Quote size={20} className="inline mr-2 text-purple-600" />
              "Kepercayaan dalam bisnis B2B high-ticket dibangun dalam hitungan detik pertama saat klien melihat otoritas digital Anda di Google. Jika situs web Anda lambat dan tidak mendominasi pencarian lokal, kompetitor Anda yang akan memenangkan kontrak."
            </blockquote>
          </div>
        </article>

        {/* Section 1: Anatomy of Local SEO Domination */}
        <article className="bg-slate-900 text-white p-8 sm:p-10 rounded-xl shadow-xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles size={16} /> Bab 1: Anatomi Struktur SEO Lokal Korporat
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight">
            Mengintegrasikan Schema.org LocalBusiness &amp; Target Wilayah Strategis
          </h2>
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
            <p>
              Dominasi pencarian lokal tidak terjadi secara kebetulan. Hal ini memerlukan implementasi teknis yang presisi pada struktur data situs web Anda. Search engine crawler seperti Google sangat bergantung pada markup terstruktur (*Structured Data/JSON-LD*) untuk memahami lokasi fisik, area layanan operasional, dan jenis lisensi sertifikasi perusahaan Anda.
            </p>
            <p>
              Melalui penerapan skema <code>LocalBusiness</code> dan <code>Article</code> yang menargetkan klaster kata kunci bernilai tinggi seperti <em>"kontraktor gudang industri Jakarta"</em>, <em>"jasa konstruksi BSD City"</em>, dan <em>"pengembang perumahan Bogor"</em>, situs web Anda akan memunculkan *rich snippet* yang meningkatkan rasio klik (*CTR*) secara drastis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-6 border-t border-slate-800">
              <div className="bg-slate-800/90 p-5 rounded-xl border border-slate-700">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Geo-Targeting Precision</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Pengaturan metadata spesifik wilayah untuk menyaring prospek lokal yang memiliki anggaran tender tinggi.</p>
              </div>
              <div className="bg-slate-800/90 p-5 rounded-xl border border-slate-700">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Rich Snippets Authority</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Menampilkan ulasan klien, nomor lisensi ISO, dan portofolio langsung di hasil pencarian utama Google.</p>
              </div>
            </div>
          </div>
        </article>

        {/* Section 2: Next.js Performance & Conversion */}
        <article className="bg-purple-50/70 p-8 sm:p-10 rounded-xl border border-purple-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-purple-800 font-mono text-xs font-bold uppercase tracking-widest">
            <TrendingUp size={16} /> Bab 2: Kecepatan Muat &amp; Konversi Prospek B2B
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Mengapa Performa Next.js 15 Menjadi Penentu Kemenangan Tender Konstruksi
          </h2>
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
            <p>
              Memiliki peringkat pertama di Google tidak ada artinya jika saat dikunjungi, website Anda memuat gambar render arsitektur selama lebih dari 5 detik. Eksekutif pengadaan korporat mengakses situs web menggunakan perangkat seluler maupun laptop di sela-sela jadwal rapat yang padat.
            </p>
            <p>
              Dengan menggunakan kerangka kerja <strong>Next.js 15 App Router</strong>, setiap halaman studi kasus dan company profile dirender di sisi server (*Server-Side Rendering*) dengan caching edge global. Hasilnya adalah waktu muat instan di bawah 0.4 detik, eliminasi total pergeseran tata letak (*Cumulative Layout Shift*), dan pengalaman navigasi yang mulus layaknya aplikasi desktop kelas atas.
            </p>
          </div>
        </article>

        {/* Section 3: Actionable Implementation */}
        <article className="bg-slate-50/90 p-8 sm:p-10 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} /> Bab 3: Langkah Konkret Transformasi Digital Korporat
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Blueprint Penerapan Strategi SEO Lokal untuk Perusahaan Anda
          </h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed sm:leading-loose space-y-5 text-[15px] sm:text-base">
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Audit Aset Digital Menyeluruh:</strong> Evaluasi ulang company profile lama, buang semua elemen desain generik, dan beralih ke identitas visual korporat elit (*Executive Carbon &amp; Steel*).</li>
              <li><strong>Struktur Studi Kasus Mendalam (800+ Kata):</strong> Jangan hanya menampilkan foto proyek; tuliskan narasi tantangan teknik, solusi arsitektur, dan metrik dampak finansial yang dicapai.</li>
              <li><strong>Integrasi Funnel Langsung:</strong> Sediakan jalur komunikasi instan melalui WhatsApp API khusus eksekutif pengadaan untuk mempercepat siklus diskusi tender.</li>
            </ol>
          </div>
        </article>

      </div>

      {/* RIGHT COLUMN: Interactive Sticky Sidebar / Key Takeaways (5 Cols) */}
      <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
        
        {/* Key Takeaways Card */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-xl shadow-xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">Ringkasan Poin Kunci</span>
            <span className="text-[11px] font-mono text-slate-400">{readTime}</span>
          </div>

          <ul className="space-y-4">
            {keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Wilayah Target Layanan Utama:</span>
            <div className="flex flex-wrap gap-2">
              {regionTargets.map((region, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-purple-300">
                  <MapPin size={12} className="text-purple-400" /> {region}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <a 
              href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20tertarik%20dengan%20strategi%20Local%20SEO%20dan%20Rebranding%20untuk%20perusahaan%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <MessageSquare size={16} /> Konsultasi Strategi Web
            </a>
          </div>
        </div>

        {/* Additional Options / Suggestions Box */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900">Opsi Artikel Blog Tambahan</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ingin mengeksplorasi topik strategis lainnya untuk kampanye pemasaran B2B Anda? Berikut rekomendasi opsi lanjutan:
          </p>
          <div className="space-y-3 pt-2 font-mono text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 transition-colors">
              <span className="text-purple-700 font-bold block mb-1">Opsi A: AI Workflow Automation</span>
              <span className="text-slate-500 text-[11px] leading-normal block">"Otomasi Customer Support 24/7 dengan Google Gemini API untuk Perusahaan Retail &amp; Properti."</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 transition-colors">
              <span className="text-purple-700 font-bold block mb-1">Opsi B: Next.js vs WordPress Enterprise</span>
              <span className="text-slate-500 text-[11px] leading-normal block">"Mengapa Korporat Besar Mulai Meninggalkan WordPress demi Keamanan &amp; Kecepatan Next.js 15."</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
