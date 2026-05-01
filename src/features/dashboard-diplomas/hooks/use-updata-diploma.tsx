import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDiploma } from '../apis/edit-diploma';
import { DiplomaField } from '@/shared/schemas/photo-scheme';

export function useEditDiploma(diplomaId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DiplomaField) => {
            return await editDiploma(diplomaId, data);
        },
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ['diplomas'] });
                queryClient.invalidateQueries({ queryKey: ['diploma', diplomaId] });
            }
        },
    });
}