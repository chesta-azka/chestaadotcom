import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/6282125447232', '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-[#D4FF00] p-4 text-[#06080F] shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:shadow-[0_0_30px_rgba(212,255,0,0.5)] transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ 
        scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
      }}
    >
      <MessageCircle size={24} />
      <span className="sr-only">Chat di WhatsApp</span>
    </motion.button>
  );
}
