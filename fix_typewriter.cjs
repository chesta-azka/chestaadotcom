const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// Find where to insert typewriter state
const startStr = "  // Grouping styles";
const hookStr = `  // ---- TYPEWRITER STATE ----
  const [typedContent, setTypedContent] = useState(isTyping ? '' : displayContent);

  useEffect(() => {
    if (!isTyping) {
      setTypedContent(displayContent);
      return;
    }
    
    const intervalId = setInterval(() => {
      setTypedContent((prev) => {
        if (prev.length < displayContent.length) {
          const charsToAdd = Math.floor(Math.random() * 2) + 1;
          return displayContent.slice(0, prev.length + charsToAdd);
        } else {
          clearInterval(intervalId);
          return prev;
        }
      });
    }, 15);

    return () => clearInterval(intervalId);
  }, [displayContent, isTyping]);

`;

content = content.replace(startStr, hookStr + startStr);

// Now replace usages of displayContent with typedContent where appropriate
// We only want to replace it for the markdown rendering, not the clipboard or choices
content = content.replace(
  '{displayContent + (isTyping ? \' ▋\' : \'\')}',
  '{typedContent + (isTyping ? \' ▋\' : \'\')}'
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
console.log('Typewriter effect added');
