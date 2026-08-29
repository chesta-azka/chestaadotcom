const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// We need to parse <opsi> tags
const chatMsgStart = content.indexOf('const MemoizedChatMessage = memo');
const chatMsgEnd = content.indexOf('export default function FloatingAIAssistant() {');

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
  // Parsing <opsi> tags
  let displayContent = msg.content;
  const choices: string[] = [];
  
  if (msg.role === 'ai') {
    const opsiRegex = /<opsi>(.*?)<\\/opsi>/g;
    let match;
    while ((match = opsiRegex.exec(msg.content)) !== null) {
      if (match[1].trim()) {
        choices.push(match[1].trim());
      }
    }
    // Remove <opsi> tags from the display content
    displayContent = msg.content.replace(/<opsi>.*?<\\/opsi>\\n?/g, '').trim();
  }

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
            <div className="flex items-center gap-1.5 h-6 px-1">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-[11px] font-medium text-purple-600/70 ml-1 animate-pulse">Memproses...</span>
            </div>
          ) : (
            <div className="break-words leading-relaxed space-y-2 text-[13px]">
              <ReactMarkdown components={markdownComponents}>
                {displayContent + (isTyping ? ' ▋' : '')}
              </ReactMarkdown>
            </div>
          )
        ) : (
          <div className="whitespace-pre-wrap text-[13px] text-white">{displayContent}</div>
        )}
        
        {/* Inline AI Action Buttons */}
        {choices.length > 0 && isLast && !isTyping && (
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
            {choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => onActionClick(choice)}
                className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-medium rounded-lg border border-purple-200 transition-colors text-left flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[10px] font-bold text-purple-600">{idx + 1}</div>
                <span>{choice}</span>
              </button>
            ))}
          </div>
        )}
        
        {msg.role === 'ai' && !isTyping && (
          <button 
            onClick={() => { navigator.clipboard.writeText(displayContent); toast.success('Disalin ke papan klip'); }}
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
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
console.log('FloatingAIAssistant updated with better loading and parsing');
