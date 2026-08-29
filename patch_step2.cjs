const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const targetStr = `  const handleSendMessage = async (e?: React.FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    const content = presetMessage || message;
    if (!content.trim()) return;

    setChatHistory(prev => [...prev, { role: 'user', content }]);
    setMessage('');
    
    // Optimistic UI state: add empty AI message and show typing
    setChatHistory(prev => [...prev, { role: 'ai', content: '' }]);
    setIsTyping(true);

    try {
      addDoc(collection(db, 'chat_history'), {
        message: content,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        userId: user ? user.uid : 'anonymous'
      }).catch(err => console.error(err));
    } catch(e) {}`;

const replaceStr = `  const handleSendMessage = async (e?: React.FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    const content = presetMessage || message;
    if (!content.trim()) return;

    const isHumanRequest = /human|admin|person|negotiate|support|help|manusia|bantuan|cs|orang/i.test(content);

    setChatHistory(prev => [...prev, { role: 'user', content }]);
    setMessage('');

    if (isHumanRequest) {
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
    }
    
    // Optimistic UI state: add empty AI message and show typing
    setChatHistory(prev => [...prev, { role: 'ai', content: '' }]);
    setIsTyping(true);

    try {
      addDoc(collection(db, 'chat_history'), {
        message: content,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        userId: user ? user.uid : 'anonymous'
      }).catch(err => console.error(err));
    } catch(e) {}`;

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
console.log('Patched handleSendMessage');
