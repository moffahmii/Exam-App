import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { DiplomasApiResponse } from '@/shared/types/diplomas';

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        if (!token?.token) {
            return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/diplomas`);
        backendUrl.searchParams.set('page', searchParams.get('page') || '1');
        backendUrl.searchParams.set('limit', searchParams.get('limit') || '12');
        const search = searchParams.get('search');
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder');

        if (search) backendUrl.searchParams.set('search', search);
        if (sortBy) backendUrl.searchParams.set('sortBy', sortBy);
        if (sortOrder) backendUrl.searchParams.set('sortOrder', sortOrder);

        const response = await fetch(backendUrl.toString(), {
            headers: {
                Authorization: `Bearer ${token.token}`,
            },
            cache: 'no-store',
        });

        const data: DiplomasApiResponse = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { status: false, message: data.message || 'Failed to fetch from external API' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { status: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}