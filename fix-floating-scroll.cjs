const fs = require('fs');

let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// Replace isExpanded state
code = code.replace(
  /const \[isExpanded, setIsExpanded\] = useState\(false\);/,
  `const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = !isOpen && (!isScrolled || isHovered);`
);

// Remove the old useEffect for scrollTimeout
code = code.replace(
  /  useEffect\(\(\) => \{\n    let scrollTimeout: any;\n    if \(!isOpen\) \{\n      scrollTimeout = setTimeout\(\(\) => \{\n        setIsExpanded\(true\);\n      \}, 3000\);\n    \} else \{\n      setIsExpanded\(false\);\n    \}\n    return \(\) => clearTimeout\(scrollTimeout\);\n  \}, \[isOpen\]\);\n/,
  ''
);

// Add onMouseEnter and onMouseLeave to the button
code = code.replace(
  /className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center bg-white\/10 backdrop-blur-2xl shadow-\[0_8px_32px_rgba\(0,0,0,0\.1\)\] border border-white\/20 rounded-full p-2 sm:p-3 hover:bg-white\/20 hover:scale-105 transition-all duration-300 ring-1 ring-white\/10"/,
  `className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 rounded-full p-2 sm:p-3 hover:bg-white/20 hover:scale-105 transition-all duration-300 ring-1 ring-white/10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}`
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
