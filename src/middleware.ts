import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/request'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // 1. تحديد الصفحات العامة (التي لا تحتاج تسجيل دخول)
    const isPublicPage = pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/forgot-password');

    // 2. حالة الخروج أو عدم وجود توكن:
    // لو اليوزر مش معاه توكن وبيحاول يدخل صفحة محمية (ليست public)
    if (!token && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. حالة لو اليوزر "مسجل دخول" فعلاً:
    // لو معاه توكن وبيحاول يروح لصفحات اللوجن أو الـ Register، رجعه للهوم
    if (token && isPublicPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 4. حماية الـ Registration Flow (اختياري حسب الـ Stage)
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
    // الميدل وير بيراقب كل المسارات ماعدا ملفات النظام والصور والـ API
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}