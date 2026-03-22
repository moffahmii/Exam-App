import SideBar from "./_components/sideBar";


interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return (
            <div className="flex min-h-screen bg-gray-50">
                <aside className="w-90.5 h-screen sticky top-0 overflow-y-auto shrink-0">
                    <SideBar />
                </aside>
                <main className="flex-1 flex flex-col bg-gray-50 p-6">
                    {children}
                </main>
            </div>
    );
}