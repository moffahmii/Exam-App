'use server';

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { withPermission } from "@/shared/utils/auth-action";
import { PERMISSIONS } from "@/shared/utils/permissions.util";

export const getExamDetailsAction = withPermission(
    PERMISSIONS.EXAM.READ,
    async (id: string) => {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        if (!token) {
            throw new Error("Unauthorized");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        const resData = await response.json();

        if (!response.ok) {
            throw new Error(resData.message || "Failed to fetch exam details");
        }

        return resData.payload.exam;
    }
);