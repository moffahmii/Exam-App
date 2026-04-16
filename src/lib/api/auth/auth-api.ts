'use server'
import { IApiResponse } from "@/lib/types/api";
import { getNextAuthToken } from "@/lib/utils/auth.util";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'


const BASE_URL = 'https://exam-app.elevate-bootcamp.cloud/api';

async function handleResponse(response: Response) {
    const data = await response.json();
    if (data.status === "fail" || data.status === false || !response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
}

// --- Auth Actions ---
export async function signupAction(userData: {
    username: string;
    email: string;
    password: string;
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
    }
    return data;
}

export async function verifyEmailAction(email: string) {
    const response = await fetch(`${BASE_URL}/auth/send-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return handleResponse(response);
}

export async function verifyOTPAction({ email, code }: { email: string, code: string }) {
    const response = await fetch(`${BASE_URL}/auth/confirm-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
    });
    return handleResponse(response);
}

export async function ForgorPasswordAction(email: string) {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return handleResponse(response);
}

export async function ChangePasswordAction(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const targetUrl = `${BASE_URL}/users/change-password`;
    console.log("Sending request to:", targetUrl);
    try {
        const response = await fetch(targetUrl, {
            method: 'POST', // تأكد من الباك إند إذا كانت POST أو PUT أو PATCH
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // إضافة التوكن هنا ضروري جداً
            },
            body: JSON.stringify(data)
        });

        return handleResponse(response);
    } catch (error) {
        console.error("Fetch failed in ChangePasswordAction:", error);
        throw error;
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('user_info');
    redirect('/login');
}