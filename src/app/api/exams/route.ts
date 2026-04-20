import { NextRequest, NextResponse } from "next/server";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function GET(req: NextRequest) {
    const tokenData = await getNextAuthToken();
    const token = tokenData?.token;
    const { searchParams } = new URL(req.url);
    const diplomaId = searchParams.get("diplomaId");
    const params = new URLSearchParams();
    if (diplomaId) {
        params.append("diplomaId", diplomaId);
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/exams?${params.toString()}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store"
            }
        );

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching exams" },
            { status: 500 }
        );
    }
}