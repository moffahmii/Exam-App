import { z } from 'zod';

export const ExamSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description is required"),
    image: z.string().min(1, "Image is required"),
    duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
    diplomaId: z.string().min(1, "Please select a diploma"),
});

export type ExamField = z.infer<typeof ExamSchema>;