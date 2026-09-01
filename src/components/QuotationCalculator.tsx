"use client";
import React, { useState, useMemo } from 'react';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const SERVICES = [
  { id: 'promo', name: 'Paket Promo UMKM (Domain .com + Cloud)', minPrice: 540000, maxPrice: 540000 },
  { id: 'nextjs', name: 'Arsitektur Next.js & Company Profile', minPrice: 2500000, maxPrice: 4500000 },
  { id: 'ai', name: 'Integrasi Otomatisasi AI & Realtime Cloud', minPrice: 5500000, maxPrice: 9000000 },
  { id: 'seo', name: 'Optimasi SEO Mendalam & Kecepatan Google', minPrice: 850000, maxPrice: 1800000 },
];

export function QuotationCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['promo']));
  const [companyName, setCompanyName] = useState('');

  const toggleService = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      if (next.size > 1) next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const estimate = useMemo(() => {
    let min = 0;
    let max = 0;
    selected.forEach(id => {
      const service = SERVICES.find(s => s.id === id);
      if (service) {
        min += service.minPrice;
        max += service.maxPrice;
      }
    });
    return { min, max };
  }, [selected]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSendToWhatsApp = () => {
    const selectedNames = Array.from(selected)
      .map(id => SERVICES.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Halo Mas Chesta! Saya telah menghitung estimasi kebutuhan website di website CHESTADOTCOM:%0A%0A• *Layanan Dipilih:* ${encodeURIComponent(selectedNames)}%0A• *Estimasi Biaya:* ${encodeURIComponent(formatRupiah(estimate.min))} - ${encodeURIComponent(formatRupiah(estimate.max))}${companyName ? `%0A• *Nama Usaha / Brand:* ${encodeURIComponent(companyName)}` : ''}%0A%0AMohon konfirmasi alur pemesanannya. Terima kasih!`;

    window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-1 font-sans">
      <div className="relative bg-white border border-purple-100 rounded-3xl shadow-sm p-6 sm:p-8 overflow-hidden">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="text-xs font-mono uppercase font-bold text-purple-900 tracking-wider">
              Kalkulator Estimasi Instan
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Simulasi Biaya Proyek
          </h2>
          <p className="text-slate-500 text-xs font-sans mt-0.5">
            Pilih komponen layanan untuk melihat perkiraan investasi.
          </p>
        </div>

        <div className="space-y-6">
          {/* Service Toggles */}
          <div className="space-y-2.5">
            {SERVICES.map((service) => {
              const isSelected = selected.has(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                    isSelected 
                      ? 'bg-purple-50/60 border-purple-300 shadow-2xs' 
                      : 'bg-white border-slate-200 hover:border-purple-200 text-slate-700'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-purple-950 font-semibold' : 'text-slate-700'}`}>
                    {service.name}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-3 transition-all ${isSelected ? 'bg-purple-900 text-white' : 'border border-slate-300'}`}>
                    <Check size={12} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Price Display */}
          <div className="py-4 px-5 rounded-2xl bg-purple-50/40 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-mono font-bold tracking-wider text-purple-900 uppercase">
                Perkiraan Total Investasi
              </p>
              <div className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-0.5">
                {estimate.min === estimate.max ? (
                  formatRupiah(estimate.min)
                ) : (
                  `${formatRupiah(estimate.min)} - ${formatRupiah(estimate.max)}`
                )}
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-sans">
              *Transparan & 100% Hak Milik
            </span>
          </div>

          {/* Optional Business Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Nama Brand / Usaha (Opsional)
            </label>
            <input 
              type="text" 
              placeholder="Contoh: Toko Kopi Kita / CV Berkah"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2.5 bg-purple-50/20 border border-slate-200 rounded-2xl focus:outline-none focus:border-purple-600 focus:bg-white transition-all text-xs sm:text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Submit via WhatsApp */}
          <button
            type="button"
            onClick={handleSendToWhatsApp}
            className="w-full py-3.5 px-6 bg-purple-900 text-white font-sans font-semibold text-xs sm:text-sm rounded-2xl hover:bg-purple-800 shadow-md shadow-purple-950/5 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <MessageCircle size={16} />
            <span>Kirim Rencana ke WhatsApp</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
