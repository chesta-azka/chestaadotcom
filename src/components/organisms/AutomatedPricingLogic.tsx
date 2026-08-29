import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, DollarSign, RefreshCcw, Sparkles } from 'lucide-react';

interface PricingParams {
  pages: number;
  complexity: 'basic' | 'standard' | 'complex';
  hasEcommerce: boolean;
  needsSEO: boolean;
  customDesign: boolean;
}

const BASE_PRICE = 2500000;

interface AutomatedPricingLogicProps {
  onEstimateGenerated: (estimate: string, details: string) => void;
  onCancel: () => void;
}

export default function AutomatedPricingLogic({ onEstimateGenerated, onCancel }: AutomatedPricingLogicProps) {
  const [params, setParams] = useState<PricingParams>({
    pages: 1,
    complexity: 'basic',
    hasEcommerce: false,
    needsSEO: false,
    customDesign: false,
  });

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // Pricing Logic
    let currentTotal = BASE_PRICE;
    
    // Pages cost (first page is included in base)
    if (params.pages > 1) {
      currentTotal += (params.pages - 1) * 200000;
    }

    // Complexity
    if (params.complexity === 'standard') currentTotal += 800000;
    if (params.complexity === 'complex') currentTotal += 2500000;

    // Features
    if (params.hasEcommerce) currentTotal += 1500000;
    if (params.needsSEO) currentTotal += 750000;
    if (params.customDesign) currentTotal += 1000000;

    setTotalPrice(currentTotal);
  }, [params]);

  const handleGenerate = () => {
    setIsCalculating(true);
    const toastId = toast.loading('Menghitung estimasi proyek...');
    setTimeout(() => {
      toast.success('Estimasi berhasil dihitung!', { id: toastId });
      setIsCalculating(false);
      const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalPrice);
      const details = `Saya ingin mengkonfirmasi estimasi proyek dengan parameter:\n- Halaman: ${params.pages}\n- Kompleksitas: ${params.complexity}\n- E-Commerce: ${params.hasEcommerce ? 'Ya' : 'Tidak'}\n- SEO Lanjutan: ${params.needsSEO ? 'Ya' : 'Tidak'}\n- Desain Custom Khusus: ${params.customDesign ? 'Ya' : 'Tidak'}`;
      onEstimateGenerated(formattedPrice, details);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white/40 backdrop-blur-2xl text-slate-800 font-sans border border-white/60 shadow-xl shadow-purple-900/5 rounded-3xl overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center gap-2">
        <Calculator size={18} className="text-[#6b21a8]" />
        <h3 className="font-semibold text-sm">Estimasi Otomatis (Mulai Rp2.500.000)</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Pages */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Jumlah Halaman</label>
          <div className="flex items-center gap-3">
            <input 
              type="range" 
              min="1" max="15" 
              value={params.pages} 
              onChange={(e) => setParams({ ...params, pages: parseInt(e.target.value) })}
              className="w-full accent-[#6b21a8]"
            />
            <span className="text-sm font-bold bg-slate-100 px-2.5 py-1 rounded-md">{params.pages}</span>
          </div>
        </div>

        {/* Complexity */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kompleksitas Sistem</label>
          <div className="grid grid-cols-3 gap-2">
            {['basic', 'standard', 'complex'].map((level) => (
              <button
                key={level}
                onClick={() => setParams({ ...params, complexity: level as any })}
                className={`py-2 text-[11px] font-bold uppercase rounded-lg border transition-all ${params.complexity === level ? 'bg-[#6b21a8] text-white border-[#6b21a8]' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fitur Tambahan</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer group">
              <input 
                type="checkbox" 
                checked={params.hasEcommerce} 
                onChange={(e) => setParams({ ...params, hasEcommerce: e.target.checked })}
                className="w-4 h-4 text-[#6b21a8] rounded border-slate-300 focus:ring-[#6b21a8]"
              />
              <span className="group-hover:text-slate-900 transition-colors">Toko Online (E-Commerce)</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer group">
              <input 
                type="checkbox" 
                checked={params.needsSEO} 
                onChange={(e) => setParams({ ...params, needsSEO: e.target.checked })}
                className="w-4 h-4 text-[#6b21a8] rounded border-slate-300 focus:ring-[#6b21a8]"
              />
              <span className="group-hover:text-slate-900 transition-colors">Optimasi SEO Lanjutan</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer group">
              <input 
                type="checkbox" 
                checked={params.customDesign} 
                onChange={(e) => setParams({ ...params, customDesign: e.target.checked })}
                className="w-4 h-4 text-[#6b21a8] rounded border-slate-300 focus:ring-[#6b21a8]"
              />
              <span className="group-hover:text-slate-900 transition-colors">Desain Visual Custom/Premium</span>
            </label>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-purple-800 uppercase">Estimasi</span>
          <span className="text-lg font-display font-bold text-[#6b21a8]">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalPrice)}
          </span>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 flex gap-2">
        <button 
          onClick={onCancel}
          className="flex-1 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
        >
          Kembali
        </button>
        <button 
          onClick={handleGenerate}
          disabled={isCalculating}
          className="flex-[2] py-2.5 text-sm font-semibold text-white bg-[#6b21a8] rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          {isCalculating ? (
            <RefreshCcw size={16} className="animate-spin" />
          ) : (
            <>
              <CheckCircle2 size={16} /> <span>Gunakan Estimasi</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
