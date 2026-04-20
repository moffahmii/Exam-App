import { useQuery } from '@tanstack/react-query';

export const fetchAllDiplomas = async (): Promise<IDiplomas[]> => {
    const response = await fetch(`/api/diplomas`);
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    return result.payload.data; 
};

export default function useDiplomas() {
    return useQuery({
        queryKey: ['diplomas'],
        queryFn: fetchAllDiplomas,
        staleTime: 10 * 60 * 1000, 
    });
}