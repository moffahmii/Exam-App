import { USER_ROLES } from "../constants/user.constant";

declare interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    firstName: string;
    lastName: string;
    profilePhoto: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: IRole;
    createdAt: string;
    updatedAt: string;
}

export type IRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];