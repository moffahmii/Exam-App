import { IUser } from "./user";

export interface IloginResponse {
    token: string;
    user: IUser
}

export interface ILoginFields {
    username: string;
    password: string;
}
export interface IUpdateProfileFields {
    firstName: string;
    lastName: string;
    phone: string;
    profilePhoto?: string;
}

export type IUpdateProfileResponse = IUser