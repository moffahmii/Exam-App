import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // 1. استخراج الـ ID
    const { id } = await params;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 3. جلب الداتا الحقيقية من الباك إند بتاعكم
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
             return NextResponse.json(
                 { message: 'Failed to fetch diploma details' }, 
                 { status: response.status }
             );
        }

        // 4. إرجاع الداتا للـ Frontend
        const data = await response.json();
        return NextResponse.json(data);
        
    } catch (error) {
        console.error("Route Handler Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}