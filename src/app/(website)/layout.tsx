import Providers from "@/shared/providers/sub-providers/queryProvider";
import SideBar from "./_components/sideBar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import SmartBreadcrumb from "./_components/CustomBreadcrumb";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider style={{ "--sidebar-width": "346px" } as React.CSSProperties}>
            <SideBar />
            <main className="flex-1 flex flex-col bg-gray-50 min-h-screen w-full overflow-hidden">
                <div className="flex items-center gap-2 ">
                    <div className="md:hidden">
                        <SidebarTrigger className="-ml-2" />
                    </div>
                    <SmartBreadcrumb />
                </div>
                <div className="flex-1 p-6">
                    <Providers>
                        {children}
                    </Providers>
                </div>
            </main>
        </SidebarProvider>
    );
}