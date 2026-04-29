"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import AppSideBar from "@/features/side-bar/components/sideBar";
import { WebsiteHeader } from "@/shared/components/custom/website-header";
import { Settings, UserRound } from "lucide-react";
import AccountSideBar from "@/features/account-settings/components/accountSideBar";

interface Props {
    children: React.ReactNode;
}

export default function AccountLayout({ children }: Props) {
    return (
        <div className="flex flex-col">
            <WebsiteHeader
                title="Account Settings"
                icon={<UserRound size={45} />}
                breadcrumbs={[
                    { label: "Account", href: "/account" }
                ]}
            />
            <div className="flex gap-4 items-start px-6">
                {/* Account Sidebar */}
                <AccountSideBar />
                {/* Content */}
                <div className="flex-1 bg-white ">
                    {children}
                </div>
            </div>
        </div>
    );
}