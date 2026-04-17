import { ApiResponse } from "../../shared/types/api";

export type DiplomaDetailResponse = ApiResponse<{
    diploma: IDiplomas;
}>;