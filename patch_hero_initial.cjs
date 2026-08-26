const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

code = code.replace(
  '<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>',
  '<motion.div variants={itemVariants}>'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
