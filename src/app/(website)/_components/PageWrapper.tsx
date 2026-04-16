import SmartBreadcrumb from "./CustomBreadcrumb";
import PageHeader from "./page-header";

// components/PageWrapper.tsx
export default function PageWrapper({ title, icon, children }) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader title={title} icon={icon} />
      <div className="mt-6">{children}</div>
    </div>
  );
}