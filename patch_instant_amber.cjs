const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target = `      const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Connecting you to our Principal Engineer...' }];
      setChatHistory(newHistory);
      saveSessionToFirestore(newHistory, { requiresHuman: true, humanRequestedAt: serverTimestamp() });
      return;`;

const replacement = `      const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Tersambung! Principal Engineer kami akan segera merespons pesan Anda.' }];
      setChatHistory(newHistory);
      setIsHumanTakeover(true); // Instant Amber UI!
      saveSessionToFirestore(newHistory, { requiresHuman: true, humanRequestedAt: serverTimestamp() });
      return;`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched instant amber");
} else {
  console.log("Target not found!");
}
