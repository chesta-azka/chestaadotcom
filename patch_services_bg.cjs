const fs = require('fs');
let services = fs.readFileSync('src/components/organisms/ServicesSection.tsx', 'utf-8');

services = services.replace(
  '<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />',
  '<div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent pointer-events-none" />'
);

services = services.replace(
  '<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.02),transparent_40%)] pointer-events-none" />',
  '<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.05),transparent_40%)] pointer-events-none" />'
);

fs.writeFileSync('src/components/organisms/ServicesSection.tsx', services);
console.log('Patched Services Background for Glassmorphism');
