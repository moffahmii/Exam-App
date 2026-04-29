import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
    // 1. استخراج كل الـ Parameters من طلب الـ Frontend
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '12'; // خليت الديفولت 12 زي ما موجود في الـ Swagger
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 2. بناء رابط الباك إند بشكل ديناميكي
        const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/diplomas`);
        backendUrl.searchParams.append('page', page);
        backendUrl.searchParams.append('limit', limit);

        // إضافة البحث والترتيب فقط في حالة وجودهم
        if (search) backendUrl.searchParams.append('search', search);
        if (sortBy) backendUrl.searchParams.append('sortBy', sortBy);
        if (sortOrder) backendUrl.searchParams.append('sortOrder', sortOrder);

        // 3. إرسال الطلب للباك إند
        const response = await fetch(backendUrl.toString(), {
            headers: {
                Authorization: `Bearer ${token.token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Failed to fetch from external API' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}