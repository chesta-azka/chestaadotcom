const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Update right column initial transition
code = code.replace(
  /<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*scale:\s*0\.95\s*\}\}\s+animate=\{\{\s*opacity:\s*1,\s*scale:\s*1\s*\}\}\s+transition=\{\{\s*duration:\s*0\.8,\s*delay:\s*0\.2,\s*ease:\s*\[0\.16,\s*1,\s*0\.3,\s*1\]\s*\}\}/,
  `<motion.div 
            initial="hidden"
            animate="visible"
            variants={{
               hidden: { opacity: 0, scale: 0.95 },
               visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.4 } }
            }}`
);

// We need to apply variants to the children of right column to actually stagger them.
// Let's replace the `whileHover={{ scale: 1.03, x: 4 }}` items with variants
// Note: We need to give them a variants object to use staggerChildren
const itemVariants = `variants={{ hidden: { opacity: 0, x: 10 }, visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } }}`;

// There are 4 of these: <motion.div whileHover={{ scale: 1.03, x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="flex items-center gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 cursor-pointer">
code = code.replace(
  /<motion\.div\s+whileHover=\{\{\s*scale:\s*1\.03,\s*x:\s*4\s*\}\}\s+transition=\{\{\s*type:\s*'spring',\s*stiffness:\s*300,\s*damping:\s*20\s*\}\}/g,
  `<motion.div ${itemVariants} whileHover={{ scale: 1.03, x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}`
);

fs.writeFileSync('src/app/page.tsx', code);
