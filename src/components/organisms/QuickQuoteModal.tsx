import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, ChevronRight } from 'lucide-react';
import { logAnalyticsEvent } from '../../lib/firebase';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceInterest?: string;
}

export default function QuickQuoteModal({ isOpen, onClose, serviceInterest = '' }: QuickQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    interest: serviceInterest
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData(prev => ({ ...prev, interest: serviceInterest }));
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, serviceInterest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logAnalyticsEvent('quick_quote_submit', { service_interest: formData.interest });
    
    const message = `Halo CHESTAADOTCOM, saya tertarik untuk cepat diskusi mengenai:%0A%0A*Layanan:* ${formData.interest}%0A*Nama:* ${formData.name}%0A*Kontak:* ${formData.contact}`;
    window.open(`https://wa.me/6282125447232?text=${message}`, '_blank');
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 sm:bottom-auto sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[480px] bg-white/10 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] z-[101] overflow-hidden border border-white/30 ring-1 ring-white/20"
          >
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-medium text-slate-900 text-xl">Quick Quote</h3>
                <p className="text-slate-500 text-sm font-sans mt-1">Dapatkan estimasi biaya dalam 15 menit.</p>
              </div>
              <button onClick={onClose} className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-slate-500 hover:text-slate-900 transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase">Ketertarikan Layanan</label>
                <input 
                  type="text" 
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-colors text-slate-800"
                  placeholder="Misal: Web Development / AI Agentic"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase">Nama Anda</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-colors text-slate-800"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase">Email / WhatsApp</label>
                <input 
                  required
                  type="text" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-colors text-slate-800"
                  placeholder="0812... / john@company.com"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!formData.name || !formData.contact}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-purple-600/20"
                >
                  <MessageSquare size={16} />
                  Kirim via WhatsApp
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
