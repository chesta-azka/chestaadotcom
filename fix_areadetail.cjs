const fs = require('fs');
let content = fs.readFileSync('src/pages/AreaDetailPage.tsx', 'utf-8');

// Replace ArrowRight with Target if not imported
if (!content.includes('Target, ') && !content.includes(', Target')) {
  content = content.replace('ArrowRight,', 'ArrowRight, Target,');
}

// Replace stats. with currentStats.
content = content.replace(/stats\.searchVolume/g, 'currentStats.searchVolume');
content = content.replace(/stats\.businessGrowth/g, 'currentStats.businessGrowth');
content = content.replace(/stats\.localNiche/g, 'currentStats.localNiche');

fs.writeFileSync('src/pages/AreaDetailPage.tsx', content);
console.log('Fixed AreaDetailPage.tsx');
