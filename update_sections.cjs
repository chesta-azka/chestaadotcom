const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

const sections = [
  { name: 'TechStackSection', class: 'bg-slate-900 text-white' },
  { name: 'PricingSection', class: 'bg-white' },
  { name: 'ProcessSection', class: 'bg-white' },
  { name: 'TestimonialSection', class: 'bg-white' },
  { name: 'FAQSection', class: 'bg-white' },
  { name: 'CTASection', class: 'bg-indigo-600 text-white' }
];

sections.forEach(sec => {
  // Add snap-start min-h-screen flex flex-col justify-center
  code = code.replace(
    new RegExp(`function ${sec.name}\\(\\) {\\s*return \\(\\s*<section className="([^"]+)"`),
    (match, p1) => {
      let newClass = p1;
      if (!newClass.includes('snap-start')) newClass += ' snap-start min-h-screen flex flex-col justify-center';
      return match.replace(p1, newClass);
    }
  );
  
  // Add magnetic effects and glass-panel where appropriate
  if (sec.name === 'PricingSection') {
      code = code.replace(
        /<div key=\{i\} className=\{`p-10 rounded-\[40px\] border/g,
        '<motion.div whileHover={{scale: 1.05}} key={i} className={`p-10 rounded-[40px] border glass-panel'
      );
      code = code.replace(/<div key=\{i\} className=\{`/g, '<motion.div whileHover={{scale: 1.05}} key={i} className={`');
      code = code.replace(/<\/div>\s*<\/div>\s*<\/section>/, '</motion.div></div></section>');
  } else if (sec.name === 'ProcessSection') {
      code = code.replace(
          /className="relative bg-white border border-slate-100 p-8 rounded-\[32px\] hover:shadow-xl hover:shadow-slate-200\/50 transition-shadow"/g,
          'className="relative glass-panel p-8 rounded-[32px]" whileHover={{y: -10}}'
      );
      code = code.replace(/<motion\.div/g, '<motion.div whileHover={{y: -10}}'); // Wait, already added.
  }
});

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
console.log('Sections updated.');
