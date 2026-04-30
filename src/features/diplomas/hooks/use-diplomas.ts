import { DiplomasPayload } from '@/shared/types/diplomas';
import { useInfiniteQuery } from '@tanstack/react-query';

export const fetchDiplomas = async ({ pageParam = 1 }): Promise<DiplomasPayload> => {
    const response = await fetch(`/api/diplomas?page=${pageParam}`);

    const result = await response.json();

    if (!response.ok || !result.payload) {
        throw new Error(result.message || "Failed to fetch diplomas");
    }

    return result.payload;
};

export default function useDiplomas() {
    return useInfiniteQuery({
        queryKey: ['diplomas'],
        queryFn: fetchDiplomas,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.metadata;
            return page < totalPages ? page + 1 : undefined;
        },
    });
}