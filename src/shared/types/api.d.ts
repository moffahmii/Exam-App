declare interface ErrorResponse {
    status: false;
    message: string;
    code: number;
    payload?: T
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