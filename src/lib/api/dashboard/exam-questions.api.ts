import { IQuestion } from "@/lib/types/questions";
import { getNextAuthToken } from "@/lib/utils/auth.util";

export async function getExamQuestions(examId: string): Promise<{ questions: IQuestion[] } | null> {

    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } 
    catch (error) {
        return null;
    }
}
