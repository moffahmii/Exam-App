'use server';

export async function ResetPasswordAction(data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result?.success === false) {
        throw new Error(result?.message || 'Reset password failed');
    }

    return result;
}