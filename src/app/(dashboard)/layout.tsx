import PageHeader from "./_components/page-header";
import SideBar from "./_components/sideBar";


interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* 1. Sidebar Column - عرض ثابت ومثبت */}
            <aside className="w-90.5 h-screen sticky top-0 overflow-y-auto  shrink-0">
                <SideBar />
            </aside>

            {/* 2. Main Content Column - بياخد باقي المساحة */}
            <main className="flex-1 flex flex-col min-w-0">
                <div className="p-6">
                    <PageHeader  />
                    {children}
                </div>
            </main>
        </div>
    )
}