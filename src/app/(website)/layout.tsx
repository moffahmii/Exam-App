import { Sidebar, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import AppSideBar from "@/features/side-bar/components/sideBar";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider style={{ "--sidebar-width": "346px" } as React.CSSProperties}>
            <AppSideBar />
            <main className="flex-1 flex flex-col min-h-screen w-full overflow-hidden">
                <div className="flex items-center gap-2 ">
                    <div className="md:hidden">
                        <SidebarTrigger className="-ml-2" />
                    </div>
                </div>
                <div className="flex-1 ">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}