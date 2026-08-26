const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Philosophy section fix
code = code.replace(
  '              </motion.div>\n            ))}\n          </AnimatePresence></motion.div>\n          <DidYouKnowSnippet sectionTitle="High Performance Web Optimization" />',
  '              </motion.div>\n            ))}\n          </div>\n          <DidYouKnowSnippet sectionTitle="High Performance Web Optimization" />'
);

// 2. Are there any other broken maps? Let's check process steps
code = code.replace(
  '              </motion.div>\n            ))}\n          </AnimatePresence></motion.div>\n          <DidYouKnowSnippet sectionTitle="Agile Execution Process for Web Projects" />',
  '              </motion.div>\n            ))}\n          </div>\n          <DidYouKnowSnippet sectionTitle="Agile Execution Process for Web Projects" />'
);

// 3. Metrics
code = code.replace(
  '              </motion.div>\n            ))}\n          </AnimatePresence></motion.div>\n          <DidYouKnowSnippet dark sectionTitle="Business Metrics and Performance Analytics" />',
  '              </motion.div>\n            ))}\n          </div>\n          <DidYouKnowSnippet dark sectionTitle="Business Metrics and Performance Analytics" />'
);

// 4. FAQS
code = code.replace(
  '              </motion.div>\n            ))}\n          </AnimatePresence></motion.div>\n          <DidYouKnowSnippet sectionTitle="Customer Support & Project Guarantees" />',
  '              </motion.div>\n            ))}\n          </div>\n          <DidYouKnowSnippet sectionTitle="Customer Support & Project Guarantees" />'
);


fs.writeFileSync('src/pages/ServicesPage.tsx', code);
