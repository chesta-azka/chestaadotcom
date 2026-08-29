const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const targetRender = "              <ReactMarkdown components={markdownComponents}>\n                {typedContent + (isTyping ? ' ▋' : '')}\n              </ReactMarkdown>";

const replacementRender = `              {typedContent.includes('✅ **Verified Pricing Data**') ? (
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

if (code.includes(targetRender)) {
  code = code.replace(targetRender, replacementRender);
  
  if (!code.includes('CheckCircle2')) {
    code = code.replace(
      "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles } from 'lucide-react';",
      "import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';"
    );
  }
  
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched FloatingAIAssistant with verified flag");
} else {
  console.log("Could not find the target render block in FloatingAIAssistant");
}
