import { use } from 'react';
import { USER_ROLES } from "../constants/user.constant";

declare interface IUser {
    id: string;
    name: string;
    email: string;
    username: string;
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