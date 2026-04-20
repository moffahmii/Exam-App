import { useQuery } from '@tanstack/react-query';
import { IExam } from '../types/exam';

export function useDiplomaExams(diplomaId: string) {
    return useQuery({
        queryKey: ['diploma-exams', diplomaId],
        queryFn: () => fetchDiplomaExamsClient(diplomaId),
        enabled: !!diplomaId, 
    });
}

const fetchDiplomaExamsClient = async (id: string): Promise<IExam[]> => {
    const res = await fetch(`/api/diplomas/${id}`);
    if (!res.ok) throw new Error('Failed to fetch exams');
    const data = await res.json();
    return data.payload?.diploma?.exams || [];
};

