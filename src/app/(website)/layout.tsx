import Providers from "@/shared/providers/sub-providers/queryProvider";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider style={{ "--sidebar-width": "346px" } as React.CSSProperties}>
            <Sidebar/>
            <main className="flex-1 flex flex-col bg-gray-50 min-h-screen w-full overflow-hidden">
                <div className="flex items-center gap-2 ">
                    <div className="md:hidden">
                        <SidebarTrigger className="-ml-2" />
                    </div>
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