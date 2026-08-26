const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Add Pin to imports
code = code.replace(
  "Eye, Zap, Shield, Globe, Award, Target, Users, Play, Pause, Timer",
  "Eye, Zap, Shield, Globe, Award, Target, Users, Play, Pause, Timer, Pin"
);

// 2. Modify useActiveSection
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
        // When using container scroll, element.offsetTop is relative to offsetParent.
        // If the container is position: relative, offsetTop gives distance from container top.
        if (element && element.offsetTop <= scrollPosition) {
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

code = code.replace(oldHook, newHook);

// 3. Update hook call
code = code.replace(
  "const activeSection = useActiveSection(sectionIds);",
  "const activeSection = useActiveSection(sectionIds, containerRef);"
);

// 4. Update container classes
// It was: <div ref={containerRef} className="w-full bg-[#fbfbfd] pt-24 pb-0">
code = code.replace(
  '<div ref={containerRef} className="w-full bg-[#fbfbfd] pt-24 pb-0">',
  '<div ref={containerRef} className="relative h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#fbfbfd] scroll-smooth">'
);

// 5. Update useScroll call (which is in the component body)
// In the current file it is: const { scrollY } = useScroll();
code = code.replace(
  "const { scrollY } = useScroll();",
  "const { scrollY } = useScroll({ container: containerRef });"
);

// 6. Add Bookmark State and Logic
const bookmarkLogic = `  // Bookmark State
  const [bookmarkedSection, setBookmarkedSection] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved && sectionIds.includes(saved)) {
      setBookmarkedSection(saved);
      setTimeout(() => {
        document.getElementById(saved)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

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

// 7. Add Pin UI to presentation controls
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

// 8. Add spring animation to `<section>` elements
// We'll replace <section id="..." className="..."> with <motion.section id="..." initial="..." whileInView="..." className="...">
const springProps = ' initial={{ scale: 0.94, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 14, mass: 1 }} viewport={{ amount: 0.1, margin: "-100px" }} ';

code = code.replace(/<section id="([^"]+)" className="/g, '<motion.section id="$1"' + springProps + 'className="');
code = code.replace(/<\/section>/g, '</motion.section>');

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
