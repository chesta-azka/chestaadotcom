const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(
  /--text-fluid-h1: clamp\(2\.5rem, 5vw \+ 1rem, 5rem\);/,
  '--text-fluid-h1: clamp(2.5rem, 6vw + 1rem, 5.5rem);'
);
css = css.replace(
  /--text-fluid-h2: clamp\(2rem, 3\.8vw \+ 1rem, 3\.75rem\);/,
  '--text-fluid-h2: clamp(2rem, 4vw + 1rem, 4rem);'
);
css = css.replace(
  /--text-fluid-h3: clamp\(1\.35rem, 2\.5vw \+ 1rem, 2\.5rem\);/,
  '--text-fluid-h3: clamp(1.5rem, 3vw + 1rem, 3rem);'
);

css = css.replace(
  /h1, h2 \{\n  font-family: var\(--font-display\);\n  letter-spacing: -0\.04em;\n  line-height: 1\.15;/,
  'h1, h2 {\n  font-family: var(--font-display);\n  letter-spacing: -0.05em;\n  line-height: 1.1;'
);

fs.writeFileSync('src/index.css', css);
