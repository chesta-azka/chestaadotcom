import { motion, AnimatePresence } from 'motion/react';
import { X, Check, X as XIcon } from 'lucide-react';

interface ComparePlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComparePlansModal({ isOpen, onClose }: ComparePlansModalProps) {
  const comparisonData = [
    { feature: "Desain UI/UX Kustom", base: "Template", premium: "Kustom (Original)" },
    { feature: "Kecepatan Loading", base: "3-5 detik", premium: "< 1 detik" },
    { feature: "SEO Ready", base: "Dasar", premium: "Advanced / Algoritma 2026" },
    { feature: "Domain & Hosting", base: "Opsional / Bayar", premium: "Gratis (Tahun 1)" },
    { feature: "Integrasi WA", base: "Link Manual", premium: "Terintegrasi Otomatis" },
    { feature: "Dukungan", base: "Email", premium: "Prioritas / WhatsApp" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#06080F]/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-[101] w-[90%] max-w-2xl h-fit max-h-[90vh] bg-[#0D111A] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-display font-medium text-white mb-8">Kenapa Memilih Premium?</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-2 border-b border-white/5 text-xs font-mono text-gray-500 uppercase">
                <div>Fitur</div>
                <div>Paket Standar</div>
                <div className="text-[#D4FF00]">CHESTADOTCOM</div>
              </div>
              {comparisonData.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 items-center">
                  <div className="text-sm text-gray-300 font-sans">{item.feature}</div>
                  <div className="text-xs text-gray-500 font-mono italic">{item.base}</div>
                  <div className="text-xs text-white font-bold font-mono">{item.premium}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
