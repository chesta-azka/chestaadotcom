const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. itemVariants update
code = code.replace(
  'hidden: { opacity: 0, y: 30 },',
  'hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },'
);
code = code.replace(
  'opacity: 1, \n    y: 0,',
  'opacity: 1, \n    y: 0, \n    filter: "blur(0px)", scale: 1,'
);

// 2. Add serviceFilter and hoveredService state
const stateToAdd = `
  const [serviceFilter, setServiceFilter] = useState('All');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const filteredServices = SERVICE_DEFINITIONS.filter(service => {
    if (serviceFilter === 'All') return true;
    if (serviceFilter === 'Web Development') return ['web-development', 'shopify-optimization', 'landing-page-conversion', 'ui-ux-prototyping', 'performance-tuning'].includes(service.slug);
    if (serviceFilter === 'AI Automation') return ['ai-agents', 'bot-automation', 'api-integration'].includes(service.slug);
    if (serviceFilter === 'Strategy') return ['seo-auditing', 'cloud-infrastructure'].includes(service.slug);
    return true;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      if (e.key.toLowerCase() === 'q') {
        const targetSlug = hoveredService || (activeSection === 2 ? filteredServices[0]?.slug : null);
        if (targetSlug) {
          const service = SERVICE_DEFINITIONS.find(s => s.slug === targetSlug);
          if (service) {
            setQuickViewData({ 
              id: service.slug, 
              type: 'service', 
              title: service.title, 
              description: service.description, 
              tags: service.techStack, 
              link: \`/layanan/\${service.slug}\` 
            });
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hoveredService, activeSection, filteredServices]);
`;

code = code.replace(
  "const [compareMode, setCompareMode] = useState(false);",
  stateToAdd + "\n  const [compareMode, setCompareMode] = useState(false);"
);

// 3. Add Tag UI and apply filter
const oldServicesHeader = `<div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-4">Katalog Layanan</h2>
              <p className="text-slate-500 max-w-xl">Solusi end-to-end yang dirancang khusus untuk memecahkan tantangan bisnis modern.</p>
            </div>`;

const newServicesHeader = `<div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-4">Katalog Layanan</h2>
              <p className="text-slate-500 max-w-xl mb-6">Solusi end-to-end yang dirancang khusus untuk memecahkan tantangan bisnis modern.</p>
              <div className="flex flex-wrap gap-3">
                {['All', 'Web Development', 'AI Automation', 'Strategy'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setServiceFilter(cat)}
                    className={\`px-5 py-2 rounded-full font-medium transition-colors text-sm border \${serviceFilter === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}\`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>`;

code = code.replace(oldServicesHeader, newServicesHeader);

// 4. Update the map to use filteredServices and add onMouseEnter/onMouseLeave
const oldMapStart = `{SERVICE_DEFINITIONS.map((service, i) => (
              <motion.div 
                variants={itemVariants} transition={{ delay: i * 0.05 }}
                key={service.slug} 
                className={\`bg-white p-8 rounded-3xl border transition-all duration-300 relative group \${compareMode && selectedForCompare.includes(service.slug) ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl' : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xl shadow-sm'}\`}
                onClick={() => compareMode ? toggleCompare(service.slug) : window.location.href = \`/layanan/\${service.slug}\`}
              >`;

const newMapStart = `{filteredServices.map((service, i) => (
              <motion.div 
                variants={itemVariants} transition={{ delay: i * 0.05 }}
                key={service.slug} 
                onMouseEnter={() => setHoveredService(service.slug)}
                onMouseLeave={() => setHoveredService(null)}
                className={\`bg-white p-8 rounded-3xl border transition-all duration-300 relative group \${compareMode && selectedForCompare.includes(service.slug) ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl' : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xl shadow-sm'}\`}
                onClick={() => compareMode ? toggleCompare(service.slug) : window.location.href = \`/layanan/\${service.slug}\`}
              >`;

code = code.replace(oldMapStart, newMapStart);

// 5. Provide AnimatePresence for smooth grid changes
const oldGridStart = `<div className="grid lg:grid-cols-2 gap-6">`;
const newGridStart = `<motion.div layout className="grid lg:grid-cols-2 gap-6"><AnimatePresence mode="popLayout">`;
const oldGridEnd = `              </motion.div>
            ))}
          </div>`;
const newGridEnd = `              </motion.div>
            ))}
          </AnimatePresence></motion.div>`;

code = code.replace(oldGridStart, newGridStart);
code = code.replace(oldGridEnd, newGridEnd);

// Adding layout prop to motion.div inside the grid so they animate nicely when filtering
code = code.replace(/<motion\.div \n                variants=\{itemVariants\} transition=\{\{ delay: i \* 0\.05 \}\}/g, '<motion.div \n                layout variants={itemVariants} transition={{ delay: i * 0.05 }}');


fs.writeFileSync('src/pages/ServicesPage.tsx', code);
