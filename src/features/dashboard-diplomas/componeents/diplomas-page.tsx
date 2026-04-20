"use client";

import { useState } from "react";
import { DiplomasFilters } from "./diplomas-filter";
import { DiplomasTable } from "./diplomas-table";

export default function DiplomasPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [immutabilityFilter, setImmutabilityFilter] = useState("all");

    return <div className="p-6">
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

}