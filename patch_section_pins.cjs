const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// I will create a reusable `SectionPin` component to avoid duplicating code.
const pinComponentCode = `function SectionPin({ sectionId }: { sectionId: string }) {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved === sectionId) {
      setIsPinned(true);
    }
  }, [sectionId]);

  const handlePin = () => {
    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved === sectionId) {
      localStorage.removeItem('bookmarkedServiceSection');
      setIsPinned(false);
      toast.success('Bookmark dilepas');
    } else {
      localStorage.setItem('bookmarkedServiceSection', sectionId);
      setIsPinned(true);
      toast.success(\`Bagian berhasil disimpan!\`);
      // Update global pin state by dispatching a custom event, or rely on state if we want.
      // But page refresh will auto scroll there anyway.
      window.dispatchEvent(new Event('storage')); // A trick to trigger updates if needed
    }
  };

  useEffect(() => {
    const onStorage = () => {
      setIsPinned(localStorage.getItem('bookmarkedServiceSection') === sectionId);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [sectionId]);

  return (
    <button
      onClick={handlePin}
      className={\`absolute top-8 right-8 z-50 p-3 rounded-full transition-all duration-300 backdrop-blur-sm border \${
        isPinned 
          ? 'bg-amber-500/90 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
          : 'bg-white/10 text-slate-400 border-white/20 hover:bg-white/20 hover:text-white'
      }\`}
      title={isPinned ? "Lepaskan Pin" : "Pin Bagian Ini"}
    >
      <Pin size={20} className={isPinned ? "fill-white" : ""} />
    </button>
  );
}

function DidYouKnowSnippet`;

code = code.replace("function DidYouKnowSnippet", pinComponentCode);

// Inject <SectionPin sectionId="..." /> into each section
code = code.replace(
  '<motion.section id="hero"', 
  '<motion.section id="hero"'
);
// Hero
code = code.replace(
  '<motion.div style={{ y: heroDescY }} className="absolute inset-0">',
  '<SectionPin sectionId="hero" />\n          <motion.div style={{ y: heroDescY }} className="absolute inset-0">'
);
// Philosophy
code = code.replace(
  '<motion.section id="philosophy"',
  '<motion.section id="philosophy"'
);
code = code.replace(
  '<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-16 text-center">',
  '<SectionPin sectionId="philosophy" />\n          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-16 text-center">'
);
// Services
code = code.replace(
  '<div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">',
  '<SectionPin sectionId="services" />\n          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">'
);
// AI Scope
code = code.replace(
  '<motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>',
  '<SectionPin sectionId="ai-scope" />\n            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>'
);
// Tech
code = code.replace(
  '<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">',
  '<SectionPin sectionId="tech" />\n          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">'
);
// Process
code = code.replace(
  '<motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-display font-medium text-slate-900 mb-16 text-center">',
  '<SectionPin sectionId="process" />\n          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-display font-medium text-slate-900 mb-16 text-center">'
);
// Metrics
code = code.replace(
  '<div className="text-center mb-16">',
  '<SectionPin sectionId="metrics" />\n            <div className="text-center mb-16">'
);
// FAQ
code = code.replace(
  '<h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-6">Pertanyaan Umum</h2>',
  '<SectionPin sectionId="faq" />\n            <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-6">Pertanyaan Umum</h2>'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
