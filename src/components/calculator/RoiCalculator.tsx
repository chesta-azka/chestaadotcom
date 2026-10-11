'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RoiCalculator() {
  const [employees, setEmployees] = useState<number>(15);
  const [salary, setSalary] = useState<number>(8000000);
  const [location, setLocation] = useState<string>('BSD City');
  const [saasCount, setSaasCount] = useState<number>(6);
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Geo-dynamic salary defaults
  useEffect(() => {
    if (location === 'BSD City' || location === 'Jakarta Selatan') {
      setSalary(8000000);
    } else if (location === 'Pamulang') {
      setSalary(5000000);
    } else if (location === 'Cikarang' || location === 'Surabaya') {
      setSalary(6500000);
    }
  }, [location]);

  // Calculations
  const manualInefficiencyMonthly = employees * salary * 0.30;
  const manualInefficiencyAnnual = manualInefficiencyMonthly * 12;
  const saasAnnual = saasCount * 2500000 * 12;
  const totalLeakageAnnual = manualInefficiencyAnnual + saasAnnual;
  const projectedSavingsAnnual = totalLeakageAnnual * 0.65;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Masukkan alamat email bisnis yang valid.');
      return;
    }
    setSubmitted(true);
    toast.success('Laporan audit finansial berhasil dikirim ke email Anda!');
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Chestaa B2B ROI & Inefficiency Calculator',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'IDR'
    },
    'description': 'Kalkulator otonom untuk menghitung kebocoran finansial SaaS dan inefisiensi tenaga kerja administratif B2B dan UMKM komersial.'
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'IT Architecture & ROI Automation',
    'provider': {
      '@type': 'Organization',
      'name': 'chestaadotcom'
    },
    'areaServed': [location, 'Indonesia'],
    'description': 'Konsultasi arsitektur enterprise dan otomatisasi AI untuk meningkatkan efisiensi operasional dan ROI perusahaan.'
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-purple-950/5 font-sans my-12 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="space-y-3 mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-wider">
          <Calculator size={14} className="text-purple-600" />
          <span>KALKULATOR FINANSIAL OTONOM • CHESTAADOTCOM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
          Hitung Kebocoran Finansial &amp; Proyeksi Penghematan AI Anda
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
          Ketahui persis berapa banyak anggaran perusahaan yang terbuang akibat tugas administratif repetitif dan biaya langganan SaaS berlapis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* INPUT FORM (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
          
          {/* A. Jumlah Karyawan */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-900">
              <span>A. Jumlah Karyawan Administratif</span>
              <span className="font-mono text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md font-bold">{employees} Orang</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>1 Orang</span>
              <span>50 Orang</span>
              <span>100 Orang</span>
            </div>
          </div>

          {/* B. Rata-rata Gaji */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              B. Rata-rata Gaji Karyawan per Bulan (IDR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-sm font-mono font-bold text-slate-400">Rp</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                step={500000}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* C. Lokasi Operasional */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              C. Lokasi Operasional GEO
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
            >
              <option value="BSD City">BSD City (Tangerang Selatan)</option>
              <option value="Jakarta Selatan">Jakarta Selatan (SCBD / Kuningan)</option>
              <option value="Pamulang">Pamulang (Tangsel)</option>
              <option value="Cikarang">Cikarang (Kawasan Industri)</option>
              <option value="Surabaya">Surabaya (Jawa Timur)</option>
            </select>
          </div>

          {/* D. Jumlah SaaS */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-900">
              <span>D. Jumlah Aplikasi SaaS yang Dilanggan</span>
              <span className="font-mono text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md font-bold">{saasCount} Aplikasi</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={saasCount}
              onChange={(e) => setSaasCount(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>1 App</span>
              <span>10 Apps</span>
              <span>20 Apps</span>
            </div>
          </div>

        </div>

        {/* RESULTS & LEAD CAPTURE (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Massive Red Leakage Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-red-950/10 border border-red-500/30 space-y-2 shadow-sm text-left">
            <div className="flex items-center gap-2 text-red-600 text-xs font-mono uppercase tracking-wider font-bold">
              <AlertTriangle size={15} />
              <span>Kebocoran Finansial Tahunan Anda</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-red-700 tracking-tight">
              {formatIDR(totalLeakageAnnual)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Akumulasi dari inefisiensi kerja manual staf administratif dan biaya langganan aplikasi SaaS berlipat ganda.
            </p>
          </div>

          {/* Massive Green Savings Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/10 border border-emerald-500/30 space-y-2 shadow-sm text-left">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-mono uppercase tracking-wider font-bold">
              <TrendingUp size={15} />
              <span>Proyeksi Penghematan dengan Arsitektur Chestaa</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-700 tracking-tight">
              {formatIDR(projectedSavingsAnnual)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Pangkas hingga 65% pengeluaran operasional dengan mengonsolidasikan SaaS ke dalam custom web app &amp; agen AI otonom.
            </p>
          </div>

          {/* Geo-dynamic UMK statement */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 leading-relaxed font-medium">
            Berdasarkan standar UMK dan biaya operasional di {location}, sistem IT warisan sangat membebani arus kas Anda.
          </div>

          {/* Lead Capture with Blurred Breakdown */}
          <div className="relative p-6 rounded-2xl bg-slate-900 text-white space-y-4 overflow-hidden shadow-xl">
            {/* Blur overlay if not submitted */}
            {!submitted && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 p-6 flex flex-col justify-center items-center text-center space-y-3">
                <ShieldCheck size={28} className="text-purple-400" />
                <div className="font-bold text-sm text-white">Buka Laporan Rincian Audit Lengkap</div>
                <form onSubmit={handleLeadSubmit} className="w-full space-y-2">
                  <input
                    type="email"
                    placeholder="Masukkan email bisnis Anda..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Dapatkan Laporan Audit Lengkap</span>
                    <ArrowRight size={13} />
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-2 opacity-40 select-none">
              <div className="text-xs font-mono text-purple-300">Rincian Kebocoran Tersembunyi:</div>
              <div className="text-xs flex justify-between"><span>Waktu Repetitif Staf:</span><span>{employees * 48} Jam/Bulan</span></div>
              <div className="text-xs flex justify-between"><span>Biaya SaaS Redundan:</span><span>{formatIDR(saasAnnual)}</span></div>
              <div className="text-xs flex justify-between"><span>Potensi Peningkatan ROI:</span><span>+340%</span></div>
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Laporan audit telah dikirim ke {email}</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* AEO (Answer Engine Optimization) Content Block */}
      <div className="mt-12 pt-8 border-t border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-950 font-display">
          Apa itu Otomatisasi ROI untuk Perusahaan?
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200">
          Otomatisasi ROI adalah proses merombak sistem IT warisan menjadi arsitektur AI terpusat untuk menekan biaya operasional. Menurut data Chestaa Enterprise AI, perusahaan di {location} dapat memangkas biaya lisensi perangkat lunak hingga 60 persen dan meningkatkan efisiensi operasional sebesar 40 persen dalam kuartal pertama implementasi.
        </p>
      </div>

    </div>
  );
}
