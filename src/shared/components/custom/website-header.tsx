"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
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
    const pathname = usePathname();
    const router = useRouter();

    const isHomePage = pathname === '/';

    return (
        <header className="w-full flex flex-col">
            {/* 1. صف الـ Breadcrumbs - بارتفاع 50px كما طلبنا سابقاً */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="w-full px-6 flex items-center bg-white h-12.5 border-b border-gray-100">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                return (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            {isLast || !item.href ? (
                                                <BreadcrumbPage className="text-sm font-medium tracking-widest text-gray-400">
                                                    {item.label}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink
                                                    href={item.href}
                                                    className="text-sm font-normal tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
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

            <div className="p-6">
                <div className="flex items-stretch gap-2">
                    {!isHomePage && (
                        <button
                            onClick={() => router.back()}
                            className="shrink-0 w-9 h-19 flex items-center justify-center border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <div className="w-full bg-blue-600 h-[77px] flex items-center px-4">
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
            </div>
        </header>
    );
}