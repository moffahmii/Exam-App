'use server'
import { getNextAuthToken } from "@/shared/utils/auth.util";

// تعريف الـ Types
export interface BulkQuestionsPayload {
    questions: {
        text: string;
        answers: {
            text: string;
            isCorrect: boolean;
        }[];
    }[];
}

export interface AddBulkQuestionsArgs {
    examId: string;
    payload: BulkQuestionsPayload;
}

// دالة الـ API المستقلة
export const addBulkQuestionsApi = async ({ examId, payload }: AddBulkQuestionsArgs) => {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}/bulk`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to add questions");
    }

    return res.json();
};