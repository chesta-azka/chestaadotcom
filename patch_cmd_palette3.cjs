const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/CommandPalette.tsx', 'utf8');

const typeDefOld = `type ActionItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  category: string;
  path?: string;
  action?: () => void;
  shortcut?: string;
};`;

const typeDefNew = `type ActionItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  category: string;
  path?: string;
  action?: () => void;
  shortcut?: string;
  content?: string; // For deep search indexing
};`;

code = code.replace(typeDefOld, typeDefNew);

const oldArticle = `  const ARTICLE_ACTIONS: ActionItem[] = ALL_ARTICLES.map(art => ({
    id: \`article-\${art.slug}\`,
    title: art.title,
    subtitle: \`Insight • \${art.cat}\`,
    icon: BookOpen,
    path: \`/blog?read=\${art.slug}\`,
    category: 'Articles'
  }));`;
const newArticle = `  const ARTICLE_ACTIONS: ActionItem[] = ALL_ARTICLES.map(art => ({
    id: \`article-\${art.slug}\`,
    title: art.title,
    subtitle: \`Insight • \${art.cat}\`,
    icon: BookOpen,
    path: \`/blog?read=\${art.slug}\`,
    category: 'Articles',
    content: art.content.join(' ')
  }));`;
code = code.replace(oldArticle, newArticle);

const oldProj = `  const PROJECT_ACTIONS: ActionItem[] = PROJECTS.map(proj => ({
    id: \`project-\${proj.id}\`,
    title: proj.title,
    subtitle: \`Portofolio • \${proj.category}\`,
    icon: Briefcase,
    path: \`/portfolio/\${proj.id}\`,
    category: 'Projects'
  }));`;
const newProj = `  const PROJECT_ACTIONS: ActionItem[] = PROJECTS.map(proj => ({
    id: \`project-\${proj.id}\`,
    title: proj.title,
    subtitle: \`Portofolio • \${proj.category}\`,
    icon: Briefcase,
    path: \`/portfolio/\${proj.id}\`,
    category: 'Projects',
    content: proj.description + ' ' + (proj.tags ? proj.tags.join(' ') : '')
  }));`;
code = code.replace(oldProj, newProj);

const oldSrv = `  const SERVICE_ACTIONS: ActionItem[] = SERVICE_DEFINITIONS.map(srv => ({
    id: \`srv-\${srv.slug}\`,
    title: srv.title,
    subtitle: srv.description,
    icon: srv.icon || Zap,
    path: \`/layanan/\${srv.slug}\`,
    category: 'Services'
  }));`;
const newSrv = `  const SERVICE_ACTIONS: ActionItem[] = SERVICE_DEFINITIONS.map(srv => ({
    id: \`srv-\${srv.slug}\`,
    title: srv.title,
    subtitle: srv.description,
    icon: srv.icon || Zap,
    path: \`/layanan/\${srv.slug}\`,
    category: 'Services',
    content: srv.description + ' ' + srv.benefits.join(' ')
  }));`;
code = code.replace(oldSrv, newSrv);

const oldSearch = `  const displayedActions = searchQuery.trim() === ''
    ? SUGGESTED_ACTIONS
    : ALL_ACTIONS.filter(action => 
         action.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         action.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );`;
const newSearch = `  const displayedActions = searchQuery.trim() === ''
    ? SUGGESTED_ACTIONS
    : ALL_ACTIONS.filter(action => {
         const q = searchQuery.toLowerCase();
         return action.title.toLowerCase().includes(q) || 
                action.subtitle.toLowerCase().includes(q) ||
                (action.content && action.content.toLowerCase().includes(q));
      });`;
code = code.replace(oldSearch, newSearch);

fs.writeFileSync('src/components/organisms/CommandPalette.tsx', code);
