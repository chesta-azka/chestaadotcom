const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const targetTyping = `          msg.content === '' && isTyping ? (
            <div className="flex items-center gap-1.5 h-6 px-1">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-[11px] font-medium text-purple-600/70 ml-1 animate-pulse">Memproses...</span>
            </div>
          ) : (`;

const replTyping = `          msg.content === '' && isTyping ? (
            <div className="flex flex-col gap-2 w-[180px] py-1">
              <div className="h-2 bg-purple-100 rounded-full animate-pulse w-3/4"></div>
              <div className="h-2 bg-purple-100 rounded-full animate-pulse w-full"></div>
              <div className="h-2 bg-purple-100 rounded-full animate-pulse w-5/6"></div>
            </div>
          ) : (`;

content = content.replace(targetTyping, replTyping);
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
