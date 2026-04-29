'use server'

import { IApiResponse } from "@/shared/types/api";
import { IQuestion } from "@/shared/types/questions";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export interface AddBulkQuestionsArgs {
    examId: string;
    payload: { questions: any[] };
}

export const addBulkQuestionsApi = async ({ examId, payload }: AddBulkQuestionsArgs): Promise<IApiResponse<IQuestion[]>> => {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}/bulk`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            cache: 'no-store'
        });

        const result = await res.json();
        if (!res.ok) {
            return { status: false, code: res.status, message: result.message || "Failed to add bulk questions" };
        }
        return result;
    } catch (error) {
        return { status: false, code: 500, message: "Internal server error" };
    }
};