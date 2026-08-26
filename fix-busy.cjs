const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

code = code.replace(
  /const \[typewriterIndex, setTypewriterIndex\] = useState<number \| null>\(null\);\n  const messagesEndRef = useRef<HTMLDivElement>\(null\);/g,
  `const [typewriterIndex, setTypewriterIndex] = useState<number | null>(null);\n  const isBusy = isTyping || typewriterIndex !== null;\n  const messagesEndRef = useRef<HTMLDivElement>(null);`
);

code = code.replace(
  /disabled=\{isTyping\}/g,
  `disabled={isBusy}`
);

code = code.replace(
  /disabled=\{\!message\.trim\(\) \|\| isTyping\}/g,
  `disabled={!message.trim() || isBusy}`
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
console.log('Successfully updated isBusy state');
