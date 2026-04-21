// services/exams.ts

export const getExams = async (params: any) => {
    const res = await fetch(`/api/exams?${new URLSearchParams(params)}`);
    return res.json();
};