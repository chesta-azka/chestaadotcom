const fs = require('fs');
let text = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const target = `  const [isTyping, setIsTyping] = useState(false);
  const [showPricing, setShowPricing] = useState(false);`;

const replace = `  const [isTyping, setIsTyping] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState('');

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const q = query(collection(db, 'ai_knowledge_base'), where('active', '==', true));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const contents = snapshot.docs.map(doc => doc.data().content);
          setKnowledgeBase(contents.join('\\n\\n'));
        });
        return unsubscribe;
      } catch(e) {}
    };
    let unsub;
    fetchKnowledge().then(res => unsub = res);
    return () => { if (unsub) unsub(); };
  }, []);`;

text = text.replace(target, replace);
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', text);
