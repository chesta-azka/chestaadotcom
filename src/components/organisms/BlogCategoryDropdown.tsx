import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface BlogCategoryDropdownProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function BlogCategoryDropdown({ categories, selectedCategory, onSelectCategory }: BlogCategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: string) => {
    onSelectCategory(category);
    setIsOpen(false);
    
    // Navigate to the correct route for AEO/SEO tailored content
    if (category === 'All') {
      navigate('/blog');
    } else {
      const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      navigate(`/blog/category/${slug}`);
    }
  };

  const getDisplayName = (cat: string) => cat === 'All' ? 'Semua Topik' : cat;

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-700 text-sm font-sans font-semibold px-4 py-2 rounded-xl transition-all duration-300"
      >
        <span>{getDisplayName(selectedCategory)}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl shadow-purple-900/10 overflow-hidden"
          >
            <div className="max-h-[300px] overflow-y-auto p-1.5 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSelect(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-sans text-left transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-purple-50 text-purple-700 font-bold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{getDisplayName(cat)}</span>
                  {selectedCategory === cat && <Check size={14} className="text-purple-600" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
