'use server';

export async function signupAction(data: {
    username: string;
    email: string;
    password: string;
}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
}