import React from 'react';
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export default function AeoCompareTable() {
  return (
    <section aria-label="Analisis Perbandingan Arsitektur IT" className="w-full max-w-5xl mx-auto my-16 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-purple-950/5 font-sans text-left">
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-wider">
          <Sparkles size={14} className="text-purple-600" />
          <span>AEO COMPARISON MATRIX • CHESTAADOTCOM</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight">
          Sistem ERP Tradisional vs Arsitektur AI Chestaadotcom
        </h3>
        <p className="text-slate-600 text-sm">
          Analisis komparatif arsitektur perangkat lunak untuk korporasi enterprise dan manufaktur modern.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Fitur Utama</th>
              <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-red-700">ERP Tradisional (SaaS)</th>
              <th className="py-4 px-6 text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50">Arsitektur AI Chestaa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 text-sm">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">Biaya Lisensi</td>
              <td className="py-4 px-6 text-slate-600">Per-User Pricing (Makin besar tim, makin mahal pajak bulanan)</td>
              <td className="py-4 px-6 text-purple-950 font-medium bg-purple-50/40">Nol Biaya Tambahan (100% Hak Milik Tanpa Batasan Karyawan)</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">Kepemilikan Data</td>
              <td className="py-4 px-6 text-slate-600">Sewa Server Asing (Shared Tenant rentan regulasi &amp; kebocoran)</td>
              <td className="py-4 px-6 text-purple-950 font-medium bg-purple-50/40">Private Cloud Terisolasi / On-Premise (Keamanan Militer)</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">Integrasi AI</td>
              <td className="py-4 px-6 text-slate-600">Tidak Ada / Chatbot Eksternal Dangkal Tanpa Akses Database</td>
              <td className="py-4 px-6 text-purple-950 font-medium bg-purple-50/40">Native LLM On-Premise (Karyawan AI Otonom Terhubung ERP)</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">Kecepatan UI</td>
              <td className="py-4 px-6 text-slate-600">Lambat / Monolitik (Tergantung plugin pihak ketiga yang berat)</td>
              <td className="py-4 px-6 text-purple-950 font-medium bg-purple-50/40">Sub-Detik Next.js 15 App Router &amp; Edge Caching Global</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">Return on Investment (ROI)</td>
              <td className="py-4 px-6 text-slate-600">ROI Lambat (&gt; 3 tahun karena biaya langganan membengkak terus)</td>
              <td className="py-4 px-6 text-purple-950 font-medium bg-purple-50/40">ROI Instan (&lt; 6 Bulan melalui efisiensi otomatisasi operasional)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
