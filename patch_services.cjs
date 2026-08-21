const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

const targetStr = `
      {/* Accordion Layout System */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-b border-slate-200 bg-white/[0.01] rounded-3xl overflow-hidden backdrop-blur-sm relative z-10"
      >
        
        {servicesList.map((service, index) => {
          const isOpen = activeTab === service.id;
          
          return (
            <div 
              key={service.id} 
              className={\`border-b border-slate-200 last:border-b-0 transition-colors duration-500 \${isOpen ? 'bg-white/[0.02]/80' : 'hover:bg-white/[0.01]'}\`}
            >
`;

const replaceStr = `
      {/* Accordion Layout System (Cards) */}
      <div className="space-y-6 relative z-10">
        
        {servicesList.map((service, index) => {
          const isOpen = activeTab === service.id;
          
          return (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={\`border rounded-[2.5rem] overflow-hidden transition-all duration-500 transform hover:scale-[1.015] hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] hover:border-[#4f46e5]/20 hover:z-20 relative \${isOpen ? 'bg-white shadow-xl border-[#4f46e5]/30' : 'border-slate-200 bg-white/70 backdrop-blur-md hover:bg-white'}\`}
            >
`;

content = content.replace(targetStr.trim(), replaceStr.trim());

// Also change the closing tag from </div> to </motion.div> around line 317-318
const targetEnd = `
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
`;

const replaceEnd = `
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
`;

content = content.replace(targetEnd.trim(), replaceEnd.trim());

fs.writeFileSync('src/pages/ServicesPage.tsx', content);
console.log("Patched ServicesPage");
