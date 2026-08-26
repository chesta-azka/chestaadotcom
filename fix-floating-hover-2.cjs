const fs = require('fs');

let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

code = code.replace(
  /whileTap=\{\{ scale: 0\.95 \}\}\n        >/g,
  `whileTap={{ scale: 0.95 }}\n          onMouseEnter={() => setIsHovered(true)}\n          onMouseLeave={() => setIsHovered(false)}\n        >`
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
