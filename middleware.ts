import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('matemetrik_session')?.value;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      const loginUrl = new URL('/yonetim', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in, redirect /yonetim to /admin
  if (pathname === '/yonetim') {
    if (token) {
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only run on admin HTML pages and /yonetim; never run on static assets, images or APIs
    '/admin',
    '/admin/((?!api|_next|.*\\..*).*)',
    '/yonetim',
  ],
};
