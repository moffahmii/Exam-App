import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import { IUser } from "./user"

declare module "next-auth" {
    interface User {
        user: IUser;
        token: string;
    }
    interface Session {
        user: IUser;
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        user: IUser;
        token: string;
    }
}