const fs = require('fs');

function replaceViewport(path) {
  if (fs.existsSync(path)) {
    let code = fs.readFileSync(path, 'utf8');
    let newCode = code.replace(/viewport={{ once: true }}/g, 'viewport={{ once: true, margin: "-150px" }}');
    if (code !== newCode) {
      fs.writeFileSync(path, newCode);
      console.log('Patched ' + path);
    }
  }
}

replaceViewport('src/pages/AboutPage.tsx');
replaceViewport('src/components/organisms/AboutMeSection.tsx');
