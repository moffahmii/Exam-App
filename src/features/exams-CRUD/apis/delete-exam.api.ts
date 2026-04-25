'use server'
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function deleteExamAction(id:string) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || "Failed to delete exam");
    }
    return resData;
    
}