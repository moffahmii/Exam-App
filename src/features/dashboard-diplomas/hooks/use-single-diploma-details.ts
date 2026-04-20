import { useQuery } from '@tanstack/react-query';

export const fetchDiplomaById = async (id: string) => {
    const response = await fetch(`/api/diplomas/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const result = await response.json();
    console.log("Single Diploma API Response:", result);
    return result.payload.diploma;
};
export default function useDiplomaDetails(id: string) {
    return useQuery({
        queryKey: ['diploma', id],
        queryFn: () => fetchDiplomaById(id),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });
}