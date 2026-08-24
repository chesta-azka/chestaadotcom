const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

if (!code.includes('import AutomatedPricingLogic')) {
    code = code.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport AutomatedPricingLogic from './AutomatedPricingLogic';");
}

if (!code.includes('const [showPricing, setShowPricing] = useState(false);')) {
    code = code.replace("const [isTyping, setIsTyping] = useState(false);", "const [isTyping, setIsTyping] = useState(false);\n  const [showPricing, setShowPricing] = useState(false);");
}

// Add a button in Quick Actions
const targetAction = '{ label: "Katalog Harga", icon: TrendingUp }';
const replacementAction = '{ label: "Katalog Harga", icon: TrendingUp }, { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }';
if (code.includes(targetAction) && !code.includes("Kalkulator Harga")) {
    code = code.replace("import { Bot, X, Send, Sparkles, Clock, Code2, TrendingUp, MessageCircle } from 'lucide-react';", "import { Bot, X, Send, Sparkles, Clock, Code2, TrendingUp, MessageCircle, Calculator } from 'lucide-react';");
    code = code.replace(targetAction, replacementAction);
}

// Update the onClick handler for action buttons
const targetBtn = 'onClick={() => handleSendMessage(undefined, action.label)}';
const replacementBtn = 'onClick={() => action.action === "pricing" ? setShowPricing(true) : handleSendMessage(undefined, action.label)}';
if (code.includes(targetBtn)) {
    code = code.replace(targetBtn, replacementBtn);
}

// Replace Chat Area with conditional render
const targetChatArea = '{/* Chat Area */}\n            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 scroll-smooth custom-scrollbar">';
const replacementChatArea = `{/* Chat Area */}
            {showPricing ? (
              <div className="flex-1 overflow-hidden">
                <AutomatedPricingLogic 
                  onCancel={() => setShowPricing(false)}
                  onEstimateGenerated={(price, details) => {
                    setShowPricing(false);
                    handleSendMessage(undefined, details);
                  }}
                />
              </div>
            ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 scroll-smooth custom-scrollbar">`;

if (code.includes(targetChatArea)) {
    code = code.replace(targetChatArea, replacementChatArea);
    // we also need to close the conditional block. The div closes right before {/* Input Area */}
    const targetInputArea = '</div>\n            {/* Input Area */}';
    const replacementInputArea = '</div>\n            )}\n            {/* Input Area */}';
    // wait, there are multiple '</div>\n            {/* Input Area */}'. Let's do a strict replace based on context:
    const strictInput = `              <div ref={messagesEndRef} />
            </div>
            {/* Input Area */}`;
    const strictRepl = `              <div ref={messagesEndRef} />
            </div>
            )}
            {/* Input Area */}`;
    code = code.replace(strictInput, strictRepl);
}

// Also hide Input Area if showPricing is true
const inputBlock = '{/* Input Area */}\n            <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-3 shrink-0">';
const inputRepl = '{/* Input Area */}\n            {!showPricing && (<div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-3 shrink-0">';
if (code.includes(inputBlock)) {
    code = code.replace(inputBlock, inputRepl);
    
    // close the conditional
    const closeInput = `              </form>
            </div>
          </motion.div>`;
    const closeRepl = `              </form>
            </div>)}
          </motion.div>`;
    code = code.replace(closeInput, closeRepl);
}

fs.writeFileSync(path, code);
console.log("Updated FloatingAIAssistant");
