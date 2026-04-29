'use server'

import { serverFetch } from "@/shared/utils/server-fetch";
import { IApiResponse } from "@/shared/types/api";

export async function requestEmailUpdateOTP(
    newEmail: string
): Promise<IApiResponse<null>> {
    return serverFetch<null>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/email/request`,
        {
            method: "POST",
            body: JSON.stringify({ newEmail }),
        }
    );
}