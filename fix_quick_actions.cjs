const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

const wrongCode = `})().map((action, i) => (
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

const fixedCode = `
                <AnimatePresence mode="popLayout">
                  {(() => {
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
                  })().map((action, i) => (
                    <motion.button
                      key={action.label}
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
                  ))}
                </AnimatePresence>`;

// Need to find the exact block and replace
// Because I don't want to mess up, I'll use regex or string replace.
code = code.replace(/{[\s\S]*\}\)\(\)\.map\(\(action, i\) => \(\s*<AnimatePresence mode="popLayout" key={action\.label}>\s*<motion\.button[\s\S]*?<\/motion\.button>\s*<\/AnimatePresence>\s*\)\)}/, fixedCode.trim());

fs.writeFileSync(path, code);
