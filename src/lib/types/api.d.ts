
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
    payload?: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;