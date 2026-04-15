// src/lib/utils/auth.util.ts
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getNextAuthToken() {
    // في Next.js 15/16، cookies و headers يفضل عمل await لهما
    const cookieStore = await cookies();
    const headerStore = await headers();

    const req = {
        headers: Object.fromEntries(headerStore.entries()),
        cookies: Object.fromEntries(
            cookieStore.getAll().map((c) => [c.name, c.value])
        ),
    };

    // نمرر الـ req لـ getToken الخاص بـ next-auth
    const token = await getToken({
        req: req as any,
        secret: process.env.NEXTAUTH_SECRET
    });

    return token;
}