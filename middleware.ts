import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Caching strategy for pSEO and high-traffic service pages
  // s-maxage=3600 (1 hour cache on Edge)
  // stale-while-revalidate=86400 (Serve stale for up to 24 hours while background revalidating)
  if (
    pathname.startsWith('/area/') || 
    pathname.startsWith('/services') ||
    pathname.startsWith('/kamus-ai-teknologi')
  ) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  // Performance headers
  response.headers.set('X-Response-Time', 'Edge-Optimized');
  
  return response;
}

export const config = {
  matcher: [
    '/area/:path*',
    '/services/:path*',
    '/kamus-ai-teknologi/:path*',
  ],
};
