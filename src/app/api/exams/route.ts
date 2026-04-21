// app/api/exams/route.ts

import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function GET(req: Request) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    const { searchParams } = new URL(req.url);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exams?${searchParams.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const data = await response.json();

    return Response.json(data);
}