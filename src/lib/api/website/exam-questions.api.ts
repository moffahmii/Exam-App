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

// @/lib/api/website/exam-questions.api.ts


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

        const data = await res.json();

        // 1. لو الـ Status الكلية بتاعة الريكويست فيها مشكلة أو الـ الباك إند باعت status: false
        if (!res.ok || data.status === false) {
            throw new Error(data?.message || "Failed to load results");
        }

        // 2. التعديل السحري: إرجاع الـ payload فقط عشان الـ UI يفهمه مباشرة
        return data.payload; 
        
    } catch (error: any) {
        console.error("Fetch API Error:", error);
        throw new Error(error.message || "Failed to fetch submission data");
    }
}