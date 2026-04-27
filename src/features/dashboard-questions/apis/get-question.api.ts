// features/dashboard-exams/apis/get-exam-questions.api.ts

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { IExamQuestionsResponse } from "../types/question";

export const getExamQuestions = async (examId: string): Promise<IExamQuestionsResponse> => {

    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch questions");
    }

    return response.json();
};