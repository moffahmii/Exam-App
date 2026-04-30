'use server';

import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { email } from "zod";

export async function verifyEmailUpdateOTP(
    code: string
): Promise<IApiResponse<null>> {

    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/email/confirm`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ code }),
            }
        );

        const data = await response.json();

        if (!response.ok || data?.status === false) {
            return {
                status: false,
                code: response.status,
                message: data?.message || "OTP verification failed",
                errors: data?.errors,
            };
        }

        return {
            status: true,
            code: response.status,
            message: data?.message,
            payload: data?.payload ?? null,
        };
    } catch {
        return {
            status: false,
            code: 500,
            message: "Something went wrong",
        };
    }
}