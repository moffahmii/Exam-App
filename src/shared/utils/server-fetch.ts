import { getNextAuthToken } from "@/shared/utils/auth.util";
import { IApiResponse } from "@/shared/types/api";

export async function serverFetch<T>(
    url: string,
    options: RequestInit & { auth?: boolean } = {}
): Promise<IApiResponse<T>> {
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(options.headers as Record<string, string>),
        };
        if (options.auth) {
            const jwt = await getNextAuthToken();
            const token = jwt?.token;
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }
        const response = await fetch(url, {
            ...options,
            headers,
        });
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