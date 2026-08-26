const fs = require('fs');

let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

code = code.replace(
  /<motion\.button\n          onClick=\{\(\) => setIsOpen\(!isOpen\)\}\n          className="relative flex items-center justify-center rounded-full bg-slate-900 p-4 text-white shadow-\[0_10px_30px_rgba\(15,23,42,0\.3\)\] hover:shadow-\[0_10px_40px_rgba\(79,70,229,0\.4\)\] transition-all duration-300 group"\n          whileHover=\{\{ scale: 1\.05 \}\}\n          whileTap=\{\{ scale: 0\.95 \}\}\n        >/g,
  `<motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center rounded-full bg-slate-900 p-4 text-white shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >`
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
