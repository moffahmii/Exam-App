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
            `https://exam-app.elevate-bootcamp.cloud/api/diplomas?page=${page}&limit=10`,
            {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
                cache: 'no-store',
            }
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}