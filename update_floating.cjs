const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

// Change chat_logs to chat_history
code = code.replace(/collection\(db, 'chat_logs'\)/g, "collection(db, 'chat_history')");

const oldFetch = /const response = await fetch\('\/api\/chat', \{[\s\S]*?\}\);[\s\S]*?setTypewriterIndex\(chatHistory\.length \+ 1\);/g;

const newFetch = `
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal memproses permintaan.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let aiMessage = "";
      
      setChatHistory(prev => {
        const newHistory = [...prev, { role: 'ai', content: "" }];
        return newHistory;
      });
      // We will not use the Typewriter component for streamed responses since they naturally typewriter
      setIsTyping(false); 

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\\n\\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.substring(6);
              if (dataStr === '[DONE]') break;
              try {
                const data = JSON.parse(dataStr);
                if (data.text) {
                  aiMessage += data.text;
                  setChatHistory(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = aiMessage;
                    return updated;
                  });
                }
              } catch (e) {}
            }
          }
        }
      }
`;

code = code.replace(oldFetch, newFetch);

// Remove the Typewriter component dependency from streamed chunks by skipping typewriterIndex logic
// Or simply ensuring it doesn't break if typewriterIndex is not set.

fs.writeFileSync(path, code);
