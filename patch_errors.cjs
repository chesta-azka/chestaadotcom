const fs = require('fs');

function removeConsoleError(file, target) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(target, '// error handled silently');
  fs.writeFileSync(file, code);
  console.log('Patched ' + file);
}

removeConsoleError('src/components/TrendingInsights.tsx', 'console.error(error);');
removeConsoleError('src/components/organisms/InsightsSection.tsx', 'console.error(err);');
removeConsoleError('src/components/atoms/LocalWeatherWidget.tsx', 'console.error("Failed to fetch weather", e);');

