import { useQuery } from '@tanstack/react-query';



export default function useDiplomaDetails(id: string) {
    return useQuery({
        queryKey: ['diploma', id],
        queryFn: () => getDiplomaDetails(id),
        enabled: !!id,
    });
}
export const getDiplomaDetails = async (id: string) => {
    const res = await fetch(`/api/diplomas/${id}`);
    return res.json();
};