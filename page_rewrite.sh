#!/bin/bash

# We will use sed to replace parts of src/app/page.tsx

# 1. Update the TypewriterKeyword component
cat << 'INNER_EOF' > typewriter_update.js
const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

code = code.replace(
  /<span className="text-purple-700 border-r-2 border-purple-700 pr-1 animate-pulse">\s*\{currentText\}\s*<\/span>/g,
  '<span className="inline-block bg-purple-700 text-white px-4 py-1 sm:py-1.5 mt-2 rounded-xl shadow-lg shadow-purple-700/30 font-semibold relative"><span className="mr-1">{currentText}</span><span className="inline-block w-[3px] h-[0.9em] bg-white animate-pulse align-middle -mt-1"></span></span>'
);

// 2. Wrap left column children with motion.div for staggered animations
// Find:
// <motion.div 
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//   className="lg:col-span-7 flex flex-col items-start text-left"
// >
const leftColRegex = /<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*20\s*\}\}\s+animate=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+transition=\{\{\s*duration:\s*0\.7,\s*ease:\s*\[0\.16,\s*1,\s*0\.3,\s*1\]\s*\}\}\s+className="lg:col-span-7 flex flex-col items-start text-left"\s*>/;

code = code.replace(leftColRegex, `<motion.div 
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }}
  className="lg:col-span-7 flex flex-col items-start text-left"
>`);

// Now replace inner elements to use variants
// Agency tag
code = code.replace(
  /<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-900 text-xs font-mono font-semibold mb-6 border border-purple-100">/,
  '<motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-900 text-xs font-mono font-semibold mb-6 border border-purple-100">'
);
// replace closing div for agency tag (the one before h1)
code = code.replace(
  /<\/div>\s*\{\/\* High-Impact Headline with Typewriter Effect \*\/\}/,
  '</motion.div>\n            {/* High-Impact Headline with Typewriter Effect */}'
);

// Headline
code = code.replace(
  /<h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-\[1\.12\] text-slate-900 min-h-\[140px\] sm:min-h-\[160px\]">/,
  '<motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.12] text-slate-900 min-h-[140px] sm:min-h-[160px]">'
);
// replace closing h1
code = code.replace(
  /<\/h1>\s*\{\/\* Improved Copywriting focused on Agency IT Solution \*\/\}/,
  '</motion.h1>\n            {/* Improved Copywriting focused on Agency IT Solution */}'
);

// Paragraph
code = code.replace(
  /<p className="mt-2 text-base sm:text-lg text-slate-600 font-sans max-w-xl leading-relaxed">/,
  '<motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="mt-2 text-base sm:text-lg text-slate-600 font-sans max-w-xl leading-relaxed">'
);
// Add purple word highlights to paragraph
code = code.replace(
  /solusi rekayasa perangkat lunak full-stack/,
  'solusi <span className="bg-purple-700 text-white px-2 py-0.5 rounded-md font-semibold inline-block transform hover:scale-105 transition-transform cursor-default">rekayasa perangkat lunak</span> full-stack'
);
code = code.replace(
  /integrasi Agentic AI/,
  'integrasi <span className="bg-purple-700 text-white px-2 py-0.5 rounded-md font-semibold inline-block transform hover:scale-105 transition-transform cursor-default">Agentic AI</span>'
);

// replace closing p
code = code.replace(
  /<\/p>\s*\{\/\* Primary CTA Buttons with Pulsating Motion \*\/\}/,
  '</motion.p>\n            {/* Primary CTA Buttons with Pulsating Motion */}'
);

// CTA Buttons wrapper
code = code.replace(
  /<div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">/,
  '<motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">'
);
// replace closing div for CTA
code = code.replace(
  /<\/div>\s*\{\/\* Quick Metrics \*\/\}/,
  '</motion.div>\n            {/* Quick Metrics */}'
);

// Metrics wrapper
code = code.replace(
  /<div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-8 text-xs font-mono text-slate-500">/,
  '<motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-8 text-xs font-mono text-slate-500">'
);
// replace closing div for Metrics (which is right before right column)
code = code.replace(
  /<\/div>\s*<\/motion.div>\s*\{\/\* Right Column: Minimalist Illustration/,
  '</motion.div>\n          </motion.div>\n\n          {/* Right Column: Minimalist Illustration'
);


fs.writeFileSync('src/app/page.tsx', code);
INNER_EOF
node typewriter_update.js
