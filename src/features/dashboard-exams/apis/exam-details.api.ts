'use server'
import { getNextAuthToken } from "@/shared/utils/auth.util";
export async function getExamDetailsAction(id: string) {
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
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch exam details");
    }
    return data.payload;
}