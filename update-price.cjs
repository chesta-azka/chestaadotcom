const fs = require('fs');

function replaceInFile(filePath, searchVals, replaceVals) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let updatedContent = content;
    for (let i = 0; i < searchVals.length; i++) {
        updatedContent = updatedContent.split(searchVals[i]).join(replaceVals[i]);
    }
    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated ${filePath}`);
    }
}

// 1. AutomatedPricingLogic.tsx
replaceInFile(
    'src/components/organisms/AutomatedPricingLogic.tsx', 
    ['BASE_PRICE = 500000', 'Start Rp 500k'], 
    ['BASE_PRICE = 550000', 'Start Rp 550k']
);

// 2. server.ts
replaceInFile(
    'server.ts',
    ['Rp 500.000'],
    ['Rp 550.000']
);

// 3. FloatingAIAssistant.tsx
replaceInFile(
    'src/components/organisms/FloatingAIAssistant.tsx',
    ['Website 500k', 'Rp 500.000'],
    ['Website 550k', 'Rp 550.000']
);

