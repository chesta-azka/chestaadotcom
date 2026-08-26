const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

const componentsToInject = `
const CYCLING_TEXT = [
  "Membangun Ekosistem Skalabilitas Enterprise.",
  "Menciptakan Web Berkinerja Tinggi & Responsif.",
  "Mengintegrasikan Kecerdasan Buatan (AI) Mutakhir."
];

function CyclingPropositions() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % CYCLING_TEXT.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden mb-12">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-lg md:text-xl text-indigo-300 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {CYCLING_TEXT[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function GlassReveal({ dark = false }: { dark?: boolean }) {
  return (
    <motion.div 
      className={\`absolute inset-0 z-50 pointer-events-none \${dark ? 'bg-slate-950/60 backdrop-blur-2xl' : 'bg-white/60 backdrop-blur-2xl'}\`}
      variants={{
        hidden: { opacity: 1 },
        visible: { 
          opacity: 0, 
          transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          transitionEnd: { display: "none" }
        }
      }}
    />
  );
}
`;

code = code.replace("function SectionPin", componentsToInject + "\nfunction SectionPin");

code = code.replace(
  /<p className="text-lg md:text-xl text-slate-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">[\s\S]*?<\/p>/,
  '<CyclingPropositions />'
);

code = code.replace(/(<SectionPin sectionId="hero" \/>)/, '<GlassReveal dark />\n          $1');
code = code.replace(/(<SectionPin sectionId="philosophy" \/>)/, '<GlassReveal />\n          $1');
code = code.replace(/(<SectionPin sectionId="services" \/>)/, '<GlassReveal />\n          $1');
code = code.replace(/(<SectionPin sectionId="ai-scope" \/>)/, '<GlassReveal dark />\n          $1');
code = code.replace(/(<SectionPin sectionId="tech" \/>)/, '<GlassReveal />\n          $1');
code = code.replace(/(<SectionPin sectionId="process" \/>)/, '<GlassReveal />\n          $1');
code = code.replace(/(<SectionPin sectionId="metrics" \/>)/, '<GlassReveal dark />\n          $1');
code = code.replace(/(<SectionPin sectionId="faq" \/>)/, '<GlassReveal />\n          $1');

code = code.replace(/(<motion\.section id="contact"[^>]+>)/, '$1\n          <GlassReveal dark />');

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
