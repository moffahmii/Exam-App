'use server'
import { ErrorResponse, IApiResponse, SuccessResponse } from "@/shared/types/api";
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
        return data as SuccessResponse<{ questions: IQuestion[] }>;
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
        const data = await res.json();
        if (!res.ok || data.status === false) {
            throw new Error(data?.message || "Failed to load results");
        }
        return data.payload; 
        
    } catch (error: any) {
        console.error("Fetch API Error:", error);
        throw new Error(error.message || "Failed to fetch submission data");
    }
}