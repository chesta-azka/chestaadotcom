import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Terminal, Code, Sparkles, ArrowRight, Home, ChevronRight, Server, BookOpen, Compass, Layers } from 'lucide-react';
import FooterSection from '../components/organisms/FooterSection.tsx';

export default function AcademyResourcesPage() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'vs-code-install': false,
    'extensions-install': false,
    'git-setup': false,
    'node-install': false,
    'clone-repo': false,
    'install-deps': false,
    'run-dev': false,
    'github-push': false,
    'vercel-deploy': false,
  });

  const [activeSection, setActiveSection] = useState('phase-1');

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-24 md:pt-32 selection:bg-purple-100 selection:text-purple-900">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Persistent Sidebar Navigation for Resources */}
        <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-28 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
              <Compass size={20} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-slate-900">Navigasi Panduan</h2>
              <p className="text-xs text-slate-500">Daftar Materi & Checklist</p>
            </div>
          </div>

          <nav className="space-y-2 mb-6">
            <button 
              onClick={() => scrollToSection('phase-1')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-medium transition-all text-left ${activeSection === 'phase-1' ? 'bg-purple-50 text-purple-900 border border-purple-200/80 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <div className="flex items-center gap-2.5">
                <Terminal size={16} className={activeSection === 'phase-1' ? 'text-purple-700' : 'text-slate-400'} />
                <span>1. Setup VS Code & Env</span>
              </div>
              <ChevronRight size={14} className={activeSection === 'phase-1' ? 'text-purple-700' : 'text-slate-300'} />
            </button>

            <button 
              onClick={() => scrollToSection('phase-2')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-medium transition-all text-left ${activeSection === 'phase-2' ? 'bg-purple-50 text-purple-900 border border-purple-200/80 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <div className="flex items-center gap-2.5">
                <Code size={16} className={activeSection === 'phase-2' ? 'text-purple-700' : 'text-slate-400'} />
                <span>2. Inisialisasi Lokal</span>
              </div>
              <ChevronRight size={14} className={activeSection === 'phase-2' ? 'text-purple-700' : 'text-slate-300'} />
            </button>

            <button 
              onClick={() => scrollToSection('phase-3')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-medium transition-all text-left ${activeSection === 'phase-3' ? 'bg-purple-50 text-purple-900 border border-purple-200/80 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <div className="flex items-center gap-2.5">
                <Server size={16} className={activeSection === 'phase-3' ? 'text-purple-700' : 'text-slate-400'} />
                <span>3. Deploy ke Vercel</span>
              </div>
              <ChevronRight size={14} className={activeSection === 'phase-3' ? 'text-purple-700' : 'text-slate-300'} />
            </button>
          </nav>

          {/* Mini Progress Card in Sidebar */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-slate-700">
              <span>Progress Checklist</span>
              <span className="text-purple-700">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-purple-700 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-[11px] text-slate-500 font-mono">{completedCount} dari {totalCount} selesai</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl">
          {/* Breadcrumb Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 px-3.5 py-1.5 mb-8 bg-purple-50 border border-purple-100 rounded-full w-max text-xs"
          >
            <Link to="/" className="text-slate-600 hover:text-purple-900 flex items-center gap-1 font-medium">
              <Home className="w-3.5 h-3.5" /> Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link to="/academy" className="text-slate-600 hover:text-purple-900 font-medium">
              Academy
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-purple-900 font-semibold">Resources & Checklist</span>
          </motion.nav>

          {/* Header */}
          <div className="mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900 mb-4">
                Academy Resources & Checklist
              </h1>
              <p className="text-base text-slate-600 leading-[1.75] mb-8">
                Panduan langkah demi langkah interaktif dari instalasi dasar Visual Studio Code hingga publikasi aplikasi ke Vercel. Tandai progres checklist Anda di sebelah kiri atau di dalam materi!
              </p>
            </motion.div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Phase 1: VS Code & Environment */}
            <section id="phase-1" className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                  <Terminal size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-1">Fase 1: Setup VS Code & Environment</h2>
                  <p className="text-sm text-slate-500">Persiapan senjata utama developer modern</p>
                </div>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={() => toggleCheck('vs-code-install')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['vs-code-install'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['vs-code-install'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">1. Install Visual Studio Code</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unduh dan pasang VS Code dari situs resmi <a href="https://code.visualstudio.com" target="_blank" rel="noreferrer" className="text-purple-700 underline">code.visualstudio.com</a> untuk sistem operasi Anda.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleCheck('extensions-install')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['extensions-install'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['extensions-install'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">2. Pasang Ekstensi Esensial</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Install <strong>ESLint</strong>, <strong>Prettier</strong>, dan <strong>Tailwind CSS IntelliSense</strong> dari Extensions Marketplace (`Ctrl+Shift+X`).
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleCheck('git-setup')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['git-setup'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['git-setup'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">3. Konfigurasi Git & Node.js</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pastikan Node.js LTS terinstal di komputer Anda dan verifikasi lewat terminal dengan perintah <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">node -v</code> dan <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">git --version</code>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Phase 2: Local Environment Initialization */}
            <section id="phase-2" className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                  <Code size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-1">Fase 2: Inisialisasi Lokal & Pengembangan</h2>
                  <p className="text-sm text-slate-500">Menjalankan proyek Next.js secara lokal</p>
                </div>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={() => toggleCheck('clone-repo')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['clone-repo'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['clone-repo'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">1. Clone atau Inisialisasi Proyek</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Buat proyek baru menggunakan <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">npx create-next-app@latest</code> atau clone repository dari GitHub.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleCheck('install-deps')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['install-deps'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['install-deps'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">2. Instalasi Dependencies</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Jalankan <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">npm install</code> untuk mengunduh seluruh pustaka (Zustand, Howler, Lucide React, dll).
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleCheck('run-dev')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['run-dev'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['run-dev'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">3. Jalankan Server Lokal (npm run dev)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Uji coba aplikasi di browser dengan membuka <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">http://localhost:3000</code>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Phase 3: Deployment to Vercel */}
            <section id="phase-3" className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                  <Server size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-1">Fase 3: Publikasi & Deployment ke Vercel</h2>
                  <p className="text-sm text-slate-500">Membawa karya Anda online ke seluruh dunia</p>
                </div>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={() => toggleCheck('github-push')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['github-push'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['github-push'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">1. Push Kode ke GitHub Repository</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Lakukan <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">git init</code>, commit, dan push kode Anda ke repository GitHub publik atau privat.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleCheck('vercel-deploy')}
                  className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${checklist['vercel-deploy'] ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/50'}`}
                >
                  <button className="mt-0.5 text-purple-700">
                    {checklist['vercel-deploy'] ? <CheckCircle2 size={20} className="text-purple-700" /> : <Circle size={20} className="text-slate-400" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">2. Deploy Instan via Vercel</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Buka <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-purple-700 underline">vercel.com</a>, pilih import project dari GitHub, dan klik <strong>Deploy</strong>. Selesai!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Action Bottom */}
          <div className="mt-12 text-center">
            <Link 
              to="/academy" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-purple-900 transition-colors shadow-sm"
            >
              Kembali ke Halaman Academy <ArrowRight size={18} />
            </Link>
          </div>
        </main>
      </div>
      <FooterSection />
    </div>
  );
}
