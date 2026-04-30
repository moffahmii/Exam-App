'use server'
import { ErrorResponse, IApiResponse, SuccessResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { Question } from "../hooks/use-examFrom";

export async function getExamQuestions(examId: string): Promise<IApiResponse<{ questions: Question[] }>> {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) {
            return data as ErrorResponse;
        }
        return data as SuccessResponse<{ questions: Question[] }>;
    } catch (error: any) {
        return {
            status: false,
            message: error.message || "Something went wrong",
            code: 500
        };
    }
}
export async function submitExam(payload: {
    examId: string;
    answers: { questionId: string; answerId: string }[];
    startedAt: string;
}) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/submissions`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }
    );

    return await res.json();
}

