const fs = require('fs');

let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

// Add the state
code = code.replace(/const \[showHistory, setShowHistory\] = useState\(false\);/, 
  'const [showHistory, setShowHistory] = useState(false);\n  const [isHumanTakeover, setIsHumanTakeover] = useState(false);');

// Update state in onSnapshot
code = code.replace(/if \(data\.messages\) \{/g, 
  `if (data.humanTakeover === true) { setIsHumanTakeover(true); } else { setIsHumanTakeover(false); }\n        if (data.messages) {`);

// Bypass AI API if isHumanTakeover
const humanRequestBlock = `      return;
    }

    if (isHumanTakeover) {
      const newHistory = [...chatHistory, { role: 'user', content }];
      saveSessionToFirestore(newHistory, {});
      return;
    }`;
code = code.replace(/      return;\n    \}\n\n    \/\/ Optimistic UI state/g, 
  `${humanRequestBlock}\n\n    // Optimistic UI state`);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
console.log('Patched FloatingAIAssistant.tsx');
