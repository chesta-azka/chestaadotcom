const fs = require('fs');
let code = fs.readFileSync('src/pages/BlogHubPage.tsx', 'utf8');

const endPart = `      </AnimatePresence>
    </motion.div>
  );
}`;

const newEndPart = `      </AnimatePresence>
    </motion.div>
    </>
  );
}`;

code = code.replace(endPart, newEndPart);
fs.writeFileSync('src/pages/BlogHubPage.tsx', code);
