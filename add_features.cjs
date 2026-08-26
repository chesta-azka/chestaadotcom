const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Add imports
code = code.replace(
  /} from 'lucide-react';/,
  ', HelpCircle, FileText, PhoneCall } from \'lucide-react\';'
);

// 2. Add TECH_STACK_MAP and components
const featuresCode = `
const TECH_STACK_MAP: Record<string, string[]> = {
  'web-development': ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'Vite'],
  'ai-agents': ['OpenAI', 'Gemini API', 'LangChain', 'Python', 'Vector DB', 'Pinecone'],
  'shopify-optimization': ['Liquid', 'React', 'GraphQL', 'Shopify Admin', 'Hydrogen', 'Oxygen'],
  'cloud-infrastructure': ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  'landing-page-conversion': ['Figma', 'React', 'Framer Motion', 'A/B Testing', 'Analytics', 'Vercel'],
  'seo-auditing': ['Ahrefs', 'Search Console', 'Semrush', 'Lighthouse', 'Next.js', 'Schema'],
  'bot-automation': ['Discord.js', 'Telegram API', 'Node.js', 'Puppeteer', 'Webhooks', 'Redis'],
  'api-integration': ['REST', 'GraphQL', 'OAuth2', 'Postman', 'Swagger', 'WebSockets'],
  'performance-tuning': ['Lighthouse', 'Web Vitals', 'Redis', 'CDN', 'Edge Computing', 'Wasm'],
  'ui-ux-prototyping': ['Figma', 'Framer', 'Protopie', 'User Testing', 'Wireframing', 'Miro']
};

function TechStackCarousel({ slug }: { slug: string }) {
  const stacks = TECH_STACK_MAP[slug] || TECH_STACK_MAP['web-development'];
  const items = [...stacks, ...stacks];

  return (
    <div className="absolute -bottom-4 left-4 right-4 bg-slate-900 rounded-xl p-3 shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 overflow-hidden pointer-events-none border border-slate-700">
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="absolute left-0 w-8 h-full bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 w-8 h-full bg-gradient-to-l from-slate-900 to-transparent z-10" />
        <motion.div 
          className="flex gap-2 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {items.map((tech, i) => (
            <div key={i} className="px-3 py-1 rounded-md bg-white/10 text-slate-300 text-[11px] font-medium tracking-wide">
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function QuickActionBar() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" as any, stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-slate-900/90 backdrop-blur-xl border border-white/10 px-2 py-2 rounded-full shadow-2xl flex items-center gap-1"
    >
      <button 
        onClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-slate-200 transition-colors text-sm font-medium"
      >
        <PhoneCall size={16} className="text-indigo-400" />
        <span className="hidden sm:inline">Contact Us</span>
      </button>
      <div className="w-px h-6 bg-white/20" />
      <button 
        onClick={() => {
          const el = document.getElementById('ai-scope');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-slate-200 transition-colors text-sm font-medium"
      >
        <FileText size={16} className="text-emerald-400" />
        <span className="hidden sm:inline">Request Quote</span>
      </button>
      <div className="w-px h-6 bg-white/20" />
      <button 
        onClick={() => {
          const el = document.getElementById('faq');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-slate-200 transition-colors text-sm font-medium"
      >
        <HelpCircle size={16} className="text-blue-400" />
        <span className="hidden sm:inline">View FAQ</span>
      </button>
    </motion.div>
  );
}
`;

code = code.replace('export default function ServicesPage() {', featuresCode + '\nexport default function ServicesPage() {');

// 3. Inject TechStackCarousel into service card
code = code.replace(
  '{!compareMode && <ExpertInsightBox serviceSlug={service.slug} />}',
  '{!compareMode && <ExpertInsightBox serviceSlug={service.slug} />}\n                <TechStackCarousel slug={service.slug} />'
);

// 4. Inject QuickActionBar into the bottom of the page
code = code.replace(
  '<FloatingQuoteTrigger />',
  '<FloatingQuoteTrigger />\n      <QuickActionBar />'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
