import { getNextAuthToken } from "@/shared/utils/auth.util";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Zod schema to validate API response at runtime
 */
const ExamSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    image: z.string().nullable(),
    duration: z.number(),
    diplomaId: z.string(),
    immutable: z.boolean(),
    questionsCount: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    diploma: z.object({
        id: z.string(),
        title: z.string(),
    }),
});

const ResponseSchema = z.object({
    status: z.boolean(),
    code: z.number(),
    payload: z.object({
        data: z.array(ExamSchema),
        metadata: z.object({
            page: z.number(),
            limit: z.number(),
            total: z.number(),
            totalPages: z.number(),
        }),
    }),
});

export async function GET(req: Request) {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const { searchParams } = new URL(req.url);

        /**
         * Forward request to external API
         */
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
                { message: "Failed to fetch exams" },
                { status: response.status }
            );
        }

        const rawData = await response.json();

        /**
         * Validate response shape (runtime safety)
         */
        const parsed = ResponseSchema.safeParse(rawData);

        if (!parsed.success) {
            console.error("Validation Error:", parsed.error);
            return NextResponse.json(
                { message: "Invalid API response shape" },
                { status: 500 }
            );
        }

        return NextResponse.json(parsed.data);
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}