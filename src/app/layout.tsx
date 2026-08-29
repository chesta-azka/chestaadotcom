import type { Metadata } from 'next';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';
import { Navbar } from '../components/Navbar';
import '../index.css'; // Assuming Tailwind is compiled here

export const metadata: Metadata = {
  title: 'chestaa.com | Premium Web & AI Architecture',
  description: 'Chestaa.com provides premium B2B SaaS architecture, Next.js optimization, and AI automation for enterprise dominance.',
  openGraph: {
    title: 'chestaa.com | Premium Web & AI Architecture',
    description: 'Chestaa.com provides premium B2B SaaS architecture, Next.js optimization, and AI automation for enterprise dominance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'chestaa.com',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen">
        <ThemeProvider>
          <NextErrorBoundary>
            <Navbar />
            <div className="pt-32">
              {children}
            </div>
          </NextErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
