import React from "react";
import SmartBreadcrumb from "./CustomBreadcrumb";
import PageHeader from "./page-header";

// تعريف أنواع البيانات للمكون
interface PageWrapperProps {
  title: string;
  icon?: React.ReactNode; // استخدمنا ReactNode لتشمل الأيقونات، ووضعنا علامة ؟ لجعلها اختيارية
  children: React.ReactNode; // النوع القياسي لأي محتوى بداخل مكون React
}
export default function PageWrapper({ title, icon, children }: PageWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader title={title} icon={icon} />
      <div className="mt-6">{children}</div>
    </div>
  );
}