// src/app/dashboard/exams/[id]/create/page.tsx

import ExamForm from "@/features/create/edit-diploma/components/add-exam-form";


export default async function CreateExamPage({ params }: { params: { id: string } }) {

    // سحبنا الـ ID من اللينك (ea2d6c19-2bbe...)
    const diplomaId = params.id;

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">إضافة امتحان جديد</h1>
                <p className="text-slate-500 mt-1">سيتم ربط هذا الامتحان تلقائياً بالدبلومة المختارة.</p>
            </div>

            {/* باصينا الـ ID للفورم وشكراً */}
            <ExamForm DiplomaId={diplomaId} />
        </div>
    )
}