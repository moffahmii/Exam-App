'use server'

import { SubmissionData } from "@/shared/types/sub,ission";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function getSubmissionResult(submissionId: string): Promise<SubmissionData> {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${submissionId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        const data = await res.json();

        if (!res.ok || data.status === false) {
            throw new Error(data?.message || "Failed to load results");
        }
        return data.payload as SubmissionData;

    } catch (error: unknown) {
        console.error("Fetch API Error:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Failed to fetch submission data");
    }
}