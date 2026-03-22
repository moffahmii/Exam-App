'use server'

import { ApiResponse } from "@/lib/types/api";
import { ILoginFields, IloginResponse } from "@/lib/types/auth";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

const BASE_URL = 'https://exam-app.elevate-bootcamp.cloud/api';

// --- Helpers ---
async function handleResponse(response: Response) {
    const data = await response.json();
    if (data.status === "fail" || data.status === false || !response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
}

// --- Auth Actions ---
export async function loginAction(fields: ILoginFields) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(fields),
        headers: { 'Content-Type': 'application/json' }
    });
    const data: ApiResponse<IloginResponse> = await handleResponse(response);
    if (data.status === true && data.payload) {
        const cookieStore = await cookies();
        cookieStore.set('token', data.payload.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/',
        });
        cookieStore.set('user_info', JSON.stringify(data.payload.user), {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/',
        });
    }
    return data;
}

export async function signupAction(userData: any) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    const data = await handleResponse(response);
    if (data.token) {
        const cookieStore = await cookies();
        cookieStore.set('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/',
        });
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

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('user_info');
    redirect('/login');
}