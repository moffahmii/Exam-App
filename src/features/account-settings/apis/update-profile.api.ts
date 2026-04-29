'use server'
import { serverFetch } from "@/shared/utils/server-fetch";
import { IUpdateProfileFields } from "../types/profile-fields";
import { IApiResponse } from "@/shared/types/api";

export async function updateProfileAction(
    fields: IUpdateProfileFields
): Promise<IApiResponse<null>> {
    return serverFetch<null>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        {
            method: "PATCH",
            body: JSON.stringify(fields),
        }
    );
}