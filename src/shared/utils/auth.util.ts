import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getNextAuthToken() {
    const cookieStore = await cookies();
    const headerStore = await headers();
    const req = {
        headers: Object.fromEntries(headerStore.entries()),
        cookies: Object.fromEntries(
            cookieStore.getAll().map((c) => [c.name, c.value])
        ),
    };
    const token = await getToken({
        req: req as any,
        secret: process.env.NEXTAUTH_SECRET
    });
    return token;
}