import { Skeleton } from "@/shared/components/ui/skeleton";

export function DiplomaDetailsSkeleton() {
    return (
        <div className="h-auto animate-pulse">
            {/* Header Skeleton */}
            <div className="w-full h-32 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>

            {/* Body Skeleton */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white p-6 border border-gray-200 space-y-8">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-64 w-96 object-cover" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
        </div>
    );
}