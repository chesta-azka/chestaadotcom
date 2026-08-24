const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
  /<ReactMarkdown\s+className="break-words leading-relaxed space-y-2 text-\[13px\]"\s+components={markdownComponents}\s*>/g,
  '<div className="break-words leading-relaxed space-y-2 text-[13px]"><ReactMarkdown components={markdownComponents}>'
);

code = code.replace(
  /<\/ReactMarkdown>/g,
  '</ReactMarkdown></div>'
);

fs.writeFileSync(path, code);
