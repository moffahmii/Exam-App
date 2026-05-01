export async function verifyOTPAction(data: { email: string; code: string }) {
    // 1. تنظيف الإيميل والكود بشكل كامل
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanCode = data.code.replace(/\D/g, ""); 

    console.log("Sending Payload:", { email: cleanEmail, code: cleanCode });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // credentials: '', 
        body: JSON.stringify({
            email: cleanEmail,
            code: cleanCode,
        }),
    });

    const result = await response.json();


    if (!response.ok) {
        return {
            success: false,
            message: result.message || result.error ,
        };
    }

    return {
        success: true,
        data: result,
    };
}