import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, Twitter, MessagesSquare } from 'lucide-react';

interface SelectionState {
  text: string;
  x: number;
  y: number;
  show: boolean;
}

export const TextSelectionToolbar: React.FC = () => {
  const [selection, setSelection] = useState<SelectionState>({ text: '', x: 0, y: 0, show: false });
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const activeSelection = window.getSelection();
      
      if (!activeSelection || activeSelection.isCollapsed) {
        setSelection(prev => ({ ...prev, show: false }));
        return;
      }

      const text = activeSelection.toString().trim();
      if (text.length < 5) {
        // Only show for meaningful selections
        setSelection(prev => ({ ...prev, show: false }));
        return;
      }

      try {
        const range = activeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Ensure the selection is inside the blog content (optional, but good practice)
        // We'll just check if it's not empty for now.
        
        // Calculate position - center horizontally, placed above the selection
        setSelection({
          text,
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
          show: true
        });
        setCopied(false);
      } catch (e) {
        setSelection(prev => ({ ...prev, show: false }));
      }
    };

    const handleMouseUp = () => {
      // Small delay to let double-click selections finish
      setTimeout(handleSelection, 10);
    };

    const handleScroll = () => {
      if (selection.show) {
        handleSelection();
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleMouseUp);
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keyup', handleMouseUp);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [selection.show]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(selection.text);
      setCopied(true);
      setTimeout(() => {
        setSelection(prev => ({ ...prev, show: false }));
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleShareX = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.href;
    const tweetText = `"${selection.text}"\n\nRead more at: ${url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank', 'width=550,height=420');
    setSelection(prev => ({ ...prev, show: false }));
  };

  const handleShareWA = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.href;
    const waText = `Menarik dari CHESTA:\n\n"${selection.text}"\n\nSelengkapnya: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
    setSelection(prev => ({ ...prev, show: false }));
  };

  return (
    <AnimatePresence>
      {selection.show && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed z-[100] flex items-center bg-purple-950 text-white rounded-xl shadow-2xl shadow-purple-900/40 border border-purple-800/50 py-1.5 px-1.5 gap-1 select-none pointer-events-auto"
          style={{
            top: selection.y,
            left: selection.x,
            transform: 'translate(-50%, -100%)',
          }}
          onMouseDown={(e) => {
            // Prevent clearing selection when clicking toolbar
            e.preventDefault();
          }}
        >
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-950 rotate-45 border-r border-b border-purple-800/50 -z-10" />
          
          <button
            onClick={handleShareX}
            className="flex items-center justify-center p-2 rounded-lg hover:bg-purple-800 transition-colors text-purple-200 hover:text-white cursor-pointer group"
            title="Share to X"
          >
            <Twitter size={15} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={handleShareWA}
            className="flex items-center justify-center p-2 rounded-lg hover:bg-purple-800 transition-colors text-purple-200 hover:text-white cursor-pointer group"
            title="Share to WhatsApp"
          >
            <MessagesSquare size={15} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="w-[1px] h-5 bg-purple-800/60 mx-1" />
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-purple-800 transition-colors text-purple-200 hover:text-white cursor-pointer font-sans text-xs font-semibold uppercase tracking-wider"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Tersalin' : 'Copy'}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
