"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
interface PageHeaderProps {
    title: string;
    icon?: React.ReactNode;
}
export default function PageHeader({ title, icon }: PageHeaderProps) {
    const router = useRouter();
    const pathname = usePathname(); 
    const isHomePage = pathname === "/";

    return (
        <div className="flex items-stretch gap-4 mb-8 h-[77px] font-inter">
            {/* 4. لو إحنا مش في الهوم بيدج (!isHomePage)، اعرض الزرار */}
            {!isHomePage && (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                    className="w-[38px] h-full border-gray-200 bg-white hover:bg-gray-50 shrink-0"
                    aria-label="Go back">
                    <ChevronLeft className="text-blue-600 w-6 h-6" />
                </Button>
            )}
            <div className="flex-1 bg-blue-600 flex items-center p-4 text-white rounded-md">
                {icon && <span className="mr-3">{icon}</span>}
                <h1 className="text-3xl font-semibold">{title}</h1>
            </div>
        </div>
    );
}