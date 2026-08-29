const fs = require('fs');

let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// 1. Fetching Knowledge Base
const hookStr = `  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);`;
const fetchKnowledgeStr = `
  const [knowledgeBase, setKnowledgeBase] = useState<string>('');
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'ai_knowledge_base'), (snap) => {
      const activeSnippets = snap.docs.map(d => d.data()).filter(d => d.active).map(d => d.content);
      setKnowledgeBase(activeSnippets.join('\\n\\n'));
    });
    return () => unsub();
  }, []);
`;
content = content.replace(hookStr, fetchKnowledgeStr + hookStr);

// 2. Add systemContext to payload
content = content.replace(
  "body: JSON.stringify({ messages: apiMessages, pagePath: window.location.pathname, pageTitle: document.title })",
  "body: JSON.stringify({ messages: apiMessages, pagePath: window.location.pathname, pageTitle: document.title, systemContext: knowledgeBase })"
);

// 3. Improve option parsing
const parsingStartStr = `  // Parsing <opsi> tags`;
const parsingLogic = `  // Parsing <opsi> tags and numbered lists
  let displayContent = msg.content;
  const choices: string[] = [];
  
  if (msg.role === 'ai') {
    // 1. Extract <opsi>
    const opsiRegex = /<opsi>(.*?)<\\/opsi>/g;
    let match;
    while ((match = opsiRegex.exec(msg.content)) !== null) {
      if (match[1].trim()) choices.push(match[1].trim());
    }
    displayContent = displayContent.replace(/<opsi>.*?<\\/opsi>\\n?/g, '');

    // 2. Fallback: extract numbered lists at the end of the message (1. xxx \\n 2. yyy)
    if (choices.length === 0) {
      const lines = displayContent.split('\\n');
      const possibleChoices = [];
      let i = lines.length - 1;
      // traverse from bottom up to find contiguous numbered list
      while (i >= 0) {
        const line = lines[i].trim();
        if (!line) { i--; continue; }
        const numMatch = line.match(/^\\*?\\d+\\.\\s*\\*?\\*?(.*)/);
        if (numMatch) {
           let choiceText = numMatch[1].replace(/\\*/g, '').trim();
           possibleChoices.unshift(choiceText);
           i--;
        } else {
           break;
        }
      }
      
      // If we found a numbered list at the end and it has options
      if (possibleChoices.length > 0 && possibleChoices.length <= 4) { // usually 2-3 options
         choices.push(...possibleChoices);
         // Remove them from displayContent
         displayContent = lines.slice(0, i + 1).join('\\n');
      }
    }
    
    displayContent = displayContent.trim();
  }
`;

const parsingRegex = /\s*\/\/\s*Parsing <opsi> tags\s*let displayContent = msg\.content;\s*const choices:\s*string\[\] = \[\];\s*if\s*\(msg\.role === 'ai'\)\s*\{\s*const opsiRegex = \/<opsi>\(\.\*\?\)<\/opsi>\/g;\s*let match;\s*while\s*\(\(match = opsiRegex\.exec\(msg\.content\)\) !== null\)\s*\{\s*if\s*\(match\[1\]\.trim\(\)\)\s*\{\s*choices\.push\(match\[1\]\.trim\(\)\);\s*\}\s*\}\s*\/\/\s*Remove <opsi> tags from the display content\s*displayContent = msg\.content\.replace\(\/<opsi>\.\*\?<\/opsi>\\n\?\/g,\s*''\)\.trim\(\);\s*\}/;

content = content.replace(parsingRegex, parsingLogic);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
console.log('FloatingAIAssistant parsing updated');
