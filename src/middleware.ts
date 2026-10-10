import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply high-performance caching headers for Programmatic SEO routes
  // This ensures sub-second TTFB and efficient edge delivery on Vercel
  if (
    request.nextUrl.pathname.startsWith('/area/') || 
    request.nextUrl.pathname.startsWith('/solusi/') ||
    request.nextUrl.pathname.startsWith('/services')
  ) {
    // 1 hour browser cache, 24 hours stale-while-revalidate for CDN/Edge
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
    
    // Add specific header for LCP optimization hints if needed
    response.headers.set('x-pseo-optimized', 'true');
  }

  return response;
}

// Ensure the middleware only runs on pSEO routes to minimize overhead
export const config = {
  matcher: [
    '/area/:path*',
    '/solusi/:path*',
    '/services/:path*',
    '/services',
  ],
};
