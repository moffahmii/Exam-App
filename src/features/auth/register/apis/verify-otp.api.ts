'use server';

export async function verifyOTPAction(data: { email: string; code: string }) {
    console.log("=== [START] verifyOTPAction ===");
    console.log("1. Raw Input:", data);

    try {
        // تنظيف الإيميل والكود بشكل كامل
        const cleanEmail = data.email.trim().toLowerCase();
        const cleanCode = data.code.replace(/\D/g, "");

        console.log("2. Cleaned Payload:", { email: cleanEmail, code: cleanCode });

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`;
        console.log("3. Calling API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: cleanEmail,
                code: cleanCode,
            }),
        });

        console.log("4. Response Status:", response.status, response.statusText);

        const result = await response.json();
        console.log("5. Parsed Response Body:", result);

        if (!response.ok) {
            console.error("6. [ERROR] API returned not OK:", result.message || result.error);
            return {
                success: false,
                message: result.message || result.error || "Something went wrong",
            };
        }

        console.log("=== [SUCCESS] verifyOTPAction ===");
        return {
            success: true,
            data: result,
        };

    } catch (error) {
        console.error("=== [CATCH ERROR] verifyOTPAction ===", error);
        return {
            success: false,
            message: "Network error or server is unreachable.",
        };
    }
}