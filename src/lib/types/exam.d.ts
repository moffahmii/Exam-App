declare interface IExam {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: number;
    diplomaId: number;
    createdAt: string;
    updatedAt: string;
}declare interface IDiplomaDetail {
    id: string;
    title: string;
    description: string;
    image: string;
    exams: IExam[];
}