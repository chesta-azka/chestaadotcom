const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

// 1. Add imports
code = code.replace(
  "import React, { useState, useEffect, useRef } from 'react';",
  "import React, { useState, useEffect, useRef } from 'react';\nimport ReactMarkdown from 'react-markdown';"
);

// 2. Add Typewriter Component and markdown components
const markdownComponentsStr = `
const markdownComponents = {
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
};

const TypewriterMarkdown = ({ content, onComplete }: { content: string, onComplete: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const chunkSize = 3;
    const interval = setInterval(() => {
      i += chunkSize;
      if (i >= content.length) {
        setDisplayed(content);
        clearInterval(interval);
        onComplete();
      } else {
        setDisplayed(content.slice(0, i));
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [content, onComplete]);
  
  return (
    <ReactMarkdown 
      className="break-words leading-relaxed space-y-2 text-[13px]"
      components={markdownComponents}
    >
      {displayed + (displayed.length < content.length ? ' ▋' : '')}
    </ReactMarkdown>
  );
};
`;

code = code.replace(
  "export default function FloatingAIAssistant() {",
  markdownComponentsStr + "\nexport default function FloatingAIAssistant() {"
);

// 3. Add typewriterIndex state
code = code.replace(
  "const [showPricing, setShowPricing] = useState(false);",
  "const [showPricing, setShowPricing] = useState(false);\n  const [typewriterIndex, setTypewriterIndex] = useState<number | null>(null);"
);

// 4. Update fetch to set typewriterIndex
code = code.replace(
  "setChatHistory(prev => [...prev, { role: 'ai', content: data.reply }]);",
  "setChatHistory(prev => {\n          setTypewriterIndex(prev.length);\n          return [...prev, { role: 'ai', content: data.reply }];\n        });"
);

// 5. Update Quick actions based on context
const oldQuickActions = `{[
                  { label: "Mulai Rp550.000", icon: Code2 },
                  { label: "Katalog Harga", icon: TrendingUp }, { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                ]`;
const newQuickActions = `(() => {
                  const path = location.pathname;
                  if (path === '/') return [
                    { label: "Bahas Harga", icon: Code2 },
                    { label: "Lihat Portofolio", icon: TrendingUp }, 
                    { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                  ];
                  if (path === '/portfolio') return [
                    { label: "Proses Pengerjaan?", icon: Clock },
                    { label: "Bahas Harga", icon: Code2 },
                    { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                  ];
                  if (path === '/services') return [
                    { label: "Katalog Harga", icon: TrendingUp },
                    { label: "Hubungi Admin", icon: MessageCircle },
                    { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                  ];
                  return [
                    { label: "Bahas Harga", icon: Code2 },
                    { label: "Hubungi Admin", icon: MessageCircle },
                    { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                  ];
                })()`;
code = code.replace(oldQuickActions, newQuickActions);

// 6. Update message rendering
const oldMsgRender = `<div className="whitespace-pre-wrap">{msg.content}</div>`;
const newMsgRender = `{msg.role === 'ai' ? (
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
                    )}`;
code = code.replace(oldMsgRender, newMsgRender);

fs.writeFileSync(path, code);
