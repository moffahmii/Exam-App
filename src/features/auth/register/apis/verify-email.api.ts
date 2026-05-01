'use server';

export async function verifyEmailAction(payload: any) {
    console.log("1. Server Action Triggered with payload:", payload);
    
    const userEmail = typeof payload === 'string' ? payload : payload.email;
    console.log("2. Extracted Email:", userEmail);
    console.log("3. Backend URL:", process.env.NEXT_PUBLIC_API_URL);

    if (!userEmail) {
        throw new Error("Email is required");
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
        });

        const result = await response.json();
        console.log("4. Backend Response:", result);

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong while sending the verification email.');
        }

        return result;
    } catch (error) {
        console.error("5. Catch Error in Server Action:", error);
        throw error;
    }
}