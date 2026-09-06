const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

// Insert a card or banner linking to resources right below search bar or in the hero
const resourceBanner = `
        {/* Quick Link to Resources Checklist */}
        <div className="mb-12">
          <Link 
            to="/academy/resources"
            className="group flex items-center justify-between p-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
                <Sparkles size={24} className="text-purple-200" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Interactive Checklist & Resources</h3>
                <p className="text-sm text-purple-200">Panduan lengkap setup VS Code, Local Env, dan Deploy Vercel dengan checklist interaktif.</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>
        </div>
`;

code = code.replace(/\{ cuáles\/\/\s*\/\* Courses Grid \*\//, resourceBanner + '\n        {/* Courses Grid */}');
if (!code.includes('/academy/resources')) {
  // alternative replace if pattern didn't match
  code = code.replace(/\{\/\* Courses Grid \*\/\}/, resourceBanner + '\n        {/* Courses Grid */}');
}

fs.writeFileSync('src/pages/AcademyPage.tsx', code);
console.log('Added resource banner to AcademyPage');
