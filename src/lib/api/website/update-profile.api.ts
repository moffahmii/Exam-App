'use server'
import { IApiResponse } from "@/lib/types/api";
import { IUpdateProfileFields, IUpdateProfileResponse } from "@/lib/types/auth";
import { getNextAuthToken } from "@/lib/utils/auth.util";

export async function updateProfileAction(fields: IUpdateProfileFields) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: 'PATCH',
        cache: 'no-store',
        body: JSON.stringify(fields),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const payload: IApiResponse<IUpdateProfileResponse> = await response.json();
    if (payload.status !== true) {
        throw new Error(payload.message);
    }
    return payload;
}

export async function requestEmailUpdateOTP(newEmail: string) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/request`, {
        method: 'POST',
        body: JSON.stringify({ newEmail }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const payload = await response.json();
    if (payload.status !== true) throw new Error(payload.message);
    return payload;
}

export async function verifyEmailUpdateOTP(code: string) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/confirm`, {
        method: 'POST',
        body: JSON.stringify({
            code: code
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const payload = await response.json();

    if (payload.status !== true) {
        throw new Error(payload.message || "Invalid verification code");
    }

    return payload;
}

export async function deleteUserAccountAction() {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/account`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const payload = await response.json();

    if (!response.ok) {
        // التعامل مع خطأ 403 (Super Admin) أو أي خطأ آخر
        throw new Error(payload.message || "Failed to delete account");
    }

    return payload;
}