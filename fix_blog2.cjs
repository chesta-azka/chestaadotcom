const fs = require('fs');
let code = fs.readFileSync('src/pages/BlogHubPage.tsx', 'utf8');

const oldStr = `    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedTag, onlyRecommended]);

  return (
    <>
      <SEOProvider 
        title="Insights & AI Engineering Blog | CHESTADOTCOM"
        description="Deep dives into digital architecture, AI implementations, and enterprise solutions."
      />
       clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedTag]);`;

const newStr = `    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedTag, onlyRecommended]);`;

code = code.replace(oldStr, newStr);

// Oh wait, but where did the actual return statement go?
// Wait, the original code had:
//   useEffect(() => { ... })
//   return (
//     <div className="...">
//        <SEOProvider ... />
// Let's just fix it completely by viewing what was there in the git repo or just searching for the div
