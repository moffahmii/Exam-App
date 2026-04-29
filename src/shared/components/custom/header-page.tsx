"use client";

import React, { ReactNode } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";

export interface BreadcrumbType {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    children?: ReactNode;
    breadcrumbs?: BreadcrumbType[];
}

export function PageHeader({ children, breadcrumbs }: PageHeaderProps) {
    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex flex-col w-full">

                {/* 1. صف الـ Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    // ضفنا هنا Padding و Border من تحت عشان يفصل بينه وبين اللي تحته
                    <div className="px-6 py-3 border-b border-gray-100">
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((item, index) => {
                                    const isLast = index === breadcrumbs.length - 1;
                                    return (
                                        <React.Fragment key={index}>
                                            <BreadcrumbItem>
                                                {isLast || !item.href ? (
                                                    <BreadcrumbPage className="text-sm text-blue-600 font-normal">
                                                        {item.label}
                                                    </BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink
                                                        href={item.href}
                                                        className="text-sm text-gray-400 hover:text-slate-800 transition-colors"
                                                    >
                                                        {item.label}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {!isLast && <BreadcrumbSeparator />}
                                        </React.Fragment>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                )}

                {/* 2. صف المحتوى (الباجنيشن والأزرار) */}
                <div className="px-6 py-4 flex items-center justify-between w-full">
                    {children}
                </div>

            </div>
        </header>
    );
}