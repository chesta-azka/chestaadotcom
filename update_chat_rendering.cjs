const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// 1. Rewrite MemoizedChatMessage
const chatMsgStart = content.indexOf('const MemoizedChatMessage = memo');
const chatMsgEnd = content.indexOf('export default function FloatingAIAssistant() {');

if (chatMsgStart === -1 || chatMsgEnd === -1) {
  console.error("Could not find MemoizedChatMessage");
  process.exit(1);
}

const newChatMessage = `const MemoizedChatMessage = memo(({ 
  msg, 
  isTyping, 
  isFirst,
  isLast,
  onActionClick
}: { 
  msg: ChatMessage; 
  isTyping: boolean; 
  isFirst: boolean;
  isLast: boolean;
  onActionClick: (text: string) => void;
}) => {
  // Parsing explicit options provided by AI
  const getChoices = (text: string) => {
    const choices = [];
    const lower = text.toLowerCase();
    
    // Scan for option patterns
    if (lower.includes('ketik 1') || lower.match(/\\b1\\.\\s/)) choices.push('1');
    if (lower.includes('ketik 2') || lower.match(/\\b2\\.\\s/)) choices.push('2');
    if (lower.includes('ketik 3') || lower.match(/\\b3\\.\\s/)) choices.push('3');
    if (lower.match(/\\bya\\b/)) choices.push('Ya');
    if (lower.match(/\\btidak\\b/)) choices.push('Tidak');
    if (lower.match(/\\blanjut\\b/)) choices.push('Lanjut');
    
    return Array.from(new Set(choices));
  };

  const choices = (msg.role === 'ai' && !isTyping) ? getChoices(msg.content) : [];

  // Grouping styles
  const isUser = msg.role === 'user';
  
  let borderRadiusClass = 'rounded-2xl';
  if (isUser) {
    if (!isFirst) borderRadiusClass += ' rounded-tr-sm';
    if (!isLast) borderRadiusClass += ' rounded-br-sm';
  } else {
    if (!isFirst) borderRadiusClass += ' rounded-tl-sm';
    if (!isLast) borderRadiusClass += ' rounded-bl-sm';
  }

  const marginClass = isFirst ? 'mt-5' : 'mt-1.5';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={\`flex \${isUser ? 'justify-end' : 'justify-start'} \${marginClass}\`}
    >
      <div className={\`group relative max-w-[85%] break-words [word-break:break-word] overflow-hidden px-4 py-3 text-[13px] font-sans leading-relaxed shadow-xs border \${borderRadiusClass} \${
        isUser 
          ? 'bg-slate-900 text-white border-slate-800' 
          : 'bg-white/95 backdrop-blur-md text-slate-800 border-slate-200/90 shadow-xs'
      }\`}>
        {msg.role === 'ai' ? (
          msg.content === '' && isTyping ? (
            <div className="flex items-center gap-1.5 h-5 px-1">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <div className="break-words leading-relaxed space-y-2 text-[13px]">
              <ReactMarkdown components={markdownComponents}>
                {msg.content + (isTyping ? ' ▋' : '')}
              </ReactMarkdown>
            </div>
          )
        ) : (
          <div className="whitespace-pre-wrap text-[13px] text-white">{msg.content}</div>
        )}
        
        {/* Inline AI Action Buttons */}
        {choices.length > 0 && isLast && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
            {choices.map(choice => (
              <button
                key={choice}
                onClick={() => onActionClick(choice)}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-full border border-purple-200 transition-colors"
              >
                {choice}
              </button>
            ))}
          </div>
        )}
        
        {msg.role === 'ai' && !isTyping && (
          <button 
            onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Disalin ke papan klip'); }}
            className="absolute -bottom-6 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-purple-600 flex items-center gap-1 text-[10px] bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200"
          >
            <Copy size={10} /> Salin
          </button>
        )}
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isTyping === nextProps.isTyping && prevProps.msg.content === nextProps.msg.content && prevProps.isFirst === nextProps.isFirst && prevProps.isLast === nextProps.isLast;
});

`;

content = content.substring(0, chatMsgStart) + newChatMessage + content.substring(chatMsgEnd);

// 2. Rewrite the render loop
const renderStart = content.indexOf('<div \n              onWheel={(e) => e.stopPropagation()}');
const renderEnd = content.indexOf('<div ref={messagesEndRef} />');

if (renderStart !== -1 && renderEnd !== -1) {
  const newRender = `<div 
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain p-5 pb-8 bg-slate-50/30 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/60 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/70 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {chatHistory.map((msg, i) => {
                const prevMsg = chatHistory[i - 1];
                const nextMsg = chatHistory[i + 1];
                const isFirst = !prevMsg || prevMsg.role !== msg.role;
                const isLast = !nextMsg || nextMsg.role !== msg.role;
                
                return (
                  <MemoizedChatMessage 
                    key={i} 
                    msg={msg} 
                    isTyping={isTyping && i === chatHistory.length - 1 && msg.role === 'ai'} 
                    isFirst={isFirst}
                    isLast={isLast}
                    onActionClick={(text) => handleSendMessage(undefined, text)}
                  />
                );
              })}
              `;
  content = content.substring(0, renderStart) + newRender + content.substring(renderEnd);
}

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
console.log('FloatingAIAssistant successfully updated for grouping and inline actions.');
