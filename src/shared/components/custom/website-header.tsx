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

interface WebsiteHeaderProps {
    title: string;
    icon?: ReactNode;
    breadcrumbs?: BreadcrumbType[];
}

export function WebsiteHeader({ title, icon, breadcrumbs }: WebsiteHeaderProps) {
    return (
        <header className="w-full flex flex-col sticky top-0 z-30 bg-white">

            {/* 1. صف الـ Breadcrumbs - لازق فوق تماماً */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="w-full px-6 py-2 border-b h-12.5 border-gray-100">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                return (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            {isLast || !item.href ? (
                                                <BreadcrumbPage className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                                                    {item.label}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink
                                                    href={item.href}
                                                    className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
                                                >
                                                    {item.label}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {!isLast && <BreadcrumbSeparator className="scale-75 opacity-50" />}
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            )}

            <div className="p-4"> 
                <div className="w-full bg-blue-600 h-[77px] flex items-center px-8 ">
                    <div className="flex items-center gap-4">
                        {icon && (
                            <div className="text-white">
                                {icon}
                            </div>
                        )}
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>

        </header>
    );
}