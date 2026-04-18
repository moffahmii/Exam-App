'use server'
import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/lib/utils/auth.util";

export interface IUpdateProfileFields {
    firstName: string
    lastName: string
    profilePhoto?: string
    phone?: string
}
export async function updateProfileAction(fields: IUpdateProfileFields) {
    const jwt = await getNextAuthToken()
    const token = jwt?.token
    console.log("API PAYLOAD:", fields)
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fields),
        }
    )
    const payload = await response.json()
    if (!payload.status) {
        throw new Error(payload.message || "Update failed")
    }
    return payload.payload
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
        throw new Error(payload.message || "Failed to delete account");
    }

    return payload;
}