import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import DashboardSideBar from "@/features/dashboard-sidebar/components/dash-sidebar";
import { forbidden, redirect, unauthorized } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";

interface Props {
    children: React.ReactNode;
}

export default async function Layout({ children }: Props) {

    const session = await getServerSession(authOptions);

    // Not logged in
    if (!session) {
        redirect("/login");
    }

    // Role guard
    if (session.user?.role === "USER") {
       forbidden();
    }

    return (
        <SidebarProvider style={{ "--sidebar-width": "346px" } as React.CSSProperties}>
            <DashboardSideBar />
            <main className="flex-1 flex flex-col bg-gray-100 w-full min-h-screen overflow-hidden">
                {/* Mobile trigger */}
                <div className="flex items-center gap-2">
                    <div className="md:hidden">
                        <SidebarTrigger className="-ml-2" />
                    </div>
                </div>
                {/* Page content */}
                <div className="flex-1 flex items-center justify-center">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}