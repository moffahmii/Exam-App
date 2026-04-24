export interface IExam {
    id: string;
    title: string;
    description?: string;
    image: string | null;
    duration: number;
    diplomaId: string;
    immutable: boolean;
    questionsCount: number;
    createdAt: string;
    updatedAt: string;
    diploma: {
        id: string;
        title: string;
    };
}

export interface IPaginationMetadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IExamsResponse {
    status: boolean;
    code: number;
    payload: {
        data: IExam[];
        metadata: IPaginationMetadata;
    };
}