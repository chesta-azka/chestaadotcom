const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/CommandPalette.tsx', 'utf8');

// 1. Import usePerformance
code = code.replace(
  'import { useState, useEffect } from \\'react\\';',
  'import { useState, useEffect } from \\'react\\';\nimport { usePerformance } from \\'../../contexts/PerformanceContext.tsx\\';'
);

// 2. Import Gauge from lucide-react if not present
if (!code.includes('Gauge,')) {
    code = code.replace(/} from 'lucide-react';/, 'Gauge, Activity } from \\'lucide-react\\';');
}

// 3. Inject into the component
code = code.replace(
  'const [searchQuery, setSearchQuery] = useState(\\'\\');',
  'const [searchQuery, setSearchQuery] = useState(\\'\\');\n  const { performanceMode, togglePerformanceMode } = usePerformance();'
);

// 4. Add to STATIC_ACTIONS
code = code.replace(
  '{ id: \\'theme\\', title: \\'Toggle Dark/Light Mode\\', subtitle: \\'Ubah tema tampilan\\', icon: Moon, action: toggleTheme, category: \\'General\\', shortcut: \\'t\\' },',
  '{ id: \\'theme\\', title: \\'Toggle Dark/Light Mode\\', subtitle: \\'Ubah tema tampilan\\', icon: Moon, action: toggleTheme, category: \\'General\\', shortcut: \\'t\\' },\n    { id: \\'performance\\', title: performanceMode ? \\'Disable Performance Mode\\' : \\'Enable Performance Mode\\', subtitle: \\'Kurangi animasi untuk device lambat\\', icon: Activity, action: togglePerformanceMode, category: \\'General\\', shortcut: \\'m\\' },'
);

fs.writeFileSync('src/components/organisms/CommandPalette.tsx', code);
