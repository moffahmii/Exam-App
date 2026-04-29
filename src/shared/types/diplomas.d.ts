export interface IDiplomas {
    id: string;
    title: string;
    description: string;
    image: string;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DiplomasPayload {
    data: IDiplomas[];
    metadata: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface DiplomaDetailResponse {
    status: boolean;
    code: number;
    payload: {
        diploma: IDiplomas;
    };
}

export interface ApiResponse<T> {
    status: boolean;
    code: number;
    message?: string;
    payload: T;
}

export type DiplomasApiResponse = ApiResponse<DiplomasPayload>;