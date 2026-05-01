'use client';

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { 
    ArrowDownAz, 
    ArrowUpAz, 
    CalendarArrowDown, 
    CalendarArrowUp, 
    ArrowDownUp 
} from "lucide-react";
import { cn } from "@/shared/utils/cn.util";

/**
 * التصميم الجديد يعتمد على دمج الحقل مع الاتجاه في خيار واحد
 * لتسهيل تجربة المستخدم كما في الصورة المرفقة.
 */

type SortValue = 
    | 'action-desc' | 'action-asc' 
    | 'user-desc' | 'user-asc' 
    | 'entity-desc' | 'entity-asc' 
    | 'createdAt-desc' | 'createdAt-asc';

interface SortOption {
    label: string;
    value: SortValue;
    icon: React.ElementType;
}

const SORT_OPTIONS: SortOption[] = [
    { label: 'Action', value: 'action-desc', icon: ArrowDownAz },
    { label: 'Action', value: 'action-asc', icon: ArrowUpAz },
    { label: 'User', value: 'user-desc', icon: ArrowDownAz },
    { label: 'User', value: 'user-asc', icon: ArrowUpAz },
    { label: 'Entity', value: 'entity-desc', icon: ArrowDownAz },
    { label: 'Entity', value: 'entity-asc', icon: ArrowUpAz },
    { label: 'Newest', value: 'createdAt-desc', icon: CalendarArrowDown },
    { label: 'Newest', value: 'createdAt-asc', icon: CalendarArrowUp },
];

interface AuditLogsSortProps {
    value: string;
    onChange: (value: string) => void;
}

export function AuditLogsSort({ value, onChange }: AuditLogsSortProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-none transition-colors outline-none font-mono text-xs font-bold uppercase tracking-widest shadow-sm">
                    <span>Sort</span>
                    <ArrowDownUp className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
                align="end" 
                className="w-64 rounded-none border border-gray-200 bg-white p-0 shadow-xl"
            >
                <div className="flex flex-col py-1">
                    {SORT_OPTIONS.map((option) => {
                        const isActive = value === option.value;
                        const isDescending = option.value.includes('desc');
                        const Icon = option.icon;

                        return (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => onChange(option.value)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 cursor-pointer outline-none transition-colors rounded-none",
                                    isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-400")} />
                                
                                <div className="flex items-center gap-1.5 flex-1">
                                    <span className={cn("text-sm font-bold font-mono", isActive ? "text-blue-900" : "text-gray-900")}>
                                        {option.label}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                                        ({isDescending ? 'descending' : 'ascending'})
                                    </span>
                                </div>
                            </DropdownMenuItem>
                        );
                    })}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}