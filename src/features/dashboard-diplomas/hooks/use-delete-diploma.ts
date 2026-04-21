import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiplomaApi } from "../apis/delete-diploma-api";
export default function useDeleteDiploma() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteDiplomaApi(id),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diplomas'] });
        }
    });
}