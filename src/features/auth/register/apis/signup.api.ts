'use server';

export async function signupAction(data: {
    username: string;
    email: string;
    password: string;
}) {
    console.log("=== [START] signupAction ===");
    console.log("1. Payload:", { username: data.username, email: data.email, password: "***" });

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
        console.log("2. Calling API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log("3. Response Status:", response.status, response.statusText);

        const result = await response.json();
        console.log("4. Parsed Response Body:", result);

        if (!response.ok) {
            console.error("5. [ERROR] API returned not OK during signup:", result);
        }

        console.log("=== [END] signupAction ===");
        return result;

    } catch (error) {
        console.error("=== [CATCH ERROR] signupAction ===", error);
        throw error; // أو ممكن ترجع object زى الـ OTP على حسب الـ Hook بتاعك بيتعامل إزاي
    }
}