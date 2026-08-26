const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// The card code:
const cardRegex = /\{filteredServices\.map\(\(service, i\) => \([\s\S]*?\}\)\}\n          <\/AnimatePresence><\/motion\.div>/m;

// Let's first extract it into a functional component above `ServicesPage`.
const serviceCardComponent = `
function ServiceCard({ service, i, compareMode, selectedForCompare, toggleCompare, setHoveredService, setQuickViewData, containerRef, performanceMode }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({ 
    target: cardRef, 
    container: containerRef,
    offset: ["start end", "end start"]
  });
  
  // If performance mode is ON, we disable the parallax movement
  const yParallax = useTransform(scrollYProgress, [0, 1], performanceMode ? [0, 0] : [50, -50]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], performanceMode ? [1, 1] : [1.1, 1]);

  return (
    <motion.div 
      ref={cardRef}
      layout 
      variants={{
        hidden: { opacity: 0, y: 30, filter: performanceMode ? "none" : "blur(10px)", scale: performanceMode ? 1 : 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: performanceMode ? "none" : "blur(0px)", 
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" as any }
        }
      }} 
      transition={{ delay: i * 0.05 }}
      onMouseEnter={() => setHoveredService(service.slug)}
      onMouseLeave={() => setHoveredService(null)}
      id={service.slug}
      className={\`bg-white p-8 rounded-3xl border transition-all duration-300 relative group flex flex-col overflow-hidden \${compareMode && selectedForCompare.includes(service.slug) ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl' : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xl shadow-sm'}\`}
      onClick={() => compareMode ? toggleCompare(service.slug) : window.location.href = \`/layanan/\${service.slug}\`}
    >
      {/* Decorative Parallax Background */}
      <motion.div 
        style={{ y: yParallax, scale: scaleParallax }}
        className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-100/50 transition-colors duration-500"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], performanceMode ? [0, 0] : [-30, 30]) }}
        className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-50/50 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-100/50 transition-colors duration-500"
      />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            {service.icon ? <service.icon size={24} /> : <Code2 size={24} />}
          </div>
          <div>
            <h4 className="text-xl font-medium text-slate-900">{service.title}</h4>
            <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">{service.benefits.slice(0,2).join(' • ')}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
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
          </button>
        </div>
      </div>
      <div className="relative z-10 mb-6 flex-1">
        <p className="text-slate-600 leading-relaxed text-sm line-clamp-2">{service.description}</p>
        {compareMode && (
          <div className="mt-4 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 inline-block px-3 py-1.5 rounded-full">
            {selectedForCompare.includes(service.slug) ? 'Terpilih' : 'Pilih untuk Bandingkan'}
          </div>
        )}
        {!compareMode && <ExpertInsightBox serviceSlug={service.slug} />}
      </div>
      <TechStackCarousel slug={service.slug} />
    </motion.div>
  );
}
`;

code = code.replace('export default function ServicesPage() {', serviceCardComponent + '\nexport default function ServicesPage() {');

// Now replace the map with the new component
const mapReplacement = `{filteredServices.map((service, i) => (
              <ServiceCard 
                key={service.slug}
                service={service}
                i={i}
                compareMode={compareMode}
                selectedForCompare={selectedForCompare}
                toggleCompare={toggleCompare}
                setHoveredService={setHoveredService}
                setQuickViewData={setQuickViewData}
                containerRef={containerRef}
                performanceMode={performanceMode}
              />
            ))}
          </AnimatePresence></motion.div>`;

code = code.replace(cardRegex, mapReplacement);

// We need to make sure performanceMode is extracted from usePerformance inside ServicesPage
// Search for `const [filter, setFilter] = useState('All');` or similar
const varHookStr = "const activeSection = useActiveSection(sectionIds, containerRef);";
const perfHookStr = "const activeSection = useActiveSection(sectionIds, containerRef);\n  const { performanceMode } = usePerformance();";
code = code.replace(varHookStr, perfHookStr);

// We also need to import usePerformance at the top of ServicesPage if not present
if (!code.includes("import { usePerformance }")) {
  code = code.replace("import React,", "import { usePerformance } from '../contexts/PerformanceContext.tsx';\nimport React,");
}

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
