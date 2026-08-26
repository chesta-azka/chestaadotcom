const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Add imports Lightbulb, Link as LinkIcon
code = code.replace(
  'Timer, Pin\n} from \'lucide-react\';',
  'Timer, Pin, Lightbulb, Link as LinkIcon\n} from \'lucide-react\';'
);

// 2. Add ExpertInsightBox component before default export
const expertInsightCode = `
const EXPERT_INSIGHTS = [
  "Fokus pada aksesibilitas meningkatkan retensi pengguna hingga 30%.",
  "Arsitektur headless memastikan skalabilitas tanpa batas di era cloud.",
  "Penggunaan edge caching mengurangi latency response hingga 80%.",
  "Komponen berbasis sistem desain memangkas waktu iterasi UI sebesar 50%.",
  "Integrasi AI pada microservices mempercepat decision-making di backend."
];

function ExpertInsightBox({ serviceSlug }: { serviceSlug: string }) {
  const [idx, setIdx] = useState(0);
  
  // Deterministic seed based on slug to stagger animations slightly
  useEffect(() => {
    const seed = serviceSlug.charCodeAt(0) % EXPERT_INSIGHTS.length;
    setIdx(seed);
    const timer = setInterval(() => {
      setIdx(prev => (prev + 1) % EXPERT_INSIGHTS.length);
    }, 4000 + (seed * 500));
    return () => clearInterval(timer);
  }, [serviceSlug]);

  return (
    <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
        <Lightbulb size={16} className="text-amber-500" />
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Expert Insight</span>
        <AnimatePresence mode="wait">
          <motion.p 
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-slate-600 font-medium leading-relaxed"
          >
            {EXPERT_INSIGHTS[idx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
`;

code = code.replace('export default function ServicesPage() {', expertInsightCode + '\nexport default function ServicesPage() {');

// 3. Update useActiveSection
const oldUseActiveSection = `function useActiveSection(sectionIds: string[], containerRef: React.RefObject<HTMLDivElement>) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + container.clientHeight / 2;
      let currentIdx = 0;

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          currentIdx = i;
        }
      }
      setActiveSection(currentIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sectionIds, containerRef]);

  return activeSection;
}`;

const newUseActiveSection = `function useActiveSection(sectionIds: string[], containerRef: React.RefObject<HTMLDivElement>) {
  const [activeSection, setActiveSection] = useState(0);
  const isStickingRef = useRef(false);
  const lastActiveRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isStickingRef.current) {
        e.preventDefault();
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isStickingRef.current) {
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + container.clientHeight / 2;
      let currentIdx = 0;

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          currentIdx = i;
        }
      }
      
      if (currentIdx !== lastActiveRef.current) {
        lastActiveRef.current = currentIdx;
        setActiveSection(currentIdx);
        
        // Apply magnetic sticking
        isStickingRef.current = true;
        setTimeout(() => {
          isStickingRef.current = false;
        }, 500);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sectionIds, containerRef]);

  return activeSection;
}`;

code = code.replace(oldUseActiveSection, newUseActiveSection);

// 4. Update the service cards
// We need to inject the ExpertInsightBox and the LinkIcon button.
// Search for the QuickView button area to insert the Link button
const oldQuickViewBtn = `<button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewData({ id: service.slug, type: 'service', title: service.title, description: service.description, tags: service.benefits, link: \`/layanan/\${service.slug}\` });
                      }}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors tooltip-trigger"
                      title="Quick View"
                    >
                      <Eye size={18} />
                    </button>`;

const newQuickViewBtn = `<button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = \`\${window.location.origin}\${window.location.pathname}#\${service.slug}\`;
                        if(window.history.pushState) {
                          window.history.pushState(null, '', \`#\${service.slug}\`);
                        } else {
                          window.location.hash = \`#\${service.slug}\`;
                        }
                        navigator.clipboard.writeText(url);
                        toast.success("Tautan layanan disalin!");
                      }}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white transition-colors tooltip-trigger"
                      title="Copy Deep Link"
                    >
                      <LinkIcon size={18} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewData({ id: service.slug, type: 'service', title: service.title, description: service.description, tags: service.benefits, link: \`/layanan/\${service.slug}\` });
                      }}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors tooltip-trigger"
                      title="Quick View"
                    >
                      <Eye size={18} />
                    </button>`;

code = code.replace(oldQuickViewBtn, newQuickViewBtn);

// 5. Inject the ExpertInsightBox at the end of the card content
const oldCardContentEnd = `                <p className="text-slate-600 leading-relaxed text-sm mb-6 line-clamp-2">{service.description}</p>
                {compareMode && (
                  <div className="mt-4 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 inline-block px-3 py-1.5 rounded-full">
                    {selectedForCompare.includes(service.slug) ? 'Terpilih' : 'Pilih untuk Bandingkan'}
                  </div>
                )}`;

const newCardContentEnd = `                <p className="text-slate-600 leading-relaxed text-sm line-clamp-2">{service.description}</p>
                {compareMode && (
                  <div className="mt-4 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 inline-block px-3 py-1.5 rounded-full">
                    {selectedForCompare.includes(service.slug) ? 'Terpilih' : 'Pilih untuk Bandingkan'}
                  </div>
                )}
                {!compareMode && <ExpertInsightBox serviceSlug={service.slug} />}`;

code = code.replace(oldCardContentEnd, newCardContentEnd);

// Add unique id to each service div so deep link fragments scroll to them?
// Actually the prompt says "copy the specific URL fragment (e.g., #web-dev)".
// The deep linking might not auto-scroll unless handled, but let's make sure the ID exists.
const oldCardMotionDiv = `className={\`bg-white p-8 rounded-3xl border transition-all duration-300 relative group \${compareMode && selectedForCompare.includes(service.slug) ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl' : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xl shadow-sm'}\`}`;
const newCardMotionDiv = `id={service.slug}
                className={\`bg-white p-8 rounded-3xl border transition-all duration-300 relative group flex flex-col \${compareMode && selectedForCompare.includes(service.slug) ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl' : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xl shadow-sm'}\`}`;

code = code.replace(oldCardMotionDiv, newCardMotionDiv);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
