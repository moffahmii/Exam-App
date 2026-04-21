import { z } from "zod";

export const ExamScheme = z.object({
    title: z.string().min(3, "Title is too short"),
    description: z.string().min(10, "Description is too short"),
    image: z.string().min(1, "Image is required"),
    duration: z.coerce.number().min(1, "Duration must be at least 1"), // 🔥 Coerce مهمة جداً هنا
    diplomaId: z.string().min(1, "Diploma ID is required"),
});

export type ExamField = z.infer<typeof ExamScheme>;