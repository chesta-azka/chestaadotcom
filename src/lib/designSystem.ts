/**
 * @file designSystem.ts
 * @description Unified Design System Configuration for CHESTAADOTCOM
 * Standardizes border-radius, spacing, typography scales, and animation tokens
 * to ensure absolute consistency across all application pages.
 */

export const DESIGN_TOKENS = {
  // Border Radius consistency (Apple / Vercel modern rounded aesthetic)
  borderRadius: {
    card: 'rounded-3xl',        // For major cards & containers
    button: 'rounded-2xl',      // For interactive buttons & CTAs
    badge: 'rounded-full',      // For pills, tags, and status chips
    input: 'rounded-2xl',       // For search inputs & form controls
    modal: 'rounded-3xl',       // For dialogs, drawers, and modals
    sm: 'rounded-xl',           // For inner sub-components & icons
  },

  // Consistent Glassmorphism & Card Styles
  glassCard: 'bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-sm transition-all duration-300',
  darkCard: 'bg-gray-950 text-white border border-purple-500/30 shadow-[0_0_50px_-15px_rgba(147,51,234,0.4)]',
  gradientGlow: 'absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none',

  // Typography Scales
  typography: {
    fontDisplay: 'font-display tracking-tight',
    fontSans: 'font-sans leading-relaxed',
    fontMono: 'font-mono uppercase tracking-wider',
  },

  // Standard Framer Motion Transitions & Variants
  motion: {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-50px' },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    springCardHover: {
      whileHover: { y: -6, scale: 1.02 },
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  }
};

export default DESIGN_TOKENS;
