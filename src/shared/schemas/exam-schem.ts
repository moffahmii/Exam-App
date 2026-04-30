import { z } from 'zod';

// في ملف exam-schem.ts تأكد إنه مكتوب كده:
export const ExamSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    image: z.string().optional(),
    duration: z.coerce.number().min(1, "Duration is required"), // 🔥 التغيير هنا
    diplomaId: z.string().min(1, "Diploma is required"),
});
export type ExamField = z.infer<typeof ExamSchema>;