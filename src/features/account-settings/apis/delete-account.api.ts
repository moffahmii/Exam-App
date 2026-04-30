'use server';

import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function deleteUserAccountAction(): Promise<IApiResponse<null>> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok || data?.status === false) {
            return {
                status: false,
                code: response.status,
                message: data?.message || "Failed to delete account",
                errors: data?.errors,
            };
        }

        return {
            status: true,
            code: response.status,
            message: data?.message,
            payload: null,
        };
    } catch {
        return {
            status: false,
            code: 500,
            message: "Something went wrong",
        };
    }
}