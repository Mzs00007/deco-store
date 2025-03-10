import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['en'],
  defaultLocale: 'en'
});

// Export the middleware function
export default async function middleware(request: NextRequest) {
  // Protected routes
  const protectedPaths = ['/admin'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(`/${request.nextUrl.locale}${path}`)
  );

  // Handle internationalization
  const response = await intlMiddleware(request);

  // If it's not a protected path, return the i18n response
  if (!isProtectedPath) {
    return response;
  }

  // Check for auth session
  const token = request.cookies.get('next-auth.session-token');
  
  if (!token) {
    const loginUrl = new URL(`/${request.nextUrl.locale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

// Configure middleware matches
export const config = {
  matcher: ['/', '/(en)/:path*']
}; 