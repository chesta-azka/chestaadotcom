const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const targetRender = `              {typedContent.includes('✅ **Verified Pricing Data**') ? (
                <>
                   <ReactMarkdown components={markdownComponents}>
                     {(typedContent + (isTyping ? ' ▋' : '')).replace('✅ **Verified Pricing Data**', '').replace('---\\n', '')}
                   </ReactMarkdown>
                   <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 rounded-lg p-2 w-fit">
                     <CheckCircle2 size={12} className="text-emerald-500" />
                     Verified Data
                   </div>
                </>
              ) : (
                <ReactMarkdown components={markdownComponents}>
                  {typedContent + (isTyping ? ' ▋' : '')}
                </ReactMarkdown>
              )}`;

const replacementRender = `              {typedContent.includes('[CONFIDENCE:HIGH]') || typedContent.includes('✅ **Verified Pricing Data**') ? (
                <>
                   <ReactMarkdown components={markdownComponents}>
                     {(typedContent + (isTyping ? ' ▋' : '')).replace('\\[CONFIDENCE:HIGH\\]', '').replace('[CONFIDENCE:HIGH]', '').replace('✅ **Verified Pricing Data**', '').replace('---\\n', '')}
                   </ReactMarkdown>
                   <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 rounded-lg p-2 w-fit shadow-sm">
                     <CheckCircle2 size={12} className="text-emerald-500" />
                     Verified System Data (High Confidence)
                   </div>
                </>
              ) : typedContent.includes('[CONFIDENCE:LOW]') ? (
                <>
                   <ReactMarkdown components={markdownComponents}>
                     {(typedContent + (isTyping ? ' ▋' : '')).replace('\\[CONFIDENCE:LOW\\]', '').replace('[CONFIDENCE:LOW]', '')}
                   </ReactMarkdown>
                   <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-amber-600 bg-amber-50 rounded-lg p-2 w-fit shadow-sm">
                     <AlertTriangle size={12} className="text-amber-500" />
                     Estimated Figure (Verify with Admin)
                   </div>
                </>
              ) : (
                <ReactMarkdown components={markdownComponents}>
                  {typedContent + (isTyping ? ' ▋' : '')}
                </ReactMarkdown>
              )}`;

if (code.includes(targetRender)) {
  code = code.replace(targetRender, replacementRender);

  if (!code.includes('AlertTriangle')) {
    code = code.replace(
      "CheckCircle2 } from 'lucide-react';",
      "CheckCircle2, AlertTriangle } from 'lucide-react';"
    );
  }

  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched FloatingAIAssistant with confidence score");
} else {
  console.log("Could not find the target render block in FloatingAIAssistant");
}
