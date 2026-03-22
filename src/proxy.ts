import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isPublicPage = pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/forgot-password');

    if (!token && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isPublicPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const authStage = request.cookies.get('auth_stage')?.value;
    const userEmail = request.cookies.get('user_email')?.value;

    if (pathname === '/register/verify' && (!userEmail || authStage !== 'verify')) {
        return NextResponse.redirect(new URL('/register', request.url));
    }

    if ((pathname === '/register/complete' || pathname === '/register/password') && authStage !== 'completed') {
        return NextResponse.redirect(new URL('/register/verify', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}