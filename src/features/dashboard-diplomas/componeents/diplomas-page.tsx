"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/shared/components/custom/header-page";
import { Button } from "@/shared/components/ui/button";

import { DiplomasTable } from "./diplomas-table";
import useDiplomas from "../hooks/use-diplomas-details";
import { AppPagination } from "@/shared/components/custom/app-pagination";
import { GlobalFilters } from "@/shared/components/custom/search-filters";

export default function DiplomasPage() {
    const router = useRouter();

    // 1. حل مشكلة الهيدريشن (Hydration Fix)
    const [isMounted, setIsMounted] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [immutabilityFilter, setImmutabilityFilter] = useState("all");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const { data, isFetching, isLoading } = useDiplomas();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { paginatedData, paginationMeta } = useMemo(() => {
        let allItems = data?.data || data || [];

        if (searchQuery) {
            allItems = allItems.filter((item: any) =>
                item.title?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (immutabilityFilter !== "all") {
            // ✅ تم تصحيح اسم الخاصية لـ immutable بدلاً من isImmutable
            const checkValue = immutabilityFilter === "immutable"; // true لو immutable، false لو mutable
            allItems = allItems.filter((item: any) => item.immutable === checkValue);
        }

        const total = allItems.length;
        const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentData = allItems.slice(startIndex, endIndex);

        return {
            paginatedData: currentData,
            paginationMeta: {
                page,
                limit: ITEMS_PER_PAGE,
                total,
                totalPages: totalPages === 0 ? 1 : totalPages
            }
        };
    }, [data, searchQuery, immutabilityFilter, page]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleFilterChange = (value: string) => {
        setImmutabilityFilter(value);
        setPage(1);
    };

    const handleClearFilters = () => {
        handleSearchChange("");
        handleFilterChange("all");
    };

    const pageBreadcrumbs = [
        { label: "Diplomas" }
    ];

    // ✅ منع الرندر قبل ما المتصفح يكون جاهز (بيمنع أي Hydration Error)
    if (!isMounted) return null;

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f8f9fb]">
            <PageHeader breadcrumbs={pageBreadcrumbs}>
                <div className="flex items-center">
                    <AppPagination
                        meta={paginationMeta}
                        onPageChange={(newPage) => setPage(newPage)}
                        isFetching={false}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => router.push('/dashboard/diplomas/new')}
                        // ✅ تم إضافة rounded-none للحفاظ على التصميم الشارب
                        className="bg-emerald-500 hover:bg-emerald-600 h-10 text-sm font-medium text-white px-4 py-2 rounded-none"
                    >
                        + Add New Diploma
                    </Button>
                </div>
            </PageHeader>

            <main className="p-8 space-y-6">
                <GlobalFilters
                    showSearch={true}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Search by title..."
                    dropdowns={[
                        {
                            value: immutabilityFilter,
                            onChange: handleFilterChange,
                            options: [
                                { label: "All Diplomas", value: "all" },
                                { label: "Immutable", value: "immutable" },
                                { label: "Mutable", value: "mutable" },
                            ]
                        }
                    ]}
                    onClear={handleClearFilters}
                />

                <DiplomasTable
                    data={paginatedData}
                    isLoading={isLoading}
                />
            </main>
        </div>
    );
}