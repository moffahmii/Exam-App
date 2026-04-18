export interface IExam {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    questionsCount: number;
    diplomaId: string;
    createdAt: string;
    updatedAt: string;
}

// لو الـ API دايماً بيرجع الداتا جوه أوبجكت اسمه exam، تقدر تستخدم التايب ده للرد (Response)
export interface ExamDetailResponse {
    exam: IExam;
}