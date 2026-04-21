'use server'

import { DiplomaField } from '@/features/upload-photo/scheme/photo-scheme';
import { getNextAuthToken } from '@/shared/utils/auth.util';
import { revalidatePath } from "next/cache";

export async function editDiploma(id: string, data: DiplomaField) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    if (!token) {
        return { success: false, message: "Unauthorized - Admin access required" };
    }
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            let errorMessage = "Error updating diploma";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch { }

            return { success: false, message: errorMessage };
        }

        revalidatePath('/dashboard/diplomas');
        revalidatePath(`/dashboard/diplomas/${id}`);

        return { success: true, message: "Diploma updated successfully" };

    } catch (error) {
        return { success: false, message: "Error updating diploma" };
    }
}