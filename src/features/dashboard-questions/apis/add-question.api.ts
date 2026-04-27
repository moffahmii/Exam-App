'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function addQuestion() {

    const jwt = await getNextAuthToken();
    const token = jwt?.token;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
}