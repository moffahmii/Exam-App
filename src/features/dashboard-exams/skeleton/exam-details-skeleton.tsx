import { Skeleton } from "@/shared/components/ui/skeleton";

export function ExamDetailsSkeleton() {
    return (
        <div className="h-auto w-full bg-gray-100 min-h-screen animate-pulse">
            {/* Header Skeleton */}
            <div className="w-full h-32 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-24 rounded-none" />
                    <Skeleton className="h-10 w-24 rounded-none" />
                </div>
            </div>

            {/* Body Skeleton */}
            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
                <div className="bg-white p-6 border border-gray-200 space-y-8">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-[300px] w-[300px] rounded-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-5 w-48" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Questions List Skeleton */}
                <div className="bg-white p-6 border border-gray-200">
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        </div>
    );
}