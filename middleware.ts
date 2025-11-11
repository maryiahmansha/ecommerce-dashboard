import { NextRequest, NextResponse } from 'next/server';
import { ZodFunction } from 'zod';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('auth')?.value === 'true';

  const protectedRoutes = ['/dashboard', '/customers', '/products', '/analytics'];

  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  // If trying to access protected route without auth - redirect to login
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if authenticated and trying to access login -> redirect to dashboard
  if (isAuthenticated && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    'dashboard/:path*',
    'customers/:path*',
    'products/:path*',
    'analytics/:path*',
    '/login',
  ],
};
