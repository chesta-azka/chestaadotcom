const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Add VerticalDotNav component
const dotNavCode = `
function VerticalDotNav({ sectionIds, activeSection }: { sectionIds: string[], activeSection: number }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
      {sectionIds.map((id, index) => (
        <button
          key={id}
          onClick={() => {
            const hash = '#' + id;
            if(window.history.pushState) {
                window.history.pushState(null, '', hash);
            } else {
                window.location.hash = hash;
            }
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={\`w-3 h-3 rounded-full transition-all duration-300 \${activeSection === index ? 'bg-indigo-600 scale-125 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-slate-300 hover:bg-indigo-400'}\`}
          title={\`Go to \${id}\`}
        />
      ))}
    </div>
  );
}

export default function ServicesPage() {`;

code = code.replace('export default function ServicesPage() {', dotNavCode);

// 2. Insert VerticalDotNav into the page
code = code.replace(
  '<HelmetProvider>',
  '<HelmetProvider>\n      <VerticalDotNav sectionIds={sectionIds} activeSection={activeSection} />'
);

// 3. Update the Compare Modal logic

const regexModal = /<AnimatePresence>\s*\{compareMode && selectedForCompare\.length === 2 && \([\s\S]*?<\/AnimatePresence>/;

const newModalStr = `
          <AnimatePresence>
            {compareMode && selectedForCompare.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} 
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-4 bg-white text-slate-900 px-8 py-4 rounded-full shadow-2xl border border-slate-200"
              >
                <span className="font-medium">{selectedForCompare.length}/2 Dipilih</span>
                <button 
                  disabled={selectedForCompare.length !== 2}
                  onClick={() => document.getElementById('compare-modal-trigger')?.click()}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
                >
                  Bandingkan Sekarang
                </button>
                <button onClick={() => {setCompareMode(false); setSelectedForCompare([]);}} className="text-slate-400 hover:text-slate-600">Batal</button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Hidden trigger for modal to keep state clean */}
          <button id="compare-modal-trigger" className="hidden" onClick={() => {
            const modal = document.getElementById('compare-modal-overlay');
            if (modal) modal.style.display = 'flex';
          }} />

          {/* Actual Compare Modal */}
          <div id="compare-modal-overlay" className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-md hidden items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-2xl font-display font-medium text-slate-900">Perbandingan Analitis Layanan</h3>
                <button 
                  onClick={() => document.getElementById('compare-modal-overlay').style.display = 'none'} 
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-y-auto">
                {selectedForCompare.map(slug => {
                  const svc = SERVICE_DEFINITIONS.find(s => s.slug === slug);
                  const complexity = (svc?.techStack.length || 0) > 4 ? "Tinggi (Enterprise)" : "Menengah (Professional)";
                  const cost = (svc?.techStack.length || 0) > 4 ? "$$$ - Investasi Strategis" : "$$ - Standar Industri";
                  const time = (svc?.techStack.length || 0) > 4 ? "8-12 Minggu" : "4-6 Minggu";
                  
                  return (
                    <div key={slug} className="space-y-8 pt-8 md:pt-0 md:px-8 first:md:pl-0 last:md:pr-0">
                      <div>
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                          {svc?.icon ? <svc.icon size={24} /> : <Code2 size={24} />}
                        </div>
                        <h4 className="text-2xl font-medium text-slate-900 mb-2">{svc?.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{svc?.description}</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimasi Waktu Pengiriman</span>
                          <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                            <Timer size={18} className="text-amber-500" /> {time}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Tingkat Kompleksitas</span>
                          <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                            <Layers size={18} className="text-blue-500" /> {complexity}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Skala Investasi (Cost)</span>
                          <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                            <Target size={18} className="text-emerald-500" /> {cost}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
`;

code = code.replace(regexModal, newModalStr);

// 4. Update the Service cards to have a checkbox
// Find the exact line sequence
const searchCardButton = `<div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">{service.techStack.slice(0,2).join(' • ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button`;

const replaceCardButton = `<div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">{service.techStack.slice(0,2).join(' • ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {compareMode && (
                      <div className="w-6 h-6 border-2 border-indigo-200 rounded flex items-center justify-center bg-white mr-2 transition-colors data-[checked=true]:bg-indigo-600 data-[checked=true]:border-indigo-600" data-checked={selectedForCompare.includes(service.slug)}>
                        {selectedForCompare.includes(service.slug) && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                    )}
                    <button`;

code = code.replace(new RegExp(searchCardButton.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceCardButton);

// Optional: toggleCompare already enforces 2 maximum by overwriting index 0 (or popping). Let's just leave the existing toggle logic.
//   const toggleCompare = (slug: string) => {
//     setSelectedForCompare(prev => {
//       if (prev.includes(slug)) return prev.filter(s => s !== slug);
//       if (prev.length >= 2) return [prev[1], slug];
//       return [...prev, slug];
//     });
//   };
// That logic drops the first and appends the new one. Perfectly limits to 2.

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
