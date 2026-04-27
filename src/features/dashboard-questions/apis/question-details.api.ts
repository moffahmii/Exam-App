'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function getQuestionDetails(quetionId: string) {

    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${quetionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch questions");
    }

    return response.json();
}