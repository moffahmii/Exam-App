export async function verifyOTPAction(data: { email: string; code: string }) {
    // 1. تنظيف الإيميل والكود بشكل كامل
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanCode = data.code.replace(/\D/g, ""); // بيمسح أي مسافات أو حروف ويسيب الأرقام كنص

    console.log("Sending Payload:", { email: cleanEmail, code: cleanCode }); // عشان تتأكد قبل الإرسال

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // لو الباك إند بيستخدم Cookies للـ Session، شيل الكومنت من السطر اللي جاي:
        // credentials: 'include', 
        body: JSON.stringify({
            email: cleanEmail,
            code: cleanCode,
        }),
    });

    const result = await response.json();

    // 2. طباعة الرد الحقيقي للسيرفر في الكونسول
    console.log("Server Response:", response.status, result);

    if (!response.ok) {
        return {
            success: false,
            // لو الباك إند باعت تفاصيل في مصفوفة errors (زي ما بيحصل في Laravel/NestJS) اعرضها
            message: result.message || result.error || 'كود التحقق غير صحيح',
        };
    }

    return {
        success: true,
        data: result,
    };
}