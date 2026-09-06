const fs = require('fs');
const path = 'src/components/organisms/Header.tsx';
let content = fs.readFileSync(path, 'utf8');

// The early return `if (location.pathname.startsWith('/academy')) return null;`
// is placed BEFORE the `useEffect` hooks, which violates the Rules of Hooks.
// We need to move it AFTER all hooks in the component.

// 1. Remove it from its current position
content = content.replace("  if (location.pathname.startsWith('/academy')) return null;\n", "");

// 2. Find the end of hooks (specifically before `const whatsappUrl`) and inject it there
content = content.replace(
  "  const whatsappUrl =",
  "  if (location.pathname.startsWith('/academy')) return null;\n\n  const whatsappUrl ="
);

fs.writeFileSync(path, content);
console.log('Fixed Rules of Hooks in Header.tsx');
