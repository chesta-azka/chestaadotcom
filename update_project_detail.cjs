const fs = require('fs');
let code = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf8');

// Replace paragraphs to include leading-relaxed and mb-4
code = code.replace(
  /className="text-\[15px\] text-slate-600 leading-loose mb-6"/g,
  'className="text-[15px] sm:text-base text-slate-700 leading-relaxed sm:leading-loose mb-4 sm:mb-6"'
);

// Ensure sections use motion.section with viewport trigger for scroll into view
code = code.replace(
  /<motion\.section variants=\{fadeUpVariant\}>/g,
  '<motion.section variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>'
);

fs.writeFileSync('src/pages/ProjectDetailPage.tsx', code);
console.log('Updated ProjectDetailPage with scroll stagger and paragraph readability');
