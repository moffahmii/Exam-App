'use server';

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { IApiResponse } from "@/shared/types/api";


async function handleResponse<T>(response: Response): Promise<IApiResponse<T>> {
    const data = await response.json();
    return data;
}

export async function changePasswordApi(
    payload: ChangePasswordPayload
) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        }
    );
    return handleResponse(response);
}