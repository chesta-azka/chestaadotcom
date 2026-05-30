import { Instagram, MessageCircle } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="py-12 bg-transparent text-white/50 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 text-center space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <a href="https://instagram.com/chestadotcom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#D4FF00] transition-colors">
            <Instagram size={16} /> @chestadotcom
          </a>
          <a href="https://wa.me/6282125447232" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#D4FF00] transition-colors">
            <MessageCircle size={16} /> 0821-2544-7232
          </a>
        </div>
        <p className="text-[10px] uppercase tracking-widest font-sans font-medium">© 2026 chestaa.com. All rights reserved.</p>
      </div>
    </footer>
  );
}
