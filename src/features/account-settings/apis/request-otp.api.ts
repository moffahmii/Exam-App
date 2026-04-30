'use server';

import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function requestEmailUpdateOTP(
    newEmail: string
): Promise<IApiResponse<null>> {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/email/request`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newEmail }),
            }
        );

        const data = await response.json();

        if (!response.ok || data?.status === false) {
            return {
                status: false,
                message: data?.message || "Request failed",
                code: response.status,
                errors: data?.errors,
            };
        }

        return data;

    } catch {
        return {
            status: false,
            message: "Something went wrong",
            code: 500,
        };
    }
}