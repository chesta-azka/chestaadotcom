const fs = require('fs');
let footer = fs.readFileSync('src/components/organisms/FooterSection.tsx', 'utf-8');

const targetCols = `          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Eksplorasi</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/projects" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Showcase Portfolio</Link></li>
              <li><Link to="/blog" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Artikel & Insights</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Informasi</h4>
            <ul className="space-y-5 text-sm font-sans text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-[#4f46e5] mt-0.5" />
                <span className="leading-relaxed">Jakarta, Indonesia.<br/>Remote Worldwide.</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-[#4f46e5]" />
                <span className="leading-relaxed">+62 821-2544-7232</span>
              </li>
            </ul>
          </div>`;

const replacementCols = `          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Eksplorasi</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/projects" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Showcase Portfolio</Link></li>
              <li><Link to="/blog" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Artikel & Insights</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Column 4: Local SEO Areas */}
          <div className="lg:col-span-1">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Area Layanan</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/area/tangerang" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Tangerang</Link></li>
              <li><Link to="/area/jakarta" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Jakarta</Link></li>
              <li><Link to="/area/bandung" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Bandung</Link></li>
              <li><Link to="/area/surabaya" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Surabaya</Link></li>
            </ul>
          </div>
          
          {/* Column 5: Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Informasi</h4>
            <ul className="space-y-5 text-sm font-sans text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-[#4f46e5] mt-0.5" />
                <span className="leading-relaxed">BSD City, Tangerang.<br/>Banten, Indonesia.</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-[#4f46e5]" />
                <span className="leading-relaxed">+62 821-2544-7232</span>
              </li>
            </ul>
          </div>`;

footer = footer.replace(targetCols, replacementCols);

// change grid-cols-12 to grid-cols-12 and span 5 to span 4 so it fits
footer = footer.replace('className="lg:col-span-5 space-y-8 pr-8"', 'className="lg:col-span-4 space-y-8 pr-8"');
footer = footer.replace('className="lg:col-span-2 lg:col-start-7"', 'className="lg:col-span-2 lg:col-start-6"');

fs.writeFileSync('src/components/organisms/FooterSection.tsx', footer);
console.log('Added area links to footer');
