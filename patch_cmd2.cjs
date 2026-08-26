const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/CommandPalette.tsx', 'utf8');

// Add Activity icon
if (!code.includes('Activity,')) {
    code = code.replace(/} from 'lucide-react';/, 'Activity, } from "lucide-react";');
}

// Inject state
code = code.replace(
  "const [searchQuery, setSearchQuery] = useState('');",
  "const [searchQuery, setSearchQuery] = useState('');\n  const { performanceMode, togglePerformanceMode } = usePerformance();"
);

// Add to STATIC_ACTIONS
code = code.replace(
  "{ id: 'theme', title: 'Toggle Dark/Light Mode', subtitle: 'Ubah tema tampilan', icon: Moon, action: toggleTheme, category: 'General', shortcut: 't' },",
  "{ id: 'theme', title: 'Toggle Dark/Light Mode', subtitle: 'Ubah tema tampilan', icon: Moon, action: toggleTheme, category: 'General', shortcut: 't' },\n    { id: 'performance', title: performanceMode ? 'Disable Performance Mode' : 'Enable Performance Mode', subtitle: 'Kurangi animasi', icon: Activity, action: togglePerformanceMode, category: 'General', shortcut: 'm' },"
);

fs.writeFileSync('src/components/organisms/CommandPalette.tsx', code);
