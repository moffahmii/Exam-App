import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=${page}&limit=20`,
            {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
                cache: 'no-store',
            }
        );
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