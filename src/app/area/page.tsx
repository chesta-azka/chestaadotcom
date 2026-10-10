import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Building2, Globe, ShieldCheck, Cpu } from 'lucide-react';
import { INDONESIA_CITIES, CORE_PSEO_SERVICES, generateSlug } from '../../data/pseo-indonesia';

export const metadata: Metadata = {
  title: 'Jangkauan Regional & Layanan Lokal | Chestaa Enterprise AI',
  description: 'Chestaa menghadirkan solusi transformasi digital dan otomatisasi AI khusus untuk perusahaan di berbagai kota besar di Indonesia termasuk BSD, Cisauk, dan Pemalang.',
};

export default function AreaHubPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
        
        {/* Header Section */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-wider">
            <Globe size={13} />
            <span>Jaringan Nasional Programmatic SEO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08] font-display">
            Solusi Enterprise untuk Seluruh Wilayah Indonesia
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
            Kami mengombinasikan standar teknologi global dengan pemahaman mendalam tentang pasar lokal untuk membantu perusahaan di setiap kota mendominasi ekosistem digital.
          </p>
        </div>

        {/* Target Regions Grid */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDONESIA_CITIES.map((city) => (
              <div 
                key={city} 
                className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <MapPin size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Regional Hub</span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-950 tracking-tight font-display">
                      {city}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Implementasi arsitektur digital dan otomasi AI prioritas untuk korporasi di wilayah {city} dan sekitarnya.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {CORE_PSEO_SERVICES.map((service) => (
                      <Link 
                        key={service.id}
                        href={'/area/' + generateSlug(service.id, city)}
                        className="flex items-center justify-between text-xs font-medium text-slate-600 hover:text-purple-700 py-2 border-b border-slate-50 last:border-0 transition-colors"
                      >
                        <span>{service.name}</span>
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={'/area/' + generateSlug('konsultan-ai', city)}
                    className="block w-full py-3.5 bg-slate-50 group-hover:bg-purple-600 text-slate-900 group-hover:text-white rounded-xl text-center text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Buka Landing Page {city}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Assurance Banner */}
        <div className="p-10 sm:p-16 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-900/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight font-display">
                Dimanapun Perusahaan Anda Berada, Kami Hadir Menjadi Partner Strategis.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Tim Chestaa melakukan audit teknis dan konsultasi arsitektur digital secara hybrid: pertemuan tatap muka di wilayah prioritas dan kolaborasi otonom jarak jauh yang efisien.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-purple-500" size={20} />
                  <span className="text-sm font-medium">Data Security Tier-4</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="text-purple-500" size={20} />
                  <span className="text-sm font-medium">99.9% System Uptime</span>
                </div>
              </div>
            </div>

            <div className="flex justify-start lg:justify-end">
              <a
                href="https://wa.me/6282125447232?text=Halo%20Chestaa,%20saya%20tertarik%20dengan%20layanan%20regional%20untuk%20perusahaan%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-purple-50 transition-all shadow-xl shadow-white/5"
              >
                Konsultasi Nasional Sekarang
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
