import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getNextAuthToken() {
    const req = {
        cookies: await cookies(),
        headers: await headers(),
    } as any;
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    return token; 
}