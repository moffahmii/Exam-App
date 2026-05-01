import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import AppSideBar from "@/features/side-bar/components/sideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
    return (
        <SidebarProvider style={{ "--sidebar-width": "346px" } as React.CSSProperties}>
            <AppSideBar />
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full px-4 bg-gray-50">
                <div className="flex items-center gap-2">
                    <div className="md:hidden">
                        <SidebarTrigger className="-ml-2" />
                    </div>
                </div>
                <div className="flex-1 bg-gray-50">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}