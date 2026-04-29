'use server';

import { IExamQuestionsResponse } from "@/shared/types/questions";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { withPermission } from "@/shared/utils/auth-action";
import { PERMISSIONS } from "@/shared/utils/permissions.util";

export const getExamQuestions = withPermission(
    PERMISSIONS.QUESTION.READ,
    async (examId: string): Promise<IExamQuestionsResponse> => {
        try {
            const jwt = await getNextAuthToken();
            const token = jwt?.token;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                cache: 'no-store'
            });

            const result = await response.json();
            
            if (!response.ok) {
                return { status: false, code: response.status, message: result.message || "Failed to fetch questions" };
            }
            return result;
        } catch (error) {
            return { status: false, code: 500, message: "Internal server error" };
        }
    }
);