declare interface IDiplomas {
    id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

declare interface DiplomasPayload {
    data: IDiplomas[];
    metadata: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
declare interface DiplomaDetailResponse {
    status: boolean
    code: number
    payload: {
        diploma: Diploma
    }
}
type DiplomasApiResponse = ApiResponse<DiplomasPayload>;