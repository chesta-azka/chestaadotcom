const fs = require('fs');
const content = fs.readFileSync('src/components/organisms/HeroSection.tsx', 'utf-8');

let newContent = content.replace(
  `              rel="noopener noreferrer"
              style={isMobile ? {} : { x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={ctaMouseLeave}
              whileHover={isMobile ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}`,
  `              rel="noopener noreferrer"
              onClick={(e) => handleWhatsAppClick(e, 'project')}
              style={isMobile ? {} : { x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={ctaMouseLeave}
              whileHover={isMobile ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.96 }}`
);

newContent = newContent.replace(
  `            {/* Secondary CTA - IT Consultancy */}
            <a
              href={whatsappITUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-purple-950 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-slate-200 hover:border-purple-200 shadow-sm transition-all cursor-pointer w-full sm:w-auto"
            >`,
  `            {/* Secondary CTA - IT Consultancy */}
            <a
              href={whatsappITUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleWhatsAppClick(e, 'consulting')}
              className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-purple-950 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-slate-200 hover:border-purple-200 shadow-sm transition-all cursor-pointer w-full sm:w-auto"
            >`
);

fs.writeFileSync('src/components/organisms/HeroSection.tsx', newContent);
