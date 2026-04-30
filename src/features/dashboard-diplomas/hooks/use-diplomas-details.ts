import { DiplomasApiResponse, DiplomasPayload } from '@/shared/types/diplomas';
import { useQuery } from '@tanstack/react-query';

export const fetchAllDiplomas = async (): Promise<DiplomasPayload | null> => {
    try {
        const response = await fetch('/api/diplomas?limit=50');
        const result: DiplomasApiResponse = await response.json();

        if (!response.ok || !result.status) {
            console.error('Failed to fetch diplomas:', result.message);
            return null; 
        }

        return result.payload;
    } catch (error) {
        console.error('Error fetching diplomas:', error);
        return null; 
    }
};

export default function useDiplomas() {
    return useQuery({
        queryKey: ['diplomas'],
        queryFn: fetchAllDiplomas,
        refetchOnMount: true, 
        staleTime: 10 * 60 * 1000,
    });
}