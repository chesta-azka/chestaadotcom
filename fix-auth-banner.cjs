const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const oldBanner = `{errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 shadow-sm">
            <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-red-700 font-medium leading-relaxed">{errorMsg}</p>
          </div>
        )}`;

const newBanner = `<AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 shadow-sm">
                <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                <p className="text-sm text-red-700 font-medium leading-relaxed">{errorMsg}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>`;

code = code.replace(oldBanner, newBanner);

// Also make sure AnimatePresence is imported
if (!code.includes("import { motion, AnimatePresence }")) {
   code = code.replace("import { motion } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';");
}

fs.writeFileSync('src/pages/AdminPage.tsx', code);
