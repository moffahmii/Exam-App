'use server';

import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { IUpdateProfileFields } from "../types/profile-fields";

export async function updateProfileAction(fields: IUpdateProfileFields): Promise<IApiResponse<null>> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fields),
            }
        );

        const data = await response.json();

        if (!response.ok || data?.status === false) {
            return {
                status: false,
                code: response.status,
                message: data?.message || "Failed to update profile",
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