const fs = require('fs');

let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

const tocComponent = `
          <div className="md:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Table of Contents */}
            <div className="bg-white/95 backdrop-blur-3xl rounded-3xl p-6 border border-slate-200/90 shadow-lg shadow-slate-200/20">
              <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400 mb-4">Table of Contents</h3>
              <nav className="flex flex-col space-y-2">
                <a href="#project-overview" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors">Project Overview</a>
                <a href="#core-strategy" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors pl-4 border-l-2 border-slate-100 hover:border-purple-200">Core Strategy</a>
                <a href="#implementation-details" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors pl-4 border-l-2 border-slate-100 hover:border-purple-200">Implementation Details</a>
                <a href="#roi-analysis" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors pl-4 border-l-2 border-slate-100 hover:border-purple-200">ROI Analysis</a>
                <a href="#project-timeline" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors">Project Timeline</a>
              </nav>
            </div>

            <motion.div`;

code = code.replace(/<motion\.div \s*initial="hidden"/s, tocComponent.trim() + `\n            initial="hidden"`);

// Close the div after the ROI trend chart (which is the end of motion.div)
code = code.replace(/<ROITrendChart \/>\s*<\/motion\.div>/s, `<ROITrendChart />\n            </motion.div>\n          </div>`);

fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Patched ToC.');
