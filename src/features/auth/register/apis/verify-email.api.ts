'use server';

export async function verifyEmailAction(payload: any) {
    // التريكة هنا: بنشوف هل اللي جاي string ولا object، وبنطلع منه الإيميل غصب عنه
    const userEmail = typeof payload === 'string' ? payload : payload.email;
    if (!userEmail) {
        throw new Error("Email is required");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Something went wrong while sending the verification email.');
    }

    return result;
}