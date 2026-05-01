'use server';

import { DiplomaField } from '@/shared/schemas/photo-scheme';
import { ApiResponse } from '@/shared/types/diplomas';
import { getNextAuthToken } from '@/shared/utils/auth.util';
import { revalidatePath } from "next/cache";
import { withPermission } from "@/shared/utils/auth-action";
import { PERMISSIONS } from "@/shared/utils/permissions.util";

export const editDiploma = withPermission(
    PERMISSIONS.DIPLOMA.UPDATE,
    async (id: string, data: DiplomaField): Promise<{ success: boolean; message: string }> => {
        try {
            const jwt = await getNextAuthToken();
            const token = jwt?.token;
            if (!token) {
                return { success: false, message: "Unauthorized - Admin access required" };
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                let errorMessage = "Error updating diploma";
                try {
                    const errorData = await response.json() as ApiResponse<null>;
                    errorMessage = errorData.message || errorMessage;
                } catch (error) {
                    console.error('Error parsing API response:', error);
                }
                return { success: false, message: errorMessage };
            }
            revalidatePath('/dashboard/diplomas');
            revalidatePath(`/dashboard/diplomas/${id}`);
            return { success: true, message: "Diploma updated successfully" };
        } catch (error) {
            return { success: false, message: "Error updating diploma" };
        }
    }
);