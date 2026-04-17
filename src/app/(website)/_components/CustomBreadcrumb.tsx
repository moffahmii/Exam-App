"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";

export default function SmartBreadcrumb() {
  const pathname = usePathname();

  // تحويل المسار /a/b/c لمصفوفة ["a", "b", "c"]
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  return (
    // التعديل هنا: w-full للعرض الكامل، flex و items-center للتوسيط، و h-12 للارتفاع
    <Breadcrumb className="w-full flex items-center h-12 px-4 bg-white font-mono ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-gray-400 hover:text-blue-600">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.length > 0 && <BreadcrumbSeparator />}

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          // تحويل الكلمات زي css-exam لـ CSS Exam
          const label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-blue-600 font-medium">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="text-gray-400 hover:text-blue-600">
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}