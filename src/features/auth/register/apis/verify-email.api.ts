'use server';

export async function verifyEmailAction(email: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const result = await response.json();
    return result;
}