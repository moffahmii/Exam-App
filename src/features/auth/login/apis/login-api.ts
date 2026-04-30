'use server';

import { IApiResponse } from "@/shared/types/api";
import { LoginFields } from "../../types/auth";

async function handleResponse<T>(response: Response): Promise<IApiResponse<T>> {
    let data: any = null;

    try {
        data = await response.json();
    } catch (err) {
        return {
            status: false,
            message: "Invalid server response",
            payload: null as T,
        };
    }

    if (!response.ok) {
        return {
            status: false,
            message: data?.message || "Request failed",
            payload: null as T,
        };
    }

    return data;
}

export async function loginUser(
    credentials: LoginFields
): Promise<IApiResponse<{
    user: {
        id: string;
        username: string;
        email: string;
    };
    token: string;
}>> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
    );

    return handleResponse(response);
}