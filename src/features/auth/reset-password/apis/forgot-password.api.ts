'use server';

export async function ForgorPasswordAction(email: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            redirectUrl: `${baseUrl}/reset-password`,
        }),
    });

    const result = await response.json();
    return result;
}