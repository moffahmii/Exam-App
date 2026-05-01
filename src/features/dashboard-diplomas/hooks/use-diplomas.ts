import { DiplomasApiResponse, DiplomasPayload } from '@/shared/types/diplomas';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// شيلنا إرجاع الـ null من الـ Promise
export const fetchAllDiplomas = async (): Promise<DiplomasPayload> => {
    // ضفنا no-store عشان نضمن إن المتصفح مش مخزن استجابة فاضية بالخطأ
    const response = await fetch('/api/diplomas?limit=20', {
        cache: 'no-store'
    });
    const result: DiplomasApiResponse = await response.json();

    if (!response.ok || !result.status) {
        // رمي Error هنا بيسمح لـ React Query إنه يلقطه ويتعامل معاه
        throw new Error(result.message || "Failed to fetch diplomas");
    }

    return result.payload;
};

export default function useDiplomas() {
    return useQuery({
        // يفضل تخلي الـ Key مخصص أكتر عشان ميحصلش تداخل مع كاش صفحة تانية
        queryKey: ['diplomas', 'all'],
        queryFn: fetchAllDiplomas,
        placeholderData: keepPreviousData,
    });
}