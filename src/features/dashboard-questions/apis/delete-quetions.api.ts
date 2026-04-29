'use server'

import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function deleteQuestionApi(id: string): Promise<IApiResponse<null>> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return { status: false, code: response.status, message: "Failed to delete question" };
        }

        return { status: true, code: 200, payload: null, message: "Deleted successfully" };
    } catch (error) {
        return { status: false, code: 500, message: "Internal server error" };
    }
}