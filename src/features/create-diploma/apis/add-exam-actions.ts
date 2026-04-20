'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { revalidatePath } from "next/cache";
import { ExamField } from "../scheme/exam-field";

export async function createExam(data: ExamField) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    if (!token) return { success: false, message: "Unauthorized - Admin access required" };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || "فشل إنشاء الامتحان" };
        }

        revalidatePath('/dashboard/exams');

        // ممكن نرجع الداتا بتاعة الامتحان (عشان ناخد الـ ID بتاعه للأسئلة بعدين)
        const responseData = await response.json();
        return { success: true, message: "تم إنشاء الامتحان بنجاح", exam: responseData.exam };

    } catch (error) {
        return { success: false, message: "حدث خطأ في السيرفر" };
    }
}