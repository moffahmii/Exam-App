export interface IExam {
    id: string; 
    title: string;
    description: string;
    image: string;
    duration: number;
    createdAt: string;
}

export interface IDiplomaDetail {
    id: string;
    title: string;
    description: string;
    image: string;
    exams: IExam[];
    createdAt: string;
    updatedAt: string;
}

export interface DiplomaDetailResponse {
    status: boolean;
    code: number;
    payload: {
        diploma: IDiplomaDetail;
    };
}