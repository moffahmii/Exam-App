import z from "zod";
import { IUser } from "./user";
import { loginSchema } from "@/shared/schemas/auth-schema";


export type LoginFields = z.infer<typeof loginSchema>

export interface LoginResponse {
    user: IUser;
    token: string;
}