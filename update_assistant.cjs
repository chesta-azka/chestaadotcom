const fs = require('fs');

let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// 1. Update ChatMessage type
content = content.replace(
  "type ChatMessage = {\n  role: 'ai' | 'user';\n  content: string;\n};",
  "type ChatMessage = {\n  role: 'ai' | 'user';\n  content: string;\n  feedback?: 'up' | 'down';\n};"
);

// 2. Import ThumbsUp, ThumbsDown
content = content.replace(
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle } from 'lucide-react';",
  "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';"
);

// 3. Update MemoizedChatMessage props
const msgPropsRegex = /onActionClick:\s*\(\w+:\s*string\)\s*=>\s*void;\n}\)/;
content = content.replace(
  msgPropsRegex,
  "onActionClick: (text: string) => void;\n  onFeedback: (type: 'up' | 'down') => void;\n})"
);

const msgParamsRegex = /isLast,\n\s*onActionClick\n}:/g;
content = content.replace(
  msgParamsRegex,
  "isLast,\n  onActionClick,\n  onFeedback\n}:"
);

// 4. Update the render logic of MemoizedChatMessage for feedback and copy button side by side
const copyButtonRegex = /\{msg\.role === 'ai' && !isTyping && \(\s*<button[\s\S]*?Salin\s*<\/button>\s*\)\}/;
const newCopyAndFeedback = `
        {msg.role === 'ai' && !isTyping && (
          <div className="absolute -bottom-7 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
            <button 
              onClick={() => { navigator.clipboard.writeText(displayContent); toast.success('Disalin ke papan klip'); }}
              className="text-slate-400 hover:text-purple-600 flex items-center gap-1 text-[10px] bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200 transition-colors"
              title="Salin pesan"
            >
              <Copy size={10} /> Salin
            </button>
            <button 
              onClick={() => onFeedback('up')}
              className={\`flex items-center justify-center w-6 h-6 rounded-md shadow-sm border transition-colors \${msg.feedback === 'up' ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-white border-slate-200 text-slate-400 hover:text-purple-600 hover:bg-slate-50'}\`}
              title="Jawaban bagus"
            >
              <ThumbsUp size={10} className={msg.feedback === 'up' ? "fill-purple-700" : ""} />
            </button>
            <button 
              onClick={() => onFeedback('down')}
              className={\`flex items-center justify-center w-6 h-6 rounded-md shadow-sm border transition-colors \${msg.feedback === 'down' ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-slate-200 text-slate-400 hover:text-red-600 hover:bg-slate-50'}\`}
              title="Jawaban buruk"
            >
              <ThumbsDown size={10} className={msg.feedback === 'down' ? "fill-red-700" : ""} />
            </button>
          </div>
        )}
`;
content = content.replace(copyButtonRegex, newCopyAndFeedback);

// 5. Update MemoizedChatMessage dependency array
content = content.replace(
  "prevProps.isLast === nextProps.isLast;",
  "prevProps.isLast === nextProps.isLast && prevProps.msg.feedback === nextProps.msg.feedback;"
);

// 6. Add Firestore sync to FloatingAIAssistant
// We need imports
content = content.replace(
  "import { collection, addDoc, serverTimestamp } from 'firebase/firestore';",
  "import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';"
);

// We need a session ID
const initChatHistoryRegex = /const \[chatHistory, setChatHistory\] = useState<ChatMessage\[\]>\(\[\]\);/;
const newInit = `  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('ai_session_id');
    if (!id) {
      id = 'session_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('ai_session_id', id);
    }
    return id;
  });

  // Load chat history from Firestore
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const docRef = doc(db, 'ai_chat_sessions', sessionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.messages && Array.isArray(data.messages)) {
            setChatHistory(data.messages);
          }
        }
      } catch (e) {
        console.error("Error loading chat:", e);
      }
    };
    fetchHistory();
  }, [sessionId]);

  // Save chat history to Firestore whenever it changes
  useEffect(() => {
    if (chatHistory.length === 0) return;
    const saveHistory = async () => {
      try {
        await setDoc(doc(db, 'ai_chat_sessions', sessionId), {
          messages: chatHistory,
          lastUpdated: serverTimestamp(),
          userAgent: navigator.userAgent
        }, { merge: true });
      } catch (e) {
        console.error("Error saving chat:", e);
      }
    };
    // Debounce slightly
    const timer = setTimeout(saveHistory, 500);
    return () => clearTimeout(timer);
  }, [chatHistory, sessionId]);

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    setChatHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[index].feedback === type) {
        delete newHistory[index].feedback; // toggle off
      } else {
        newHistory[index].feedback = type;
      }
      return newHistory;
    });
  };
`;
content = content.replace(initChatHistoryRegex, newInit);

// 7. Remove the old sessionStorage logic
content = content.replace(
  /useEffect\(\(\) => \{\n\s*sessionStorage\.setItem\('ai_chat_history', JSON\.stringify\(chatHistory\)\);\n\s*\}, \[chatHistory\]\);/,
  ""
);

// 8. Pass handleFeedback to MemoizedChatMessage
const memoPropsRegex = /onActionClick=\{\(text\) => handleSendMessage\(undefined, text\)\}\n\s*\/>/g;
content = content.replace(
  memoPropsRegex,
  "onActionClick={(text) => handleSendMessage(undefined, text)}\n                    onFeedback={(type) => handleFeedback(i, type)}\n                  />"
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
console.log('FloatingAIAssistant updated with Firestore persistence and Feedback buttons');
