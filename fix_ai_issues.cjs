const fs = require('fs');

// 1. Fix FloatingAIAssistant.tsx
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// Use localStorage instead of sessionStorage
content = content.replace(/sessionStorage/g, 'localStorage');

// Add pagePath and pageTitle to the API request
content = content.replace(
  /body: JSON\.stringify\(\{ messages: apiMessages \}\)/,
  'body: JSON.stringify({ messages: apiMessages, pagePath: window.location.pathname, pageTitle: document.title })'
);

// Listen for global command palette trigger
const useEffectListener = `  useEffect(() => {
    const handleOpenAiChat = (e: any) => {
      if (e.detail?.message) {
        setIsOpen(true);
        setMessage(e.detail.message);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    window.addEventListener('open-ai-chat', handleOpenAiChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenAiChat);
  }, []);`;

// Insert the new useEffect just before handleSendMessage
const handleSendMessageIndex = content.indexOf('  const handleSendMessage = async');
if (handleSendMessageIndex !== -1) {
  content = content.substring(0, handleSendMessageIndex) + useEffectListener + '\n\n' + content.substring(handleSendMessageIndex);
}

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
console.log('FloatingAIAssistant updated');

// 2. Fix server.ts to use pagePath and pageTitle
let serverContent = fs.readFileSync('server.ts', 'utf-8');
const chatRouteStr = 'app.post("/api/chat", async (req, res) => {';
const destructureStr = '  const { messages } = req.body;';
const destructureIdx = serverContent.indexOf(destructureStr, serverContent.indexOf(chatRouteStr));

if (destructureIdx !== -1) {
  serverContent = serverContent.replace(
    '  const { messages } = req.body;',
    '  const { messages, pagePath, pageTitle } = req.body;'
  );
  
  // Modify system prompt
  const sysPromptRegex = /const systemPrompt = "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM[^"]*";/;
  serverContent = serverContent.replace(
    sysPromptRegex,
    `const systemPrompt = \`Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. DILARANG KERAS memberikan pertanyaan di akhir jawaban. Jika memberikan pilihan, selalu akhiri jawaban dengan opsi untuk diklik user. Saat ini user sedang berada di halaman "\${pageTitle || 'Beranda'}" (Path: \${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan jawaban yang lebih relevan jika perlu.\`;`
  );
}

fs.writeFileSync('server.ts', serverContent);
console.log('server.ts updated');
