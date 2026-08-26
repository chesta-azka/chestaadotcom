const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

code = code.replace(
  "</AnimatePresence>\n          </motion.div>\n        </section>",
  "</AnimatePresence>\n          </motion.div>\n          <DidYouKnowSnippet text=\"React dan Next.js yang kami gunakan saat ini memberikan tenaga pada lebih dari 40% website dengan trafik tertinggi di dunia.\" />\n        </section>"
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
