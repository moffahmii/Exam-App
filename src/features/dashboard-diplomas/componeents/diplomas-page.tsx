"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/shared/components/custom/header-page";
import { Button } from "@/shared/components/ui/button";
import { AppPagination } from "@/shared/components/custom/app-pagination";
import { GlobalFilters } from "@/shared/components/custom/search-filters";

import { DiplomasTable } from "./diplomas-table";
import useDiplomas from "../hooks/use-diplomas";
import { IDiplomas } from "@/shared/types/diplomas";

export default function DiplomasPage() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [immutabilityFilter, setImmutabilityFilter] = useState("all");
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    const { data, isLoading, isError } = useDiplomas();

    // 🔥 Normalize data safely
    const allItems: IDiplomas[] = data?.data ?? [];

    const { paginatedData, paginationMeta } = useMemo(() => {
        let filtered = [...allItems];

        if (searchQuery) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (immutabilityFilter !== "all") {
            const isImmutable = immutabilityFilter === "immutable";
            filtered = filtered.filter((item) => item.immutable === isImmutable);
        }

        const total = filtered.length;
        const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

        const start = (page - 1) * ITEMS_PER_PAGE;

        const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

        return {
            paginatedData: paginated,
            paginationMeta: {
                page,
                limit: ITEMS_PER_PAGE,
                total,
                totalPages: totalPages || 1,
            },
        };
    }, [allItems, searchQuery, immutabilityFilter, page]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setImmutabilityFilter("all");
        setPage(1);
    };

    const breadcrumbs = [{ label: "Diplomas" }];

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f8f9fb]">

            <PageHeader breadcrumbs={breadcrumbs}>
                <AppPagination
                    meta={paginationMeta}
                    onPageChange={setPage}
                    isFetching={isLoading}
                />

                <Button
                    onClick={() => router.push("/dashboard/diplomas/new")}
                    className="bg-emerald-500 hover:bg-emerald-600 h-10 text-sm font-medium text-white px-4 py-2 rounded-none"
                >
                    + Add New Diploma
                </Button>
            </PageHeader>

            <main className="p-8 space-y-6">

                <GlobalFilters
                    showSearch
                    searchQuery={searchQuery}
                    onSearchChange={(value) => {
                        setSearchQuery(value);
                        setPage(1);
                    }}
                    searchPlaceholder="Search by title..."
                    dropdowns={[
                        {
                            value: immutabilityFilter,
                            onChange: (value) => {
                                setImmutabilityFilter(value);
                                setPage(1);
                            },
                            options: [
                                { label: "All Diplomas", value: "all" },
                                { label: "Immutable", value: "immutable" },
                                { label: "Mutable", value: "mutable" },
                            ],
                        },
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