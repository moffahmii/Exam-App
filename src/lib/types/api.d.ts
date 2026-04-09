
declare interface ErrorResponse {
    status: false;
    message: string;
    code: number;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare interface SuccessResponse<T> {
    status: true;
    code: number;
    message?: string;
    payload: T;
}

export type IApiResponse<T> = SuccessResponse<T> | ErrorResponse;