'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { ExamField } from "../shceme/exam-schem";

export async function createExamAction(data: ExamField) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data), // الداتا زي ما الباك إند طالبها بالظبط
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "Failed to create exam");
    }

    return resData;
}