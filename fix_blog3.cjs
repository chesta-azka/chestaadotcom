const fs = require('fs');
let code = fs.readFileSync('src/pages/BlogHubPage.tsx', 'utf8');

code = code.replace(`export default function BlogHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedTag, onlyRecommended]);
    
    // Reading progress scroll tracking`, 
`export default function BlogHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedTag, onlyRecommended]);

  // Reading progress scroll tracking`);

fs.writeFileSync('src/pages/BlogHubPage.tsx', code);
