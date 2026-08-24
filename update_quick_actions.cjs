const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

const oldCode = `})().map((action, i) => (
                  <button
                    key={i}
                    onClick={() => action.action === "pricing" ? setShowPricing(true) : handleSendMessage(undefined, action.label)}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                  >
                    <action.icon size={12} />
                    {action.label}
                  </button>
                ))}`;

const newCode = `})().map((action, i) => (
                  <AnimatePresence mode="popLayout" key={action.label}>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => action.action === "pricing" ? setShowPricing(true) : handleSendMessage(undefined, action.label)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                    >
                      <action.icon size={12} />
                      {action.label}
                    </motion.button>
                  </AnimatePresence>
                ))}`;

code = code.replace(oldCode, newCode);
fs.writeFileSync(path, code);
