const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Hash & Bookmark logic
const oldBookmarkLogic = `  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved && sectionIds.includes(saved)) {
      setBookmarkedSection(saved);
      setTimeout(() => {
        document.getElementById(saved)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);`;

const newBookmarkLogic = `  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved && sectionIds.includes(saved)) {
      setBookmarkedSection(saved);
      setTimeout(() => {
        document.getElementById(saved)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);`;

code = code.replace(oldBookmarkLogic, newBookmarkLogic);

// 2. Hero Floating Elements
const oldHeroBg = `          <motion.div style={{ y: heroDescY }} className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/30 blur-[120px] rounded-full pointer-events-none" />
          </motion.div>`;

const newHeroBg = `          <motion.div style={{ y: heroDescY }} className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/30 blur-[120px] rounded-full pointer-events-none" />
            <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
            <motion.div animate={{ y: [0, 40, 0], x: [0, 20, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-indigo-400/10 rounded-full pointer-events-none" />
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }} className="absolute top-1/3 right-1/3 w-24 h-24 border border-white/5 rotate-45 pointer-events-none" />
            <motion.div animate={{ y: [0, -50, 0], x: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }} className="absolute bottom-1/3 left-1/3 w-48 h-48 border border-cyan-400/10 rounded-full blur-sm pointer-events-none" />
            <motion.div animate={{ y: [0, 20, 0], x: [0, 40, 0], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} className="absolute top-1/2 left-1/10 w-40 h-40 border border-purple-400/10 rounded-lg rotate-12 pointer-events-none" />
          </motion.div>`;

code = code.replace(oldHeroBg, newHeroBg);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
