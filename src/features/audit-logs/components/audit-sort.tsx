'use client';

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuPortal,
    DropdownMenuGroup, // ✅ استدعينا الـ Group هنا
} from "@/shared/components/ui/dropdown-menu";
import { Check, ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react";

type SortField = 'action' | 'user' | 'entity' | 'createdAt';
type SortOrder = 'asc' | 'desc';

interface SortOption {
    field: SortField;
    label: string;
}

const SORT_FIELDS: SortOption[] = [
    { field: 'action', label: 'Action' },
    { field: 'user', label: 'User' },
    { field: 'entity', label: 'Entity' },
    { field: 'createdAt', label: 'Newest' },
];

interface AuditLogsSortProps {
    value: string;
    onChange: (value: string) => void;
}

export function AuditLogsSort({ value, onChange }: AuditLogsSortProps) {
    const [field, order] = value.split('-') as [SortField, SortOrder];

    const handleFieldChange = (newField: SortField) => {
        if (newField === field) {
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            onChange(`${newField}-${newOrder}`);
        } else {
            onChange(`${newField}-desc`);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex items-center gap-1.5 hover:bg-blue-700 px-3 py-1.5 rounded-md transition-colors outline-none cursor-pointer border-none bg-transparent text-white select-none"
            >
                <span className="uppercase text-sm font-medium">Sort</span>
                <ArrowDownUp className="w-4 h-4" />
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
                <DropdownMenuContent
                    align="end"
                    sideOffset={5}
                    className="w-56 bg-white z-[999] shadow-xl border border-gray-200 p-1 rounded-lg"
                >
                    {/* ✅ غلفنا الجزء الأول في Group */}
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase">Sort by</DropdownMenuLabel>
                        {SORT_FIELDS.map((item) => {
                            const isActive = item.field === field;
                            return (
                                <DropdownMenuItem
                                    key={item.field}
                                    onClick={() => handleFieldChange(item.field)}
                                    className="flex items-center justify-between px-2 py-2 text-sm cursor-pointer hover:bg-blue-50 rounded-md outline-none"
                                >
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <div className="flex items-center gap-1">
                                            {order === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                            <Check className="w-4 h-4 text-blue-600" />
                                        </div>
                                    )}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-1 bg-gray-100" />

                    {/* ✅ غلفنا الجزء التاني في Group */}
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase">Order</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => onChange(`${field}-asc`)}
                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-blue-50 rounded-md outline-none"
                        >
                            <span className="flex items-center gap-2"><ArrowUp className="w-4 h-4" /> Ascending</span>
                            {order === 'asc' && <Check className="w-4 h-4 text-blue-600" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onChange(`${field}-desc`)}
                            className="flex justify-between px-2 py-2 text-sm cursor-pointer hover:bg-blue-50 rounded-md outline-none"
                        >
                            <span className="flex items-center gap-2"><ArrowDown className="w-4 h-4" /> Descending</span>
                            {order === 'desc' && <Check className="w-4 h-4 text-blue-600" />}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}