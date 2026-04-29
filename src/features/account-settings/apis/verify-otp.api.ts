'use server'

import { serverFetch } from "@/shared/utils/server-fetch";
import { IApiResponse } from "@/shared/types/api";

export async function verifyEmailUpdateOTP(
    code: string
): Promise<IApiResponse<null>> {
    return serverFetch<null>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/email/confirm`,
        {
            method: "POST",
            body: JSON.stringify({ code }),
        }
    );
}