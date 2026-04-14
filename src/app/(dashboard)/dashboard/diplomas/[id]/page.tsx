'use client';

import useDiplomaDetails from '@/app/(website)/_hooks/use-diploma-details';
import { Ban, Pencil, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function DiplomaClient() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
      console.log("PARAMS:", params);

    const { data, isLoading, isError } = useDiplomaDetails(id);

    const diploma = data?.payload;
    console.log('API DATA:', data);
    // Loading state
    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="animate-spin w-8 h-8 border-b-2 border-blue-600 rounded-full" />
            </div>
        );
    }

    // Error state
    if (isError || !diploma) {
        return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center text-red-500">
                <p>حدث خطأ أو لم يتم العثور على الدبلومة</p>

                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-black transition-colors"
                >
                    رجوع
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between mb-6 bg-white py-4 px-4 font-mono border-b border-gray-200">

            {/* Actions */}
            <div className="flex gap-3 items-center">

                <span className="flex items-center gap-2 px-4 py-2 bg-[#E5E7EB] text-gray-700 text-sm font-medium">
                    <Ban size={18} />
                    Immutable
                </span>

                <button
                    onClick={() => router.push(`/dashboard/diplomas/${id}/edit`)}
                    className="flex items-center gap-2 px-5 py-2 bg-[#2563EB] text-white text-sm hover:bg-blue-700 transition-colors"
                >
                    <Pencil size={18} />
                    Edit
                </button>

                <button
                    className="flex items-center gap-2 px-5 py-2 bg-[#DC2626] text-white text-sm hover:bg-red-700 transition-colors"
                >
                    <Trash2 size={18} />
                    Delete
                </button>

            </div>
        </div>
    );
}