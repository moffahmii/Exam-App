export default function PageHeader() {
    return (
        <div className="flex items-center justify-between">
            {/* جزء الترقيم */}
            <div className="flex items-center gap-4 text-sm font-medium">
                <span>1 - 20 of 548</span>
                <div className="flex items-center gap-1">
                    <button className="px-3 py-1 bg-gray-200 rounded">&lt;</button>
                    <input type="text" value="Page 1 of 28" className="px-2 py-1 border text-center w-32 bg-white" disabled />
                    <button className="px-3 py-1 bg-gray-200 rounded">&gt;</button>
                </div>
            </div>

            {/* زر الإضافة */}
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-medium flex items-center gap-2">
                <span>+</span> Add New Diploma
            </button>
        </div>
    );
}