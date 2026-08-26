const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// The framer-motion variants have strict types for type: "spring" and ease.
// We can cast them as any or just use standard Typescript type casting if we had access to the file.
// Wait, we are already using a .tsx file so we can cast `as any`.
code = code.replace(
  'type: "spring", stiffness: 100, damping: 14, mass: 1,',
  'type: "spring" as any, stiffness: 100, damping: 14, mass: 1,'
);

code = code.replace(
  'transition: { duration: 0.6, ease: "easeOut" }',
  'transition: { duration: 0.6, ease: "easeOut" as any }'
);

code = code.replace(
  'ease: "easeInOut"',
  'ease: "easeInOut" as any'
);

// Specifically target the ease in GlassReveal
code = code.replace(
  'ease: [0.22, 1, 0.36, 1]',
  'ease: [0.22, 1, 0.36, 1] as any'
);


fs.writeFileSync('src/pages/ServicesPage.tsx', code);
