const fs = require('fs');

function updateFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');
  for (const [regex, replacement] of replacements) {
    code = code.replace(regex, replacement);
  }
  fs.writeFileSync(filePath, code);
}

// 1. Header.tsx
updateFile('src/components/organisms/Header.tsx', [
  [/bg-white\/10 backdrop-blur-\[40px\]/g, 'bg-white/5 backdrop-blur-xl'],
  [/bg-white\/20 backdrop-blur-\[40px\]/g, 'bg-white/10 backdrop-blur-xl'],
  [/bg-white\/20 backdrop-blur-\[60px\]/g, 'bg-white/10 backdrop-blur-2xl'],
  [/bg-white\/20 before:backdrop-blur-xl/g, 'bg-white/10 before:backdrop-blur-xl'],
  [/border border-white\/60/g, 'border border-white/30'],
  [/ring-1 ring-white\/40/g, 'ring-1 ring-white/20'],
]);

// 2. FloatingAIAssistant.tsx
updateFile('src/components/organisms/FloatingAIAssistant.tsx', [
  [/bg-white\/20 backdrop-blur-\[60px\]/g, 'bg-white/10 backdrop-blur-2xl'],
  [/bg-white\/10 backdrop-blur-2xl shrink-0/g, 'bg-white/5 backdrop-blur-xl shrink-0'],
  [/bg-white\/10 backdrop-blur-2xl border-t/g, 'bg-white/5 backdrop-blur-xl border-t'],
  [/bg-white\/30 backdrop-blur-3xl/g, 'bg-white/10 backdrop-blur-xl'],
  [/bg-white\/70 backdrop-blur-md/g, 'bg-white/40 backdrop-blur-md'], // AI message bubble
  [/border border-white\/80/g, 'border border-white/30'],
  [/ring-1 ring-white\/50/g, 'ring-1 ring-white/20'],
  [/border-white\/40/g, 'border-white/20'],
]);

// 3. CommandPalette.tsx
updateFile('src/components/organisms/CommandPalette.tsx', [
  [/bg-white\/10 backdrop-blur-\[60px\]/g, 'bg-white/5 backdrop-blur-2xl'],
  [/bg-white\/10 backdrop-blur-3xl/g, 'bg-white/5 backdrop-blur-xl'],
  [/border border-white\/80/g, 'border border-white/30'],
  [/ring-1 ring-white\/50/g, 'ring-1 ring-white/20'],
  [/border-white\/20/g, 'border-white/10'],
]);

// 4. Breadcrumbs.tsx
updateFile('src/components/atoms/Breadcrumbs.tsx', [
  [/bg-white\/30 backdrop-blur-2xl/g, 'bg-white/10 backdrop-blur-xl'],
  [/border border-white\/60/g, 'border border-white/30'],
  [/ring-1 ring-white\/50/g, 'ring-1 ring-white/20'],
]);

// 5. QuickQuoteModal.tsx
updateFile('src/components/organisms/QuickQuoteModal.tsx', [
  [/bg-white\/40 backdrop-blur-3xl/g, 'bg-white/10 backdrop-blur-2xl'],
  [/border border-white\/60/g, 'border border-white/30'],
  [/ring-1 ring-white\/50/g, 'ring-1 ring-white/20'],
  [/bg-white\/50 backdrop-blur-md/g, 'bg-white/20 backdrop-blur-md'], // Close button
  [/border border-white\/80/g, 'border border-white/30'],
  [/bg-white\/40 backdrop-blur-md shadow-sm/g, 'bg-white/10 backdrop-blur-md shadow-sm'], // Inputs
]);

