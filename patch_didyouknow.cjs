const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

code = code.replace(
  /<motion\.div \n      initial=\{\{ opacity: 0, y: 20 \}\} \n      whileInView=\{\{ opacity: 1, y: 0 \}\} \n      viewport=\{\{ once: true, margin: "-50px" \}\}\n      transition=\{\{ duration: 0\.6, delay: delay \}\}/g,
  '<motion.div variants={itemVariants}'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
