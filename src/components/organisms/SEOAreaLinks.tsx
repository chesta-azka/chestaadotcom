import Link from 'next/link';
import { INDONESIA_CITIES, CORE_PSEO_SERVICES, generateSlug } from '../../data/pseo-indonesia';

export default function SEOAreaLinks() {
  // Select a robust subset of cities for the mega cross-linker grid to maintain clean spacing
  const displayedCities = INDONESIA_CITIES.slice(0, 12);

  return (
    <section className="bg-slate-50 border-t border-slate-200 py-20 px-6 sm:px-10 lg:px-16 w-full">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Headline */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-purple-600 uppercase tracking-widest block mb-2">
            JARINGAN NASIONAL PSEO
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Layanan Eksekutif Chestaa di Seluruh Indonesia
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            Infrastruktur digital enterprise, konsultan AI otonom, dan rekayasa perangkat lunak kelas dunia yang menjangkau korporasi di seluruh kota besar Indonesia.
          </p>
        </div>

        {/* Mega Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {displayedCities.map((city) => (
            <div key={city} className="flex flex-col space-y-3">
              <h3 className="font-display font-bold text-slate-900 text-sm tracking-tight border-b border-slate-200 pb-2">
                {city}
              </h3>
              <ul className="space-y-1 list-none p-0 m-0">
                {CORE_PSEO_SERVICES.map((service) => {
                  const slug = generateSlug(service.id, city);
                  return (
                    <li key={service.id}>
                      <Link
                        href={'/area/' + slug}
                        className="text-sm text-slate-500 hover:text-purple-600 transition-colors block py-1"
                      >
                        {service.name} di {city}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
