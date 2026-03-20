import { IUser } from "./user";

export interface IloginResponse {
    token: string;
    user: IUser
}

export interface ILoginFields {
    username: string;
    password: string;
}