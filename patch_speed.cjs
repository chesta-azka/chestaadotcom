const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target = `    if (isHumanRequest) {
      setIsTyping(true);
      try {
        addDoc(collection(db, 'chat_history'), {
          message: content,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          userId: user ? user.uid : 'anonymous'
        }).catch(err => console.error(err));
      } catch(e) {}
      
      setTimeout(() => {
         const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Connecting you to our Principal Engineer...' }];
         setChatHistory(newHistory);
         saveSessionToFirestore(newHistory, { requiresHuman: true, humanRequestedAt: serverTimestamp() });
         setIsTyping(false);
      }, 1000);
      return;
    }`;

const replacement = `    if (isHumanRequest) {
      try {
        addDoc(collection(db, 'chat_history'), {
          message: content,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          userId: user ? user.uid : 'anonymous'
        }).catch(err => console.error(err));
      } catch(e) {}
      
      const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Connecting you to our Principal Engineer...' }];
      setChatHistory(newHistory);
      saveSessionToFirestore(newHistory, { requiresHuman: true, humanRequestedAt: serverTimestamp() });
      return;
    }`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched handoff speed");
} else {
  console.log("Target not found!");
}
