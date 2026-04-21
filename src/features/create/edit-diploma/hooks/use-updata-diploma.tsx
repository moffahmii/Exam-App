import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDiploma } from '../apis/edit-diploma';
import { DiplomaField } from '@/features/upload-photo/scheme/photo-scheme';

export function useEditDiploma(diplomaId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DiplomaField) => editDiploma(diplomaId, data), // ✅ تمرير المعاملات بشكل منفصل
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diplomas'] });
            queryClient.invalidateQueries({ queryKey: ['diploma', diplomaId] });
        },
    });
}