const fs = require('fs');
let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

code = code.replace(
  /<motion\.div \s*whileHover=\{\{ scale: 1\.02 \}\} \s*transition=\{\{ type: "spring", stiffness: 300, damping: 20 \}\}\s*className="bg-white\/95 backdrop-blur-3xl rounded-3xl p-8 border border-slate-200\/90 shadow-xl shadow-purple-950\/5 h-max cursor-pointer"\s*>/s,
  `<motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 24, staggerChildren: 0.15 }
              }
            }}
            whileHover={{ scale: 1.02 }} 
            className="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 border border-slate-200/90 shadow-xl shadow-purple-950/5 h-max cursor-pointer"
          >`
);

// Remove the stagger container from the inner grid so it cascades from the outer card
code = code.replace(
  /<motion\.div \s*className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 mb-8"\s*initial="hidden"\s*whileInView="show"\s*viewport=\{\{ once: true, margin: "-50px" \}\}\s*variants=\{\{\s*hidden: \{ opacity: 0 \},\s*show: \{\s*opacity: 1,\s*transition: \{ staggerChildren: 0\.15 \}\s*\}\s*\}\}\s*>/s,
  `<motion.div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 mb-8">`
);

fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Patched Outer Card');
