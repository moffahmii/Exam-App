// app/api/diplomas/[id]/route.ts
import { getNextAuthToken } from "@/lib/utils/auth.util";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const jwt = await getNextAuthToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/diplomas/${params.id}`,
        {
            headers: {
                Authorization: `Bearer ${jwt?.token}`,
            },
            cache: "no-store",
        }
    );

    const data = await res.json();

    return Response.json(data);
}