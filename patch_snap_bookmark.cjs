const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Add Pin to imports
code = code.replace(
  "Eye, Zap, Shield, Globe, Award, Target, Users, Play, Pause, Timer",
  "Eye, Zap, Shield, Globe, Award, Target, Users, Play, Pause, Timer, Pin"
);

// 2. Modify useActiveSection to use containerRef
const oldHook = `function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentIdx = 0;
      
      for (let i = 0; i < sectionIds.length; i++) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          currentIdx = i;
        }
      }
      setActiveSection(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}`;

const newHook = `function useActiveSection(sectionIds: string[], containerRef: React.RefObject<HTMLDivElement>) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + container.clientHeight / 2;
      let currentIdx = 0;
      
      for (let i = 0; i < sectionIds.length; i++) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          currentIdx = i;
        }
      }
      setActiveSection(currentIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sectionIds, containerRef]);

  return activeSection;
}`;

code = code.replace(oldHook, newHook);

// 3. Fix activeSection call
code = code.replace(
  "const activeSection = useActiveSection(sectionIds);",
  "const activeSection = useActiveSection(sectionIds, containerRef);"
);

// 4. Fix useScroll call
code = code.replace(
  "const { scrollY } = useScroll();",
  "const { scrollY } = useScroll({ container: containerRef });"
);

// 5. Add Bookmark state and logic
const bookmarkLogic = `  // Bookmark State
  const [bookmarkedSection, setBookmarkedSection] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved && sectionIds.includes(saved)) {
      setBookmarkedSection(saved);
      // Wait for layout
      setTimeout(() => {
        document.getElementById(saved)?.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    }
  }, []); // Run once on mount

  const toggleBookmark = () => {
    const currentId = sectionIds[activeSection];
    if (bookmarkedSection === currentId) {
      localStorage.removeItem('bookmarkedServiceSection');
      setBookmarkedSection(null);
      toast.success('Bookmark dilepas');
    } else {
      localStorage.setItem('bookmarkedServiceSection', currentId);
      setBookmarkedSection(currentId);
      toast.success(\`Bagian \${currentId} berhasil disimpan!\`);
    }
  };

  const { scrollY }`;

code = code.replace("const { scrollY }", bookmarkLogic);

// 6. Fix presentation scroll target (use containerRef.current.scrollTo? No, scrollIntoView works fine)
// But we should ensure container CSS is snap-y
code = code.replace(
  '<div ref={containerRef} className="w-full bg-[#fbfbfd] pt-24 pb-0">',
  '<div ref={containerRef} className="relative h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#fbfbfd] pb-0 scroll-smooth">'
);

// 7. Add Pin UI next to Play button
const playButtonMarkup = `<button 
            onClick={() => setIsPlaying(!isPlaying)}`;

const pinMarkup = `<button 
            onClick={toggleBookmark}
            className={\`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 \${bookmarkedSection === sectionIds[activeSection] ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-transparent text-white hover:bg-white/20'}\`}
            title={bookmarkedSection === sectionIds[activeSection] ? "Hapus Bookmark" : "Simpan Bagian Ini"}
          >
            <Pin size={14} className="text-white" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}`;

code = code.replace(playButtonMarkup, pinMarkup);

// 8. Add physics spring on snap
// Wrapping section inner contents with a motion.div to create a settling bounce effect
// E.g. Hero Section is wrapped
code = code.replace(
  '<motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto perspective-1000">',
  '<motion.div initial={{ scale: 0.95, y: 20 }} whileInView={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15, mass: 1 }} viewport={{ amount: 0.2 }} style={{ opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto perspective-1000">'
);

// Add to Philosophy
code = code.replace(
  '<div className="grid md:grid-cols-3 gap-8 relative z-10">',
  '<motion.div initial={{ scale: 0.95, y: 20 }} whileInView={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15, mass: 1 }} viewport={{ amount: 0.2 }} className="grid md:grid-cols-3 gap-8 relative z-10">'
);
code = code.replace(
  '          <DidYouKnowSnippet text="Keterlambatan respon server 1 detik saja dapat mengakibatkan penurunan 7% dalam rasio konversi pelanggan secara langsung." />\n        </section>',
  '          <DidYouKnowSnippet text="Keterlambatan respon server 1 detik saja dapat mengakibatkan penurunan 7% dalam rasio konversi pelanggan secara langsung." />\n        </motion.div>\n        </section>'
);

// Note: Replacing generic block is prone to errors, let's use exact line matching or just skip generic blocks and add it to the top level of each section.
// Actually, modifying React tags via regex can be fragile. I will write a script to insert `<motion.div className="w-full h-full flex flex-col justify-center items-center" initial={{ scale: 0.95, y: 30 }} whileInView={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1 }} viewport={{ amount: 0.1 }}>` right after `<section ...>` and `</motion.div>` right before `</section>`.
fs.writeFileSync('patch_snap_bookmark.cjs_temp', code);
