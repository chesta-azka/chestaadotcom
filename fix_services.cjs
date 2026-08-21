const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

const targetLines = `
              </AnimatePresence>
                 
    </div>
          );
        })}
   
      </motion.div>
`;

const replaceLines = `
              </AnimatePresence>
                 
    </motion.div>
          );
        })}
   
      </div>
`;

content = content.replace(targetLines.trim(), replaceLines.trim());
fs.writeFileSync('src/pages/ServicesPage.tsx', content);
