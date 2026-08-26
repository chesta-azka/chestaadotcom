const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Import Search if not already
if (!code.includes('Search,')) {
    code = code.replace(/} from 'lucide-react';/, 'Search, } from \'lucide-react\';');
}

// 2. Add Search state and update filter
const oldFilterBlock = `const [serviceFilter, setServiceFilter] = useState('All');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const filteredServices = SERVICE_DEFINITIONS.filter(service => {
    if (serviceFilter === 'All') return true;
    if (serviceFilter === 'Web Development') return ['web-development', 'shopify-optimization', 'landing-page-conversion', 'ui-ux-prototyping', 'performance-tuning'].includes(service.slug);
    if (serviceFilter === 'AI Automation') return ['ai-agents', 'bot-automation', 'api-integration'].includes(service.slug);
    if (serviceFilter === 'Strategy') return ['seo-auditing', 'cloud-infrastructure'].includes(service.slug);
    return true;
  });`;

const newFilterBlock = `const [serviceFilter, setServiceFilter] = useState('All');
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = SERVICE_DEFINITIONS.filter(service => {
    const matchesSearch = !searchTerm || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.benefits.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (serviceFilter === 'All') return true;
    if (serviceFilter === 'Web Development') return ['web-development', 'shopify-optimization', 'landing-page-conversion', 'ui-ux-prototyping', 'performance-tuning'].includes(service.slug);
    if (serviceFilter === 'AI Automation') return ['ai-agents', 'bot-automation', 'api-integration'].includes(service.slug);
    if (serviceFilter === 'Strategy') return ['seo-auditing', 'cloud-infrastructure'].includes(service.slug);
    return true;
  });

  useEffect(() => {
    if (searchTerm && filteredServices.length > 0) {
      const match = filteredServices[0];
      const el = document.getElementById(match.slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchTerm]);`;

code = code.replace(oldFilterBlock, newFilterBlock);

// 3. Inject Search UI at the top of the container
const oldHelmet = `<HelmetProvider>
      <VerticalDotNav sectionIds={sectionIds} activeSection={activeSection} />`;

const newHelmet = `<HelmetProvider>
      <VerticalDotNav sectionIds={sectionIds} activeSection={activeSection} />
      
      {/* Global Search Bar */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" as any, stiffness: 200 }}
          className="relative pointer-events-auto"
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Cari layanan, teknologi, atau fitur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-full py-4 pl-14 pr-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium placeholder:text-slate-400 placeholder:font-normal transition-all"
          />
        </motion.div>
      </div>`;

code = code.replace(oldHelmet, newHelmet);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
