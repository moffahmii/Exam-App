import { Skeleton } from "@/shared/components/ui/skeleton";

export function DiplomaSkeleton() {
    return (
        <div className="w-full max-w-84 h-111.5 bg-white flex flex-col p-0">
            <Skeleton className="w-full h-full rounded-none relative overflow-hidden">
                <div className="absolute bottom-5 left-5 right-5 bg-gray-200/60 backdrop-blur-sm p-4 flex flex-col gap-3">
                    <Skeleton className="h-7 w-3/4 bg-gray-300/80" />
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-full bg-gray-300/60" />
                        <Skeleton className="h-3 w-4/5 bg-gray-300/60" />
                    </div>
                </div>
            </Skeleton>
        </div>
    )
}