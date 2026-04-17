'use server'
import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/lib/utils/auth.util";
import { LoginFields } from './../types/auth.d';
import { IloginResponse } from "@/lib/types/auth";

async function handleResponse<T = any>(response: Response): Promise<IApiResponse<T>> {
    const data: IApiResponse<T> = await response.json();
    if (data.status === false) {
        throw new Error(data.message);
    }
    return data;
}

export const loginUser = async (LoginFields: LoginFields) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoginFields)
    });
    return handleResponse(response);
};

export async function signupAction(userData: {
    username: string;
    email: string;
    password: string;
}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
}

export async function verifyEmailAction(email: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return handleResponse(response);
}

export async function verifyOTPAction({ email, code }: { email: string, code: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
    });
    return handleResponse(response);
}

export async function ForgorPasswordAction(email: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}
