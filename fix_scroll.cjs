const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// Find the scrollToBottom useEffect
const scrollStart = content.indexOf('  const scrollToBottom = () => {');
const scrollEnd = content.indexOf('  const handleSendMessage = async (e?: React.FormEvent, presetMessage?: string) => {');

const newScroll = `  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  useEffect(() => {
    // When typing, we want to auto-scroll instantly (auto) to avoid jitter, 
    // when done, we smoothly scroll.
    scrollToBottom(!isTyping);
  }, [chatHistory, isTyping]);

  // Use a resize observer on the chat container to auto-scroll if it changes size (e.g. image loads or buttons appear)
  useEffect(() => {
    if (!messagesEndRef.current) return;
    const observer = new ResizeObserver(() => {
      scrollToBottom(false);
    });
    const parent = messagesEndRef.current.parentElement;
    if (parent) {
      observer.observe(parent);
    }
    return () => observer.disconnect();
  }, [isOpen]);

`;

if (scrollStart !== -1 && scrollEnd !== -1) {
  content = content.substring(0, scrollStart) + newScroll + content.substring(scrollEnd);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
  console.log('Scroll logic updated');
} else {
  console.log('Could not find scroll logic');
}
