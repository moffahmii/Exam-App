import { IExam } from '@/shared/types/exam';
import { useQuery } from '@tanstack/react-query';

// 🔥 عملنا Interface بسيط يجمع البيانات اللي محتاجينها
export interface IDiplomaDetails {
    title: string;
    exams: IExam[];
}

export function useDiplomaDetails(diplomaId: string) {
    return useQuery({
        // غيّرنا الـ key عشان يعبر عن إننا بنجيب تفاصيل الدبلومة كلها
        queryKey: ['diploma-details', diplomaId],
        queryFn: () => fetchDiplomaDetailsClient(diplomaId),
        enabled: !!diplomaId,
    });
}

const fetchDiplomaDetailsClient = async (id: string): Promise<IDiplomaDetails> => {
    const res = await fetch(`/api/diplomas/${id}`);
    if (!res.ok) throw new Error('Failed to fetch diploma details');
    const data = await res.json();

    // 🔥 هنا التعديل الجوهري: بنرجع الاسم والامتحانات مع بعض
    return {
        title: data.payload?.diploma?.title || 'Unknown Diploma',
        exams: data.payload?.diploma?.exams || []
    };
};