import { Sidebar, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import DashboardSideBar from "@/features/dashboard-sidebar/components/dash-sidebar";
import { PageHeader } from "@/features/dashboard-header/components/header-page";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider style={{ "--sidebar-width": "346px" } as React.CSSProperties}>
            <DashboardSideBar />
            <main className="flex-1 flex flex-col bg-gray-100 min-h-screen w-full overflow-hidden">
                <div className="flex items-center gap-2 ">
                    <div className="md:hidden">
                        <SidebarTrigger className="-ml-2" />
                    </div>
                </div>
                <div className="flex-1 bg-gray-100">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}