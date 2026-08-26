const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

code = code.replace(
  '                  </div>\n                )}\n              </motion.div>\n            ))}\n          </div>',
  '                  </div>\n                )}\n              </motion.div>\n            ))}\n          </AnimatePresence></motion.div>'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
