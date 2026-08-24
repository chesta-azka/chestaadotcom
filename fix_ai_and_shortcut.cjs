const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

// Fix API Payload
const oldFetch = `      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content, history: chatHistory }),
      });`;

const newFetch = `      const apiMessages = [...chatHistory, { role: 'user', content }].map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });`;

code = code.replace(oldFetch, newFetch);

// Add inputRef and useEffect for keyboard shortcut
const oldStateDec = `  const [showPricing, setShowPricing] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();`;

const newStateDec = `  const [showPricing, setShowPricing] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 300); // slight delay to allow animation to complete
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);`;

code = code.replace(oldStateDec, newStateDec);

// Add ref to input
const oldInput = `                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}`;
const newInput = `                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}`;

code = code.replace(oldInput, newInput);

fs.writeFileSync(path, code);
