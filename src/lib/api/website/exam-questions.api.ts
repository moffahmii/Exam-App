'use server'
import { ErrorResponse, IApiResponse, SuccessResponse } from "@/lib/types/api";
import { IQuestion } from "@/lib/types/questions";
import { getNextAuthToken } from "@/lib/utils/auth.util";

export async function getExamQuestions(examId: string): Promise<IApiResponse<{ questions: IQuestion[] }>> {
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

        // هنا بنرجع الـ SuccessResponse
        return data as SuccessResponse<{ questions: IQuestion[] }>;

    } catch (error: any) {
        return {
            status: false,
            message: error.message || "Something went wrong",
            code: 500
        };
    }
}

// @/lib/api/questions.ts

export async function submitExam(examId: string, answers: { questionId: string, answerId: string }[]) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ examId, answers }),
    });

    return await res.json();
}
// @/lib/api/questions.ts

export async function getSubmissionResult(submissionId: string) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${submissionId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        return await res.json();
    } catch (error: any) {
        return { status: false, message: error.message };
    }
}