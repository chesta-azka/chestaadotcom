import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Zap, ArrowUpRight, BarChart3 } from 'lucide-react';

const dataMonthly = [
  { month: 'Bulan 1', konversiTanpaOpt: 1.8, konversiKami: 3.2, revenueMultiplier: 1.0 },
  { month: 'Bulan 2', konversiTanpaOpt: 1.9, konversiKami: 4.8, revenueMultiplier: 1.6 },
  { month: 'Bulan 3', konversiTanpaOpt: 1.7, konversiKami: 6.5, revenueMultiplier: 2.3 },
  { month: 'Bulan 4', konversiTanpaOpt: 2.0, konversiKami: 8.4, revenueMultiplier: 3.1 },
  { month: 'Bulan 5', konversiTanpaOpt: 1.8, konversiKami: 10.2, revenueMultiplier: 4.0 },
  { month: 'Bulan 6', konversiTanpaOpt: 1.9, konversiKami: 13.5, revenueMultiplier: 5.2 },
];

export default function ServiceROIGraphSection() {
  const [activeMetric, setActiveMetric] = useState<'konversi' | 'revenue'>('konversi');

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <TrendingUp size={16} className="text-purple-700" />
              Data-Driven ROI &amp; Growth Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight mb-3">
              Bagaimana Kecepatan &amp; Arsitektur Menggandakan Penjualan Anda.
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
              Setiap peningkatan 0.5 detik pada kecepatan muat web dan optimalisasi AI terbukti meningkatkan rasio konversi secara eksponensial.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveMetric('konversi')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${activeMetric === 'konversi' ? 'bg-purple-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Rasio Konversi (%)
            </button>
            <button
              onClick={() => setActiveMetric('revenue')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${activeMetric === 'revenue' ? 'bg-purple-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Growth Multiplier (x)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left stats card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">Rata-Rata Klien Kami</span>
              <h3 className="text-4xl font-display font-black text-slate-900 mt-2 mb-3">+350%</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Lonjakan transaksi digital dalam 6 bulan pertama setelah migrasi ke arsitektur web berperforma tinggi CHESTAADOTCOM.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Waktu Muat Rata-rata</span>
                <span className="font-bold text-emerald-600">0.6 Detik (Skor 99)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Bounce Rate Penurunan</span>
                <span className="font-bold text-purple-700">-64.5%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Retensi Pengunjung</span>
                <span className="font-bold text-slate-900">3.8x Lebih Lama</span>
              </div>
            </div>
          </div>

          {/* Right Recharts Visualizer */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="font-display font-bold text-slate-900 text-lg">
                  {activeMetric === 'konversi' ? 'Grafik Perbandingan Rasio Konversi (%)' : 'Grafik Pertumbuhan Multiplier Pendapatan (x)'}
                </h4>
                <p className="text-xs text-slate-500 font-sans mt-0.5">Perbandingan standar agensi konvensional vs CHESTAADOTCOM Enterprise</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-purple-600" />
                  <span className="text-slate-700 font-bold">CHESTAADOTCOM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="text-slate-500">Agensi Lain</span>
                </div>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOur" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6b21a8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6b21a8" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl border border-purple-500/30 text-xs font-sans">
                            <p className="font-mono font-bold text-purple-400 mb-1">{label}</p>
                            <p className="text-slate-200">
                              CHESTAADOTCOM: <strong className="text-emerald-400 font-bold">{payload[1]?.value} {activeMetric === 'konversi' ? '%' : 'x'}</strong>
                            </p>
                            <p className="text-slate-400 mt-0.5">
                              Agensi Biasa: {payload[0]?.value} {activeMetric === 'konversi' ? '%' : 'x'}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={activeMetric === 'konversi' ? 'konversiTanpaOpt' : 'revenueMultiplier'} 
                    stroke="#cbd5e1" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorOther)" 
                    name="Agensi Lain"
                  />
                  <Area 
                    type="monotone" 
                    dataKey={activeMetric === 'konversi' ? 'konversiKami' : 'revenueMultiplier'} 
                    stroke="#6b21a8" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorOur)" 
                    name="CHESTAADOTCOM"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
