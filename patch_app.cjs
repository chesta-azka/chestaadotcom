const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("import { Helmet, HelmetProvider } from 'react-helmet-async';")) {
  code = code.replace(
    "import { useEffect, useState } from 'react';",
    "import { useEffect, useState } from 'react';\nimport { Helmet, HelmetProvider } from 'react-helmet-async';\nimport { ROUTE_METADATA } from './data/seo-metadata';"
  );
}

const oldPageWrapper = `// Simple page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col flex-1"
      >
        {children}
      </motion.div>`;

const newPageWrapper = `// Simple page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentMeta = ROUTE_METADATA[location.pathname] || {
    title: 'ChestaCode | Premium Digital Solutions',
    description: 'Bespoke web applications, AI integration, and enterprise software.'
  };

  return (
    <>
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta property="twitter:title" content={currentMeta.title} />
        <meta property="twitter:description" content={currentMeta.description} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col flex-1"
      >
        {children}
      </motion.div>`;

code = code.replace(oldPageWrapper, newPageWrapper);

// Ensure HelmetProvider is wrapping everything
const oldRouter = `<Router>
      <PerformanceProvider>
      <AuthProvider>`;

const newRouter = `<HelmetProvider>
    <Router>
      <PerformanceProvider>
      <AuthProvider>`;

const oldEndRouter = `</AuthProvider>
      </PerformanceProvider>
    </Router>`;

const newEndRouter = `</AuthProvider>
      </PerformanceProvider>
    </Router>
    </HelmetProvider>`;

if (code.includes(oldRouter) && !code.includes('<HelmetProvider>')) {
  code = code.replace(oldRouter, newRouter);
  code = code.replace(oldEndRouter, newEndRouter);
}

fs.writeFileSync('src/App.tsx', code);
