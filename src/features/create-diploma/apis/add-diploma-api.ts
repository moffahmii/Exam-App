'use server'

import { DiplomaField } from "@/features/upload-photo/scheme/photo-scheme";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { revalidatePath } from "next/cache";

export async function createDiploma(data: DiplomaField) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    if (!token) {
        return { success: false, message: "Unauthorized - Admin access required" };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || "فشل إنشاء الدبلومة" };
        }

        revalidatePath('/dashboard/diplomas');

        return { success: true, message: "تم إنشاء الدبلومة بنجاح" };

    } catch (error) {
        return { success: false, message: "حدث خطأ في السيرفر" };
    }
}