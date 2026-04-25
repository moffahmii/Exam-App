"use client";
import { useState } from "react";
import { DiplomasFilters } from "./diplomas-filter";
import { DiplomasTable } from "./diplomas-table";
import { PageHeader } from "@/features/dashboard-header/components/header-page";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";

export default function DiplomasPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [immutabilityFilter, setImmutabilityFilter] = useState("all");
    const router = useRouter();

    return (
        <>
            <PageHeader>
                <div className="flex justify-between items-center w-full">
                    {/* الجزء اللي على الشمال (العنوان) */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-black font-semibold font-inter text-xl">Diplomas</h1>
                    </div>

                    {/* الجزء اللي على اليمين (الزراير) */}
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => router.push('/dashboard/diplomas/new')}
                            className="bg-emerald-500 hover:bg-emerald-600 h-10 text-sm font-medium text-white px-4 py-2"
                        >
                            + Add New Diploma
                        </Button>
                    </div>
                </div>
            </PageHeader>

            <div className="p-6">
                <DiplomasFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    immutabilityFilter={immutabilityFilter}
                    setImmutabilityFilter={setImmutabilityFilter}
                />
                <DiplomasTable
                    searchQuery={searchQuery}
                    immutabilityFilter={immutabilityFilter}
                />
            </div>
        </>
    );
}