import { ApiResponse } from "./api";

export type DiplomaDetailResponse = ApiResponse<{
    diploma: IDiplomas;
}>;