const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

// 1. Import Firebase
const importFirebase = `import { db } from '../../lib/firebase';\nimport { collection, addDoc, serverTimestamp } from 'firebase/firestore';\n`;
if (!code.includes("import { db }")) {
  code = code.replace(/import React[^;]+;/, match => match + '\n' + importFirebase);
}

// 2. Replace TypewriterMarkdown
const oldTypewriterRegex = /const TypewriterMarkdown = \(\{ content, onComplete \}: \{ content: string, onComplete: \(\) => void \}\) => \{[\s\S]*?return \([\s\S]*?\}\);\n\};/;

const newTypewriter = `const TypewriterMarkdown = ({ content, onComplete }: { content: string, onComplete: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      
      const targetLength = Math.floor(elapsed / 15) * 3;
      
      if (targetLength >= content.length) {
        setDisplayed(content);
        onComplete();
      } else {
        setDisplayed(content.slice(0, targetLength));
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [content, onComplete]);
  
  return (
    <div className="break-words [word-break:break-word] overflow-hidden max-w-full leading-relaxed space-y-2 text-[13px]"><ReactMarkdown components={markdownComponents}>
      {displayed + (displayed.length < content.length ? ' ▋' : '')}
    </ReactMarkdown></div>
  );
};`;
code = code.replace(oldTypewriterRegex, newTypewriter);

// 3. State update for chat history
const oldState = `  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{
    role: 'ai',
    content: 'Halo! Saya asisten AI CHESTADOTCOM. Ada yang bisa saya bantu terkait pembuatan website atau agen AI?'
  }]);`;
const newState = `  const defaultHistory: ChatMessage[] = [{
    role: 'ai',
    content: 'Halo! Saya asisten AI CHESTADOTCOM. Ada yang bisa saya bantu terkait pembuatan website atau agen AI?'
  }];
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultHistory;
  });

  useEffect(() => {
    sessionStorage.setItem('ai_chat_history', JSON.stringify(chatHistory));
  }, [chatHistory]);`;
if (code.includes(oldState)) {
  code = code.replace(oldState, newState);
}

// 4. Update handleSendMessage to add to Firestore
const oldIsTyping = `setIsTyping(true);`;
const addDocCode = `setIsTyping(true);

    try {
      addDoc(collection(db, 'chat_logs'), {
        message: content,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      }).catch(err => console.error(err));
    } catch(e) {}`;
if (!code.includes("addDoc(collection(db, 'chat_logs')")) {
  code = code.replace(oldIsTyping, addDocCode);
}

// 5. Update ChatMessage styles
code = code.replace(/className=\{\`group relative max-w-\[85%\]/g, `className={\`group relative max-w-[85%] break-words [word-break:break-word] overflow-hidden`);

fs.writeFileSync(path, code);
