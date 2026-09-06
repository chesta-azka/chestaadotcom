const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const navCode = `        <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600">
          <Link href="/" className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors">Beranda</Link>
          
          {/* Dropdown Layanan */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors flex items-center gap-1">
              Layanan
              <svg className="w-4 h-4 text-slate-400 group-hover:text-purple-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left group-hover:translate-y-0 translate-y-2 z-50">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-2 flex flex-col gap-1">
                <Link href="/#services-web" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">Web Development</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Pembuatan Website Next.js</div>
                </Link>
                <Link href="/#services-mobile" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">Mobile Apps</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">iOS & Android React Native</div>
                </Link>
                <Link href="/#services-ai" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">AI Integration</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Otomatisasi dengan Google Gemini</div>
                </Link>
                <Link href="/#services-uiux" className="px-4 py-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-slate-600 block">
                  <div className="font-semibold text-sm">UI/UX Design</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Desain antarmuka modern & premium</div>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/case-studies" className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors">Studi Kasus</Link>
          <a href="#pricing" className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-purple-900 transition-colors">Paket Promo</a>
        </nav>`;

code = code.replace(/<nav className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600">[\s\S]*?<\/nav>/, navCode);

fs.writeFileSync('src/components/Navbar.tsx', code);
console.log('Updated Navbar with Layanan Dropdown');
