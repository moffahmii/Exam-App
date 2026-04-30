"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

// المكونات الجلوبال
import { PageHeader } from "@/shared/components/custom/header-page";
import { AppPagination } from "@/shared/components/custom/app-pagination";

// مكونات الصفحة والـ Hooks
import { useExams } from "../hooks/use-exams";
import { ExamsTable } from "./exams-table";
import useDiplomas from "@/features/dashboard-diplomas/hooks/use-diplomas";
import { GlobalFilters } from "@/shared/components/custom/search-filters";

export function ExamsPage() {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("createdAt_desc");
    const [sortBy, sortOrder] = sort.split("_");

    // 1. مسودة البحث والفلاتر (الواجهة فقط)
    const [draftSearch, setDraftSearch] = useState("");
    const [draftDiplomaId, setDraftDiplomaId] = useState("");
    const [draftImmutable, setDraftImmutable] = useState("");

    // 2. الفلاتر الفعلية (متطابقة مع الـ Hook كـ string)
    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        diplomaId: "",
        immutable: ""
    });

    // 3. جلب الامتحانات
    const { data: examsData, isLoading: isLoadingExams, isFetching: isFetchingExams } = useExams({
        page,
        limit: 20,
        sortBy,
        sortOrder,
        ...appliedFilters
    });

    // 4. جلب الدبلومات للقائمة المنسدلة
    const { data: diplomasResponse, isLoading: isLoadingDiplomas } = useDiplomas();

    const diplomasList = Array.isArray(diplomasResponse)
        ? diplomasResponse
        : diplomasResponse?.data || [];

    const diplomaOptions = diplomasList.map((d: any) => ({
        label: d.title,
        value: d.id
    }));

    // 5. دوال التحكم
    const handleApply = () => {
        setAppliedFilters({
            search: draftSearch.trim(),
            diplomaId: draftDiplomaId,
            immutable: draftImmutable // بنبعتها String زي ما الـ Hook مستني
        });
        setPage(1);
    };

    const handleClear = () => {
        setDraftSearch("");
        setDraftDiplomaId("");
        setDraftImmutable("");

        setAppliedFilters({ search: "", diplomaId: "", immutable: "" });
        setPage(1);
    };

    const pageBreadcrumbs = [
        { label: "Exams" }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f8f9fb]">

            <PageHeader breadcrumbs={pageBreadcrumbs}>
                <div className="flex items-center">
                    <AppPagination
                        meta={examsData?.metadata}
                        onPageChange={setPage}
                        isFetching={isFetchingExams}
                    />
                </div>

                <Link
                    href="/dashboard/exams/new"
                    className="ml-auto h-10 px-6 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white flex items-center justify-center shrink-0 rounded-none"
                >
                    <Plus className="w-4 h-4 mr-2 stroke-[3px] text-white" />
                    <span className="text-sm font-medium">Add New Exam</span>
                </Link>
            </PageHeader>

            <main className="p-8 space-y-6">

                <GlobalFilters
                    showSearch={true}
                    searchQuery={draftSearch}
                    onSearchChange={setDraftSearch}
                    searchPlaceholder="Search exams by title..."
                    dropdowns={[
                        {
                            value: draftDiplomaId,
                            onChange: setDraftDiplomaId,
                            placeholder: isLoadingDiplomas ? "Loading Diplomas..." : "All Diplomas",
                            options: [
                                { label: "All Diplomas", value: "" },
                                ...diplomaOptions
                            ],
                            disabled: isLoadingDiplomas
                        },
                        {
                            value: draftImmutable,
                            onChange: setDraftImmutable,
                            placeholder: "Immutability",
                            options: [
                                { label: "All", value: "" },
                                { label: "Locked (True)", value: "true" },
                                { label: "Editable (False)", value: "false" }
                            ]
                        }
                    ]}
                    onApply={handleApply}
                    onClear={handleClear}
                />

                <ExamsTable
                    exams={examsData?.data || []}
                    isLoading={isLoadingExams}
                    isFetching={isFetchingExams}
                    currentSort={sort}
                    onSortChange={setSort}
                />

            </main>
        </div>
    );
}