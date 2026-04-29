// app/api/exams/route.ts

import { IExamsResponse } from "@/shared/types/exam";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;
        if (!token) {
            return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
        }
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

        if (!response.ok) {
            return NextResponse.json(
                { status: false, message: "Failed to fetch exams from backend" },
                { status: response.status }
            );
        }
        const data: IExamsResponse = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}