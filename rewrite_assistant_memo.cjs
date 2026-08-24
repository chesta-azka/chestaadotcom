const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

// 1. Add imports for memo and syntax highlighter
if (!code.includes('import { memo }')) {
  code = code.replace(
    "import React, { useState, useEffect, useRef } from 'react';",
    "import React, { useState, useEffect, useRef, memo } from 'react';\nimport { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';\nimport { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';"
  );
}

// 2. Refine markdownComponents
const oldMarkdownComponents = `const markdownComponents = {
  p: ({node, ...props}: any) => <p className="mb-2 last:mb-0" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
  li: ({node, ...props}: any) => <li className="leading-relaxed" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-indigo-900" {...props} />,
  code: ({node, inline, className, children, ...props}: any) => {
    const match = /language-(\\w+)/.exec(className || '');
    return inline ? (
      <code className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded text-[11px] font-mono" {...props}>{children}</code>
    ) : (
      <pre className="bg-slate-800 text-slate-100 p-3 rounded-lg text-[11px] overflow-x-auto my-2 font-mono">
        <code className={className} {...props}>{children}</code>
      </pre>
    );
  },
  a: ({node, ...props}: any) => <a className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800" {...props} />
};`;

const newMarkdownComponents = `const markdownComponents = {
  p: ({node, ...props}: any) => <p className="mb-2 last:mb-0 text-slate-700" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-outside list-disc pl-5 mb-3 space-y-1 text-slate-700 marker:text-indigo-400" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-outside list-decimal pl-5 mb-3 space-y-1 text-slate-700 marker:text-indigo-500 font-medium" {...props} />,
  li: ({node, ...props}: any) => <li className="leading-relaxed pl-1" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-indigo-950" {...props} />,
  code: ({node, inline, className, children, ...props}: any) => {
    const match = /language-(\\w+)/.exec(className || '');
    return !inline && match ? (
      <div className="my-3 overflow-hidden rounded-xl border border-slate-700/50 shadow-sm">
        <div className="flex items-center px-3 py-1.5 bg-slate-800/80 border-b border-slate-700">
          <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider">{match[1]}</span>
        </div>
        <SyntaxHighlighter
          {...props}
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: 0, padding: '12px', background: '#0f111a', fontSize: '11.5px', lineHeight: '1.6' }}
        >
          {String(children).replace(/\\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[11px] font-mono border border-indigo-100/50" {...props}>
        {children}
      </code>
    );
  },
  a: ({node, ...props}: any) => <a className="text-indigo-600 font-medium underline underline-offset-2 decoration-indigo-300 hover:text-indigo-800 hover:decoration-indigo-600 transition-colors" {...props} />
};`;

code = code.replace(oldMarkdownComponents, newMarkdownComponents);

// 3. Extract Chat Bubble mapping into a Memoized Component
const newMemoizedComponent = `
const MemoizedChatMessage = memo(({ 
  msg, 
  isTyping, 
  onComplete 
}: { 
  msg: ChatMessage; 
  isTyping: boolean; 
  onComplete: () => void;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
    >
      <div className={\`group relative max-w-[85%] rounded-2xl px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm border \${
        msg.role === 'user' 
          ? 'bg-slate-900 text-white border-slate-800 rounded-br-sm' 
          : 'bg-white text-slate-700 border-slate-200/60 rounded-bl-sm'
      }\`}>
        {msg.role === 'ai' ? (
          isTyping ? (
            <TypewriterMarkdown content={msg.content} onComplete={onComplete} />
          ) : (
            <ReactMarkdown 
              className="break-words leading-relaxed space-y-2 text-[13px]"
              components={markdownComponents}
            >
              {msg.content}
            </ReactMarkdown>
          )
        ) : (
          <div className="whitespace-pre-wrap text-[13px] text-white">{msg.content}</div>
        )}
        
        {msg.role === 'ai' && !isTyping && (
          <button 
            onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Disalin ke papan klip'); }}
            className="absolute -bottom-6 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[10px] bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200"
          >
            <Copy size={10} /> Salin
          </button>
        )}
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if it was typing and now is not, or content changed.
  return prevProps.isTyping === nextProps.isTyping && prevProps.msg.content === nextProps.msg.content;
});
`;

// Insert the memoized component before FloatingAIAssistant
code = code.replace(
  "export default function FloatingAIAssistant() {",
  newMemoizedComponent + "\nexport default function FloatingAIAssistant() {"
);

// 4. Replace the map logic with MemoizedChatMessage
const oldMapLogic = `{chatHistory.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
                >
                  <div className={\`group relative max-w-[85%] rounded-2xl px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm border \${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white border-slate-800 rounded-br-sm' 
                      : 'bg-white text-slate-700 border-slate-200/60 rounded-bl-sm'
                  }\`}>
                    {msg.role === 'ai' ? (
                      i === typewriterIndex ? (
                        <TypewriterMarkdown content={msg.content} onComplete={() => setTypewriterIndex(null)} />
                      ) : (
                        <ReactMarkdown 
                          className="break-words leading-relaxed space-y-2 text-[13px]"
                          components={markdownComponents}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )
                    ) : (
                      <div className="whitespace-pre-wrap text-[13px]">{msg.content}</div>
                    )}
                    {msg.role === 'ai' && (
                      <button 
                        onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Disalin ke papan klip'); }}
                        className="absolute -bottom-6 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[10px]"
                      >
                        <Copy size={10} /> Salin
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}`;

const newMapLogic = `{chatHistory.map((msg, i) => (
                <MemoizedChatMessage 
                  key={i} 
                  msg={msg} 
                  isTyping={i === typewriterIndex} 
                  onComplete={() => setTypewriterIndex(null)} 
                />
              ))}`;

code = code.replace(oldMapLogic, newMapLogic);

fs.writeFileSync(path, code);
