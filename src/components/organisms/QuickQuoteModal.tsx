import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceInterest?: string;
}

export default function QuickQuoteModal({ isOpen, onClose, serviceInterest = '' }: QuickQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    interest: serviceInterest || 'Pembuatan Website'
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData(prev => ({ ...prev, interest: serviceInterest || 'Pembuatan Website' }));
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, serviceInterest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Mas Chesta! Saya ingin konsultasi singkat:%0A%0A• *Layanan:* ${encodeURIComponent(formData.interest)}${formData.name ? `%0A• *Nama:* ${encodeURIComponent(formData.name)}` : ''}${formData.notes ? `%0A• *Catatan:* ${encodeURIComponent(formData.notes)}` : ''}%0A%0AMohon informasi ketersediaan & jadwal diskusinya. Terima kasih!`;
    window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-0 sm:bottom-auto sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[440px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-purple-950/10 z-[101] overflow-hidden border border-purple-100 font-sans"
          >
            <div className="bg-purple-50/40 p-5 border-b border-purple-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-slate-900 text-base">Konsultasi Cepat</h3>
                <p className="text-slate-500 text-xs font-sans mt-0.5">Respon langsung 1-on-1 via WhatsApp.</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-100/50 transition-colors"
                title="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Layanan yang Diminati</label>
                <input 
                  type="text" 
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-purple-50/20 focus:bg-white text-slate-900 text-xs sm:text-sm focus:border-purple-600 focus:outline-none transition-all"
                  placeholder="Misal: Paket Promo UMKM Rp540K"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Nama Anda (Opsional)</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-purple-50/20 focus:bg-white text-slate-900 text-xs sm:text-sm focus:border-purple-600 focus:outline-none transition-all"
                  placeholder="Nama atau brand Anda"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Catatan Singkat</label>
                <textarea 
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-purple-50/20 focus:bg-white text-slate-900 text-xs sm:text-sm focus:border-purple-600 focus:outline-none transition-all resize-none"
                  placeholder="Ceritakan gambaran singkat kebutuhan Anda..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-900 text-white font-sans text-xs sm:text-sm font-semibold hover:bg-purple-800 transition-colors shadow-sm cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Buka WhatsApp Sekarang</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
