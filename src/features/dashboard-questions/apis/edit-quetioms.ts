'use server'

import { IApiResponse } from "@/shared/types/api";
import { IQuestion, ISaveQuestionPayload } from "@/shared/types/questions";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function updateQuestionApi(id: string, payload: ISaveQuestionPayload): Promise<IApiResponse<IQuestion>> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
            cache: 'no-store'
        });

        const result = await response.json();
        if (!response.ok) {
            return { status: false, code: response.status, message: result.message || "Failed to update question" };
        }
        return result;
    } catch (error) {
        return { status: false, code: 500, message: "Internal server error" };
    }
}