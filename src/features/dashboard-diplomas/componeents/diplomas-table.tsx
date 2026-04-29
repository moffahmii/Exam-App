"use client";
import { useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/shared/components/ui/table";
import { SortDropdown } from "./sort-dropdown";
import { DiplomaActions } from "./diploma-actions";
import { TableSkeleton } from "./diploma-table-skeleton";

type SortOption =
    | "title-asc"
    | "title-desc"
    | "newest-asc"
    | "newest-desc";

interface DiplomasTableProps {
    data: any[];
    isLoading: boolean;
}

export function DiplomasTable({ data, isLoading }: DiplomasTableProps) {
    const [sort, setSort] = useState<SortOption>("title-asc");

    // الترتيب (Sorting) بيفضل شغال على البيانات اللي جاية من الصفحة
    const sortedData = [...(data || [])].sort((a: any, b: any) => {
        switch (sort) {
            case "title-asc": return a.title?.localeCompare(b.title);
            case "title-desc": return b.title?.localeCompare(a.title);
            case "newest-asc": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case "newest-desc": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default: return 0;
        }
    });

    return (
        <div className=" overflow-hidden bg-white">
            <Table>
                {/* Header (ثابت ويظهر دائماً) */}
                <TableHeader className="bg-blue-600">
                    <TableRow className="hover:bg-blue-600">
                        <TableHead className="text-white w-25">Image</TableHead>
                        <TableHead className="text-white w-50">Title</TableHead>
                        <TableHead className="text-white">Description</TableHead>
                        <TableHead className="text-right w-25">
                            <SortDropdown value={sort} onChange={setSort} />
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* Body: بناءً على حالة التحميل */}
                {isLoading ? (
                    <TableSkeleton />
                ) : !data || data.length === 0 ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center text-gray-500 font-medium">
                                No diplomas found.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {sortedData.map((item: any) => (
                            <TableRow key={item.id} className="h-25">
                                <TableCell className="p-2.5">
                                    <div className="relative w-25 h-25">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-[10px] text-gray-400 font-medium flex items-center justify-center h-full w-full bg-gray-100 ">
                                                No Image
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">{item.title}</TableCell>
                                <TableCell className="text-gray-500 max-w-125">
                                    <p className="line-clamp-2">{item.description}</p>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DiplomaActions diplomaTitle={item.title} diplomaId={item.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}