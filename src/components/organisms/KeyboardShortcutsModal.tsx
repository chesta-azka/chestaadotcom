import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Command, ArrowUp, ArrowDown, Search, X, MessageSquare, Moon } from 'lucide-react';

export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const shortcuts = [
    { keys: ['?'], description: 'Show this help dialog' },
    { keys: ['Ctrl/Cmd', 'K'], description: 'Open Command Palette' },
    { keys: ['Esc'], description: 'Close active modal' },
    { keys: ['ArrowUp', 'ArrowDown'], description: 'Navigate Services scroll-snap' },
    { keys: ['T'], description: 'Toggle Dark/Light Mode' },
    { keys: ['H'], description: 'Go to Home' },
    { keys: ['S'], description: 'Go to Services' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-6">
              Keyboard Shortcuts
            </h2>

            <div className="space-y-4">
              {shortcuts.map((shortcut, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">{shortcut.description}</span>
                  <div className="flex items-center gap-1.5">
                    {shortcut.keys.map((key, j) => (
                      <kbd
                        key={j}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono">?</kbd> anywhere to toggle this menu.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
