import { getNextAuthToken } from "@/lib/utils/auth.util";

export async function getDiplomaExams(id: string) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data;
    } catch (error) {
        return null;
    }
}