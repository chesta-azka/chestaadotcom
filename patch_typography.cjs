const fs = require('fs');
let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

code = code.replace(
  /leading-\[1\.68\] sm:leading-\[1\.72\]/g,
  'leading-loose'
);

code = code.replace(
  /tracking-\[-0\.014em\] mb-10/g,
  'tracking-[-0.014em] mb-14'
);

code = code.replace(
  /tracking-\[-0\.014em\] mb-12/g,
  'tracking-[-0.014em] mb-16'
);

fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Updated typography');
