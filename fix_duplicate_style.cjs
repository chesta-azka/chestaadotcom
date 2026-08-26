const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

code = code.replace(
  '<motion.div style={{ opacity: heroOpacity, rotateX: heroRotateX, rotateY: heroRotateY, x: heroTranslateX, y: heroTranslateY }} className="relative z-10 max-w-4xl mx-auto" style={{ transformStyle: "preserve-3d" }}>',
  '<motion.div style={{ opacity: heroOpacity, rotateX: heroRotateX, rotateY: heroRotateY, x: heroTranslateX, y: heroTranslateY, transformStyle: "preserve-3d" }} className="relative z-10 max-w-4xl mx-auto">'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
