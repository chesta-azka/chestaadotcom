const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

const newHeader = `
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 z-50 shadow-sm relative">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:bg-purple-900 transition-colors">
               <span className="font-display font-bold text-sm sm:text-base tracking-tighter">Ai</span>
             </div>
          </Link>
          
          <div className="w-px h-6 bg-slate-200 mx-1"></div>

          <Link to="/academy" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600 font-medium text-sm">
            <ArrowLeft size={16} />
            Keluar Kelas
          </Link>
          <Link to="/academy" className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <ArrowLeft size={18} />
          </Link>

          <div className="flex flex-col ml-1 sm:ml-2">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-700">Course Path</span>
            <h1 className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1 max-w-[120px] sm:max-w-xs">
              {'Music Streaming App'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
            <Printer size={16} />
            <span>Cetak</span>
          </button>
          <button className="flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-white bg-purple-900 rounded-full hover:bg-purple-800 transition-colors shadow-sm">
            <Share2 size={16} />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>
      </header>
`;

code = code.replace(/<header className="h-16 shrink-0[\s\S]*?<\/header>/s, newHeader.trim());
fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Patched Academy Header');
