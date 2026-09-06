const fs = require('fs');

let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

// Replace the specific motion.div tags to add whileHover
code = code.replace(
  /<motion\.div variants=\{\{ hidden/g,
  '<motion.div whileHover={{ scale: 1.05 }} variants={{ hidden'
);

fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Patched Hover Animation');
