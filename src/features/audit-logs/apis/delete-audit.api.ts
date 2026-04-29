'use server'

import { IApiResponse } from "@/shared/types/api";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function deleteAuditLogAction(id: string): Promise<IApiResponse<null>> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/audit-logs/${id}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                status: false,
                code: response.status,
                message: result.message || "Server Error"
            };
        }

        return result;
    } catch (error) {
        return {
            status: false,
            code: 500,
            message: "Network Error"
        };
    }
}