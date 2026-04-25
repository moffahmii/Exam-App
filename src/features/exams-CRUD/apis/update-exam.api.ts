'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { ExamField } from "../shceme/exam-schem";

export async function updateExamAction(examId: string, data: ExamField) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    if (!token) {
        throw new Error("Unauthorized");
    }

    // تأكد إن الباك إند بيستخدم PUT أو PATCH للتعديل (الأغلب بيكون PATCH)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}`, {
        method: 'PUt', // لو الباك إند طالب PUT غيرها
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            cache: "no-store"
        },
        body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "Failed to update exam");
    }

    return resData;
}