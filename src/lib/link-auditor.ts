import { ROUTES } from '../config/routes';

const allValidRoutes = new Set<string>();

function flattenRoutes(obj: Record<string, any>) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      allValidRoutes.add(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenRoutes(obj[key]);
    }
  }
}

flattenRoutes(ROUTES);

const dynamicRoutePrefixes = [
  '/portfolio/',
  '/case-studies/',
  '/blog/',
  '/insights/',
  '/academy/',
  '/quiz/',
  '/area/',
  '/workspace/',
  '/client/',
  '/services/'
];

export function validateNavigation(navItems: { href?: string; path?: string; [key: string]: any }[]) {
  if (process.env.NODE_ENV === 'production') return;

  if (!Array.isArray(navItems)) return;

  for (const item of navItems) {
    const route = item.href || item.path;
    if (!route) continue;

    let isValid = allValidRoutes.has(route);

    if (!isValid) {
      isValid = dynamicRoutePrefixes.some(prefix => route.startsWith(prefix));
    }

    if (!isValid) {
      console.error(`CRITICAL 404 RISK: Invalid route detected in navigation -> "${route}". Not registered in src/config/routes.ts.`);
    }
  }
}
