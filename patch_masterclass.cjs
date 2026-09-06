const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// Imports
code = code.replace(/import { Bookmark, BookmarkCheck, ChevronDown, ChevronRight,/, "import { Home, Bookmark, BookmarkCheck, ChevronDown, ChevronRight,");
code = code.replace(/import curriculumData from '\.\.\/data\/academy-curriculum\.json';/, "import curriculumData from '../data/academy-curriculum.json';\nimport FooterSection from '../components/organisms/FooterSection.tsx';\nimport { Breadcrumbs } from '../components/Breadcrumbs.tsx';");

// Inside <main>, add Breadcrumbs
const breadcrumbCode = `
          {/* Breadcrumb Navigation */}
          <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-8 pb-4">
            <motion.nav 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-purple-50 border border-purple-100 rounded-full w-max font-sans text-xs"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-slate-600 hover:text-purple-900 transition-colors flex items-center gap-1 font-medium shrink-0">
                <Home className="w-3.5 h-3.5" /> Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <Link to="/academy" className="text-slate-600 hover:text-purple-900 transition-colors font-medium shrink-0">
                Academy & Docs
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-purple-900 font-semibold shrink-0 line-clamp-1 max-w-[150px] sm:max-w-[200px]">Music Streaming App</span>
            </motion.nav>
          </div>
`;

code = code.replace(/<main id="academy-content-area"[^>]+>/, `$&${breadcrumbCode}`);

// At the end of <main>, add FooterSection
code = code.replace(/<\/main>/, `  <FooterSection />\n        </main>`);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Patched AcademyMasterclassPage.tsx');
