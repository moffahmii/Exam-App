'use server';

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { ExamField } from "../../../shared/schemas/exam-schem";
import { revalidatePath } from "next/cache";
import { ApiResponse } from "@/shared/types/diplomas";
import { withPermission } from "@/shared/utils/auth-action";
import { PERMISSIONS } from "@/shared/utils/permissions.util";

export const updateExamAction = withPermission(
    PERMISSIONS.EXAM.UPDATE,
    async (examId: string, data: ExamField): Promise<{ success: boolean; message: string }> => {
        try {
            const jwt = await getNextAuthToken();
            const token = jwt?.token;

            if (!token) {
                return { success: false, message: "Unauthorized" };
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
                cache: "no-store"
            });

            const resData = await response.json() as ApiResponse<null>;

            if (!response.ok) {
                return { success: false, message: resData.message || "Failed to update exam" };
            }

            revalidatePath('/dashboard/exams');
            revalidatePath(`/dashboard/exams/${examId}`);

            return { success: true, message: "Exam updated successfully" };

        } catch (error) {
            return { success: false, message: "An error occurred while updating the exam" };
        }
    }
);