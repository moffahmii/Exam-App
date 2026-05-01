'use server';

export async function verifyOTPAction(data: { email: string; code: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.error || result.success === false) {
        return { 
            success: false, 
            message: result.message || result.error || 'كود التحقق غير صحيح' 
        };
    }

    return { success: true, data: result };
}