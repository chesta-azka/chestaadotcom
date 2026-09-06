const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

// 1. Add Firestore imports
if (!content.includes('import { db } from')) {
    content = content.replace(
        "import curriculumData from '../../../data/academy-curriculum.json';",
        "import curriculumData from '../../../data/academy-curriculum.json';\nimport { doc, getDoc, setDoc } from 'firebase/firestore';\nimport { db } from '@/lib/firebase';"
    );
}

// 2. Add useEffect to fetch progress
const fetchProgressCode = `
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const docRef = doc(db, 'users', 'user123', 'progress', 'academy-backend-saas');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.completedSteps) {
            setCompletedSteps(data.completedSteps);
          }
        }
      } catch (err) {
        console.error("Failed to load progress from Firestore:", err);
      }
    };
    loadProgress();
  }, []);
`;

if (!content.includes('loadProgress')) {
    content = content.replace(
        "useEffect(() => {\n    if (searchQuery.trim().length > 0) {",
        fetchProgressCode + "\n\n  useEffect(() => {\n    if (searchQuery.trim().length > 0) {"
    );
}

// 3. Update the handle completed steps to also save to Firestore
const saveProgressCode = `
  const handleMarkAsRead = async (subId: string) => {
    const newSteps = { ...completedSteps, [subId]: true };
    setCompletedSteps(newSteps);
    
    try {
      await setDoc(doc(db, 'users', 'user123', 'progress', 'academy-backend-saas'), {
        completedSteps: newSteps,
        lastUpdated: new Date()
      }, { merge: true });
    } catch (err) {
      console.error("Failed to save progress to Firestore:", err);
    }
  };
`;

if (!content.includes('handleMarkAsRead')) {
    content = content.replace(
        "const toggleModule = (modId: string) => {",
        saveProgressCode + "\n\n  const toggleModule = (modId: string) => {"
    );
}

content = content.replace(
    /onClick=\{\(\) => setCompletedSteps\(prev => \(\{\.\.\.prev, \[sub\.id\]: true\}\)\)\}/g,
    "onClick={() => handleMarkAsRead(sub.id)}"
);

fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

