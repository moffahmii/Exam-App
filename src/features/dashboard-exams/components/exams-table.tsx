"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { useExams } from "../hooks/use-exams";
import { IExam } from "../types/exam";
import { Button } from "@/shared/components/ui/button";

type SortOption = "title-asc" | "title-desc" | "duration-asc" | "duration-desc";

export function ExamsTable({
    id,
    searchQuery,
    durationFilter,
}: {
    id: string;
    searchQuery: string;
    durationFilter: string;
}) {
    const { data, isLoading, isError } = useExams(id);
    const [sort, setSort] = useState<SortOption>("title-asc");

    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500">Error</p>;

    let exams: IExam[] = data?.payload?.data || [];

    // 🔍 Search
    if (searchQuery) {
        exams = exams.filter((e) =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // ⏱ Duration Filter
    if (durationFilter !== "all") {
        exams = exams.filter((e) => {
            if (durationFilter === "short") return e.duration < 30;
            if (durationFilter === "medium") return e.duration >= 30 && e.duration <= 60;
            if (durationFilter === "long") return e.duration > 60;
            return true;
        });
    }

    // 🔃 Sort
    const sorted = [...exams].sort((a, b) => {
        switch (sort) {
            case "title-asc": return a.title.localeCompare(b.title);
            case "title-desc": return b.title.localeCompare(a.title);
            case "duration-asc": return a.duration - b.duration;
            case "duration-desc": return b.duration - a.duration;
            default: return 0;
        }
    });

    return (
        <div className="border overflow-hidden">
            <Table>
                <TableHeader className="bg-blue-600">
                    <TableRow className="hover:bg-blue-600">
                        <TableHead className="text-white">Image</TableHead>
                        <TableHead className="text-white">Title</TableHead>
                        <TableHead className="text-white">Description</TableHead>
                        <TableHead className="text-white">Duration</TableHead>
                        <TableHead className="text-white text-right">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortOption)}
                                className="bg-white text-black px-2 py-1 rounded"
                            >
                                <option value="title-asc">Title ↑</option>
                                <option value="title-desc">Title ↓</option>
                                <option value="duration-asc">Duration ↑</option>
                                <option value="duration-desc">Duration ↓</option>
                            </select>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sorted.map((exam) => (
                        <TableRow key={exam.id} className="hover:bg-gray-50">
                            <TableCell>
                                <div className="relative w-20 h-20">
                                    <Image
                                        src={exam.image || "/placeholder.png"}
                                        alt={exam.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </TableCell>

                            <TableCell>{exam.title}</TableCell>

                            <TableCell className="text-gray-500">
                                {exam.description}
                            </TableCell>

                            <TableCell>{exam.duration} min</TableCell>

                            <TableCell className="text-right">
                                <Button size="sm">Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}