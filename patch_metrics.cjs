const fs = require('fs');

let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

// Add Lucide imports
code = code.replace(
  /import \{ ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight \} from 'lucide-react';/g,
  "import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, User, TrendingUp, Target, DollarSign } from 'lucide-react';"
);
if (!code.includes('User, TrendingUp, Target, DollarSign')) {
  code = code.replace(
    /import \{([^}]+)\} from 'lucide-react';/g,
    "import { $1, User, TrendingUp, Target, DollarSign } from 'lucide-react';"
  );
}

// Replace the redundant grid items and add icons
const redundantRegex = /<\/motion\.div>\s*<div className="bg-purple-50\/50 rounded-2xl[\s\S]*?<\/div>\s*<\/div>\s*<ROITrendChart \/>/s;

code = code.replace(redundantRegex, `</motion.div>\n            <ROITrendChart />`);

const replacement = `
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 mb-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100/50 flex flex-col justify-center h-full hover:bg-white hover:shadow-sm transition-all relative overflow-hidden group">
                <User className="absolute -right-2 -bottom-2 text-slate-200/50 group-hover:text-slate-200 transition-colors" size={64} strokeWidth={1} />
                <div className="flex items-center gap-1.5 mb-1.5">
                  <User size={12} className="text-slate-500" />
                  <p className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">Client</p>
                </div>
                <p className="text-xl font-display font-bold text-slate-900 relative z-10">{study.client}</p>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100/50 flex flex-col justify-center h-full hover:bg-purple-50 hover:shadow-sm transition-all relative overflow-hidden group">
                <TrendingUp className="absolute -right-2 -bottom-2 text-purple-200/50 group-hover:text-purple-200 transition-colors" size={64} strokeWidth={1} />
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingUp size={12} className="text-purple-600" />
                  <p className="text-[10px] text-purple-600 font-mono font-bold uppercase tracking-widest">Impact</p>
                </div>
                <p className="text-xl font-display font-black text-purple-900 leading-tight relative z-10">{study.impact}</p>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100/50 flex flex-col justify-center h-full hover:bg-white hover:shadow-sm transition-all relative overflow-hidden group">
                <Target className="absolute -right-2 -bottom-2 text-slate-200/50 group-hover:text-slate-200 transition-colors" size={64} strokeWidth={1} />
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Target size={12} className="text-slate-500" />
                  <p className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">Focus</p>
                </div>
                <p className="text-sm font-sans font-medium text-slate-800 leading-tight relative z-10">{study.title}</p>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100/50 flex flex-col justify-center h-full hover:bg-amber-50 hover:shadow-sm transition-all relative overflow-hidden group">
                <DollarSign className="absolute -right-2 -bottom-2 text-amber-200/50 group-hover:text-amber-200 transition-colors" size={64} strokeWidth={1} />
                <div className="flex items-center gap-1.5 mb-1.5">
                  <DollarSign size={12} className="text-amber-600" />
                  <p className="text-[10px] text-amber-600 font-mono font-bold uppercase tracking-widest">ROI</p>
                </div>
                <p className="text-xs sm:text-sm font-sans font-medium text-slate-800 leading-snug relative z-10">{study.roi}</p>
              </motion.div>
            </motion.div>
`;

code = code.replace(/<motion\.div\s*className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 mb-8"[\s\S]*?<\/motion\.div>\s*<ROITrendChart \/>/s, replacement.trim() + `\n            <ROITrendChart />`);

fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Patched Key Metrics and removed redundant blocks.');
