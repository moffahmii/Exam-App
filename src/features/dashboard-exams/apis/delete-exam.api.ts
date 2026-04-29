'use server';

import { ApiResponse } from "@/shared/types/diplomas";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { revalidatePath } from "next/cache";

export async function deleteExamAction(id: string): Promise<{ success: boolean; message: string }> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        if (!token) {
            return { success: false, message: "Unauthorized" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const resData = await response.json() as ApiResponse<null>;

        if (!response.ok) {
            return { success: false, message: resData.message || "Failed to delete exam" };
        }

        revalidatePath('/dashboard/exams');
        return { success: true, message: "Exam deleted successfully" };

    } catch (error) {
        return { success: false, message: "An error occurred while deleting the exam" };
    }
}