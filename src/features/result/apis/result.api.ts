'use server'
import { getNextAuthToken } from "@/lib/utils/auth.util";
export async function getSubmissionResult(submissionId: string) {
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
        return data.payload;

    } catch (error: any) {
        console.error("Fetch API Error:", error);
        throw new Error(error.message || "Failed to fetch submission data");
    }
}