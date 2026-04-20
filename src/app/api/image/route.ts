import { NextRequest, NextResponse } from "next/server";
import { getNextAuthToken } from "@/shared/utils/auth.util";

export async function POST(req: NextRequest) {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;    

    if (!token) {
        return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: formData,
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        return NextResponse.json({ status: false, message: "Internal Error" }, { status: 500 });
    }
}