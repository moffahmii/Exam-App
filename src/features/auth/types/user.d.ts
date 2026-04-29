import { use } from 'react';
import { USER_ROLES } from "../../../shared/constants/user.constant";

export interface IUser {
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
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];