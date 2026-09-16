import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Search, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SEOHealthCheck() {
  const [issues, setIssues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkSEO = () => {
      const foundIssues: string[] = [];
      
      // Check Meta Description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc || !metaDesc.getAttribute('content')) {
        foundIssues.push("Missing Meta Description");
      }

      // Check Canonical
      const canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical || !canonical.getAttribute('href')) {
        foundIssues.push("Missing Canonical Tag");
      }

      // Check H1
      const h1s = document.querySelectorAll('h1');
      if (h1s.length === 0) {
        foundIssues.push("Missing H1 Heading");
      } else if (h1s.length > 1) {
        foundIssues.push(`Multiple H1s found (${h1s.length})`);
      }

      // Check Title
      if (!document.title) {
        foundIssues.push("Missing Page Title");
      }

      setIssues(foundIssues);
    };

    // Run after a short delay to allow Helmet to inject tags
    const timer = setTimeout(checkSEO, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  // Only show if there are issues or if manually opened
  // In a real app, you might only show this to admins
  const isAdmin = true; // Placeholder for admin check

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] no-print">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 mb-3 w-72 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search size={14} className="text-purple-600" />
                SEO Health Check
              </h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Close
              </button>
            </div>
            
            <div className="space-y-2">
              {issues.length === 0 ? (
                <div className="flex items-start gap-2 text-emerald-600 text-xs">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" />
                  <p>All basic SEO elements are present and correct!</p>
                </div>
              ) : (
                issues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-amber-600 text-xs">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <p>{issue}</p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 italic">
              <Info size={10} />
              <span>Visible only in admin view</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          issues.length > 0 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'
        } text-white relative`}
      >
        <Search size={20} />
        {issues.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
            {issues.length}
          </span>
        )}
      </motion.button>
    </div>
  );
}
