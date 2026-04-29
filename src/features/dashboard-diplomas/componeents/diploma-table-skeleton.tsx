import { TableBody, TableCell, TableRow } from "@/shared/components/ui/table";

export const TableSkeleton = () => {
    // ننشئ مصفوفة من 5 عناصر لتمثيل 5 صفوف فارغة أثناء التحميل
    const skeletonRows = Array.from({ length: 5 });

    return (
        <TableBody>
            {skeletonRows.map((_, index) => (
                <TableRow key={index} className="h-25 bg-white">
                    {/* Skeleton للصورة */}
                    <TableCell className="p-2.5">
                        <div className="w-25 h-25 bg-gray-200 animate-pulse " />
                    </TableCell>

                    {/* Skeleton للعنوان */}
                    <TableCell>
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
                    </TableCell>

                    {/* Skeleton للوصف */}
                    <TableCell>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
                            <div className="h-3 bg-gray-200 animate-pulse rounded w-5/6" />
                        </div>
                    </TableCell>

                    {/* Skeleton للأزرار (Actions) */}
                    <TableCell className="text-right">
                        <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full ml-auto" />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};