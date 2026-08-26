const fs = require('fs');

let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Add Play, Pause, Timer to lucide-react imports
code = code.replace(
  "Eye, Zap, Shield, Globe, Award, Target, Users",
  "Eye, Zap, Shield, Globe, Award, Target, Users, Play, Pause, Timer"
);

// 2. Add state inside ServicesPage
const stateToAdd = `
  // Auto-Presentation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playDelay, setPlayDelay] = useState(5000);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        const nextIndex = (activeSection + 1) % sectionIds.length;
        document.getElementById(sectionIds[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
      }, playDelay);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSection, playDelay, sectionIds]);
`;

code = code.replace(
  "// Quick View State",
  stateToAdd + "\n  // Quick View State"
);

// 3. Add UI to the Floating Jump Menu
const uiToAdd = `
      {/* Floating Jump Menu & Presentation Mode */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2 mix-blend-difference">
        
        {/* Presentation Controls */}
        <div className="flex flex-col items-center gap-1 mb-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-xl">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={\`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 \${isPlaying ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-transparent text-white hover:bg-white/20'}\`}
            title={isPlaying ? "Pause Presentation" : "Start Auto-Presentation"}
          >
            {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="ml-0.5 text-white" />}
          </button>
          
          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden w-full flex flex-col items-center gap-1 pt-2"
              >
                <div className="w-full h-px bg-white/20 mb-1" />
                <Timer size={12} className="text-white/70" />
                <select 
                  value={playDelay} 
                  onChange={(e) => setPlayDelay(Number(e.target.value))}
                  className="bg-transparent text-[10px] text-center font-mono text-white outline-none appearance-none cursor-pointer hover:text-indigo-300 transition-colors text-center w-full"
                  title="Configurable Delay"
                >
                  <option value={3000} className="text-slate-900">3s</option>
                  <option value={5000} className="text-slate-900">5s</option>
                  <option value={8000} className="text-slate-900">8s</option>
                  <option value={12000} className="text-slate-900">12s</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 items-end">
          {sectionIds.map((id, idx) => (`;

code = code.replace(
  "{/* Floating Jump Menu */}\n      <div className=\"fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 mix-blend-difference\">\n        {sectionIds.map((id, idx) => (",
  uiToAdd
);

// Close the inner div
code = code.replace(
  "</div>\n\n      <div ref={containerRef}",
  "  </div>\n      </div>\n\n      <div ref={containerRef}"
);


fs.writeFileSync('src/pages/ServicesPage.tsx', code);
