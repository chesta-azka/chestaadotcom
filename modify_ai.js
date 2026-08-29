const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// 1. Remove TypewriterMarkdown component
const typewriterStart = content.indexOf('const TypewriterMarkdown =');
const typewriterEnd = content.indexOf('const MemoizedChatMessage =');
if (typewriterStart !== -1 && typewriterEnd !== -1) {
  content = content.substring(0, typewriterStart) + content.substring(typewriterEnd);
}

// 2. Modify MemoizedChatMessage to remove TypewriterMarkdown
content = content.replace(
  /\{msg\.role === 'ai' \? \([\s\S]*?isTyping \? \([\s\S]*?<TypewriterMarkdown content=\{msg\.content\} onComplete=\{onComplete\} \/>[\s\S]*?\) : \([\s\S]*?<div className="break-words leading-relaxed space-y-2 text-\[13px\]"><ReactMarkdown components=\{markdownComponents\}>[\s\S]*?\{msg\.content\}[\s\S]*?<\/ReactMarkdown><\/div>[\s\S]*?\)[\s\S]*?\) : \(/,
  `{msg.role === 'ai' ? (
          <div className="break-words leading-relaxed space-y-2 text-[13px]"><ReactMarkdown components={markdownComponents}>
            {msg.content + (isTyping ? ' ▋' : '')}
          </ReactMarkdown></div>
        ) : (`
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
