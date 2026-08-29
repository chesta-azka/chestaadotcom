const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target1 = `  const saveSessionToFirestore = async (history: ChatMessage[]) => {`;
const replacement1 = `  useEffect(() => {
    if (!sessionId) return;
    const sessionRef = doc(db, 'ai_chat_sessions', sessionId);
    const unsub = onSnapshot(sessionRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.messages) {
          // Only update if length differs or to receive admin messages
          setChatHistory(prev => {
             // Basic merge strategy: trust firestore if it has more messages
             if (data.messages.length > prev.length) {
               return data.messages;
             }
             // Or if human took over, we might need to sync exactly
             if (data.humanTakeover) {
               return data.messages;
             }
             return prev;
          });
        }
      }
    });
    return unsub;
  }, [sessionId]);

  const saveSessionToFirestore = async (history: ChatMessage[], extraFields = {}) => {`;
code = code.replace(target1, replacement1);

const target2 = `        messages: history,
        lastUpdated: serverTimestamp(),
        userId: user ? user.uid : 'anonymous',
        userAgent: navigator.userAgent`;
const replacement2 = target2 + `,
        ...extraFields`;
code = code.replace(target2, replacement2);

const target3 = `    setChatHistory(prev => [...prev, { role: 'user', content }]);
    setMessage('');
    
    // Optimistic UI state: add empty AI message and show typing
    setChatHistory(prev => [...prev, { role: 'ai', content: '' }]);
    setIsTyping(true);

    try {
      const apiMessages = [...chatHistory, { role: 'user', content }].map(m => ({`;
const replacement3 = `    const isHumanRequest = /human|admin|person|negotiate|support|help|manusia|bantuan|cs|orang/i.test(content);
    
    setChatHistory(prev => [...prev, { role: 'user', content }]);
    setMessage('');
    
    if (isHumanRequest) {
      setIsTyping(true);
      setTimeout(() => {
         const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Connecting you to our Principal Engineer...' }];
         setChatHistory(newHistory);
         saveSessionToFirestore(newHistory, { requiresHuman: true, humanRequestedAt: serverTimestamp() });
         setIsTyping(false);
      }, 1000);
      return;
    }
    
    // Optimistic UI state: add empty AI message and show typing
    setChatHistory(prev => [...prev, { role: 'ai', content: '' }]);
    setIsTyping(true);

    try {
      const apiMessages = [...chatHistory, { role: 'user', content }].map(m => ({`;
code = code.replace(target3, replacement3);

// Fix call to saveSessionToFirestore inside handleFeedback
code = code.replace(`saveSessionToFirestore(newHistory);`, `saveSessionToFirestore(newHistory, {});`);

// Fix call to saveSessionToFirestore after streaming finishes
code = code.replace(`saveSessionToFirestore(newHistory);`, `saveSessionToFirestore(newHistory, {});`);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
console.log('FloatingAIAssistant patched.');
