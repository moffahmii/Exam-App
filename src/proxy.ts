import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });

    const isPrivateRoute =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/account') ||
        pathname.startsWith('/settings');

    const isAuthRoute =
        pathname.startsWith('/login') ||
        pathname.startsWith('/register');

    if (isPrivateRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/account/:path*',
        '/settings/:path*',
        '/login',
        '/register',
    ],
};