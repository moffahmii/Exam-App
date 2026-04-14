import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const isPrivateRoute =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/account') ||
        pathname.startsWith('/settings');

    const isAuthRoute =
        pathname.startsWith('/login') ||
        pathname.startsWith('/register');

    if (isPrivateRoute) {
        if (token) return NextResponse.next();
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthRoute) {
        if (!token) return NextResponse.next();
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}