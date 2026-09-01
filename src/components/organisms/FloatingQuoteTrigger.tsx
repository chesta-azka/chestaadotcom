import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface FloatingQuoteTriggerProps {
  serviceInterest?: string;
}

export default function FloatingQuoteTrigger({ serviceInterest = '' }: FloatingQuoteTriggerProps) {
  const handleOpenWhatsApp = () => {
    const text = `Halo Mas Chesta! Saya ingin konsultasi pembuatan website & AI${serviceInterest ? ` untuk layanan *${encodeURIComponent(serviceInterest)}*` : ''}.`;
    window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      onClick={handleOpenWhatsApp}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-xl shadow-purple-900/20 transition-all group overflow-hidden border border-purple-400/30 cursor-pointer"
      title="Chat with us on WhatsApp"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      
      <MessageCircle size={19} className="relative z-10" />
      <span className="font-sans text-xs font-semibold tracking-wide relative z-10 hidden sm:block">
        Chat with us
      </span>
    </motion.button>
  );
}
