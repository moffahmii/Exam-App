'use server';

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { ExamField } from "../../exams-CRUD/shceme/exam-schem";
import { revalidatePath } from "next/cache";
import { ApiResponse } from "@/shared/types/diplomas";

export async function createExamAction(data: ExamField): Promise<{ success: boolean; message: string }> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        if (!token) {
            return { success: false, message: "Unauthorized - Admin access required" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        const resData = await response.json() as ApiResponse<null>;

        if (!response.ok) {
            return { success: false, message: resData.message || "Failed to create exam" };
        }

        revalidatePath('/dashboard/exams');
        return { success: true, message: "Exam created successfully" };

    } catch (error) {
        return { success: false, message: "An error occurred while creating the exam" };
    }
}