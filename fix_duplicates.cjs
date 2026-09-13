const fs = require('fs');
let code = fs.readFileSync('src/pages/PortfolioPage.tsx', 'utf8');

// Find the setQuickViewData block and rewrite it cleanly
const blockRegex = /setQuickViewData\(\{[\s\S]*?\}\);/g;
code = code.replace(blockRegex, `setQuickViewData({
                            id: project.id,
                            type: 'project',
                            title: project.title,
                            subtitle: project.category,
                            description: project.description || 'Proyek digital dari CHESTAADOTCOM.',
                            tags: project.techStack || [],
                            image: project.thumbnail,
                            link: \`/portfolio/\${project.id}\`
                          });`);

fs.writeFileSync('src/pages/PortfolioPage.tsx', code);
