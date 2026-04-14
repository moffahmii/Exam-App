export default function FilterSection() {
    return (
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            {/* الهيدر الأزرق */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                <span className="font-semibold flex items-center gap-2">Search & Filters</span>
                <button className="text-sm hover:underline">Hide</button>
            </div>

            {/* حقول البحث */}
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Search by title" className="border rounded p-2 w-full" />
                    <select className="border rounded p-2 w-full text-gray-500">
                        <option>Immutability</option>
                    </select>
                </div>

                {/* أزرار التحكم */}
                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium">Clear</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium">Apply</button>
                </div>
            </div>
        </div>
    );
}