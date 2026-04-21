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

    return <>
        <PageHeader
            Children={<>
            <h1>Diplomas</h1>
            </>}
            actions={
                <>
                    <Button onClick={()=>router.push('/dashboard/diplomas/new')} className="bg-emerald-500 hover:bg-emerald-600 h-10 text-sm font-medium">
                        + Add New Diploma
                    </Button>
                </>
            }
        />
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

}