'use server';

export async function signupAction(data: {
    username: string;
    email: string;
    password: string;
}) {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: result.message  };
        }

        // لو الريكويست نجح
        return { success: true, data: result };

    } catch (error) {
        console.error("Signup Action Catch Error:", error);
        return { error: "Something went wrong" };
    }
}