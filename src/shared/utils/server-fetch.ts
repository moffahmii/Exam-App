// utils/server-fetch.ts

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { IApiResponse } from "@/shared/types/api";

export async function serverFetch<T>(
    url: string,
    options: RequestInit
): Promise<IApiResponse<T>> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...(options.headers || {}),
            },
        });

        const payload = await response.json();

        if (!response.ok) {
            return {
                status: false,
                message: payload?.message || "Request failed",
                code: response.status,
                errors: payload?.errors,
            };
        }

        return payload;
    } catch (error) {
        return {
            status: false,
            message: "Something went wrong",
            code: 500,
        };
    }
}