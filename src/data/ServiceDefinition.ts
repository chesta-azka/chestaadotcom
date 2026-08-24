import { Code, Bot, ShoppingCart, Cloud, LayoutTemplate, Search, Cpu, Link, Zap, Palette } from 'lucide-react';

export const SERVICE_DEFINITIONS = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Custom, high-performance web applications tailored for enterprise scale.',
    benefits: ['Ultra-fast loading times', 'SEO-friendly architecture', 'Scalable infrastructure'],
    icon: Code
  },
  {
    slug: 'ai-agents',
    title: 'AI Agents',
    description: 'Intelligent AI assistants to automate customer support and business operations.',
    benefits: ['24/7 automated support', 'Context-aware responses', 'Seamless integrations'],
    icon: Bot
  },
  {
    slug: 'shopify-optimization',
    title: 'Shopify Optimization',
    description: 'E-commerce enhancement focusing on conversion rate optimization and speed.',
    benefits: ['Higher conversion rates', 'Optimized checkout flow', 'Mobile-first design'],
    icon: ShoppingCart
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    description: 'Secure, scalable, and resilient cloud architectures for modern businesses.',
    benefits: ['99.99% uptime SLA', 'Automated scaling', 'Robust security protocols'],
    icon: Cloud
  },
  {
    slug: 'landing-page-conversion',
    title: 'Landing Page Conversion',
    description: 'High-converting landing pages designed using data-driven marketing principles.',
    benefits: ['A/B testing ready', 'Persuasive copywriting', 'Optimized CTA placement'],
    icon: LayoutTemplate
  },
  {
    slug: 'seo-auditing',
    title: 'SEO Auditing',
    description: 'Comprehensive technical and content SEO audits to dominate search rankings.',
    benefits: ['Deep technical analysis', 'Competitor benchmarking', 'Actionable roadmaps'],
    icon: Search
  },
  {
    slug: 'bot-automation',
    title: 'Bot Automation',
    description: 'Streamline repetitive tasks with custom automation bots and workflows.',
    benefits: ['Reduced operational costs', 'Error-free execution', 'Time-saving processes'],
    icon: Cpu
  },
  {
    slug: 'api-integration',
    title: 'API Integration',
    description: 'Seamlessly connect disparate systems with robust custom API development.',
    benefits: ['Secure data transfer', 'Real-time synchronization', 'Custom middleware'],
    icon: Link
  },
  {
    slug: 'performance-tuning',
    title: 'Performance Tuning',
    description: 'Identify and resolve bottlenecks to ensure blazing-fast application speeds.',
    benefits: ['Optimized core web vitals', 'Reduced bounce rates', 'Efficient resource loading'],
    icon: Zap
  },
  {
    slug: 'ui-ux-prototyping',
    title: 'UI/UX Prototyping',
    description: 'Interactive and user-centric design prototypes for flawless user experiences.',
    benefits: ['Data-driven design', 'Interactive mockups', 'User testing ready'],
    icon: Palette
  }
];
