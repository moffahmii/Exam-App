'use server'
import { getNextAuthToken } from "@/shared/utils/auth.util";
export async function deleteDiplomaApi(id: string) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const payload = await response.json();
    return payload;
};