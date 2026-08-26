const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// Disable quick actions when isTyping
code = code.replace(
  /onClick=\{\(\) => action\.action === "pricing" \? setShowPricing\(true\) : handleSendMessage\(undefined, action\.label\)\}/g,
  `onClick={() => action.action === "pricing" ? setShowPricing(true) : handleSendMessage(undefined, action.label)}\n                      disabled={isTyping}`
);
code = code.replace(
  /className="flex-shrink-0 inline-flex items-center gap-1\.5 px-3 py-1\.5 rounded-full bg-slate-50 border border-slate-200 text-\[11px\] font-sans font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"/g,
  `className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"`
);

// Disable input and submit button when isTyping
code = code.replace(
  /<input\n                  ref=\{inputRef\}\n                  type="text"/g,
  `<input\n                  ref={inputRef}\n                  type="text"\n                  disabled={isTyping}`
);

code = code.replace(
  /className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm font-sans text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"/g,
  `className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm font-sans text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"`
);

code = code.replace(
  /disabled=\{\!message\.trim\(\)\}/g,
  `disabled={!message.trim() || isTyping}`
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
console.log('Successfully updated input and actions');
