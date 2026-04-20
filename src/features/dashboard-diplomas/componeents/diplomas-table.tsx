"use client";
import { useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import useDiplomas from "../hooks/use-diplomas-details";
import { SortDropdown } from "./sort-dropdown";
import { DiplomaActions } from "./diploma-actions";

type SortOption =
    | "title-asc"
    | "title-desc"
    | "newest-asc"
    | "newest-desc";

export function DiplomasTable({ searchQuery, immutabilityFilter }: { searchQuery: string; immutabilityFilter: string; }) {
    const { data, isLoading, isError } = useDiplomas();
    const [sort, setSort] = useState<SortOption>("title-asc");


    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500">Error loading diplomas</p>;

    let filteredData = data || [];

    if (searchQuery) {
        filteredData = filteredData.filter((item: any) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (immutabilityFilter !== "all") {
        const checkIsImmutable = immutabilityFilter === "immutable";
        filteredData = filteredData.filter((item: any) => item.isImmutable === checkIsImmutable);
    }

    const sortedData = [...filteredData].sort((a: any, b: any) => {
        switch (sort) {
            case "title-asc": return a.title.localeCompare(b.title);
            case "title-desc": return b.title.localeCompare(a.title);
            case "newest-asc": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case "newest-desc": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default: return 0;
        }
    });

    return (
        <div className="border overflow-hidden">
            <Table>
                {/* Header */}
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

                {/* Body */}
                <TableBody>
                    {sortedData.map((item: any) => (
                        <TableRow key={item.id} className="hover:bg-gray-50 h-25">
                            <TableCell className="p-2.5">
                                <div className="relative w-25 h-25">
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell className="text-gray-500 max-w-[500px]">
                                <p className="line-clamp-2">{item.description}</p>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <DiplomaActions diplomaId={item.id} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}