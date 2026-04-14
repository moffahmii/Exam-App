import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // تأكد من مسار الـ Shadcn عندك
import { MoreHorizontal, Plus, Search, ChevronDown } from "lucide-react";

// 1. الداتا الوهمية (Dummy Data) - دي اللي هنبدلها بالـ API بعدين
const dummyDiplomas = [
    {
        id: 1,
        title: "AI & ML Development",
        description: "Explore the foundations and frontiers of Artificial Intelligence - from machine learning and neural networks to natural language processing and computer vision. Gain practical insight into how AI systems are built, trained, and deployed across industries...",
        image: "https://via.placeholder.com/150/4f46e5/ffffff?text=AI", // صورة وهمية للتجربة
    },
    {
        id: 2,
        title: "Flutter Development",
        description: "Discover Flutter, the game-changing framework that lets you build natively compiled applications for mobile, web, and desktop from a single codebase...",
        image: "https://via.placeholder.com/150/0ea5e9/ffffff?text=Flutter",
    },
    {
        id: 3,
        title: "Back-End Web Development",
        description: "Become a professional Backend Developer. Learn how to build scalable APIs, manage databases, and ensure server security...",
        image: "https://via.placeholder.com/150/1e293b/ffffff?text=Back-End",
    },
    {
        id: 4,
        title: "Data Analysis",
        description: "Master the art of extracting meaningful insights from raw data. Learn Python, Pandas, SQL, and data visualization tools...",
        image: "https://via.placeholder.com/150/0284c7/ffffff?text=Data",
    }
];

export default function DiplomasTabel() {
    // لما الـ API يجهز، هتمسح الـ dummyDiplomas اللي فوق وتستخدم حاجة زي كده:
    // const [diplomas, setDiplomas] = useState([]);
    // useEffect(() => { fetch('/api/diplomas').then(res => res.json()).then(data => setDiplomas(data)) }, []);

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-mono">

            {/* --- الجزء الأول: الترويسة والترقيم --- */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600 font-medium">
                    <span>1 - 20 of 548</span>
                    <div className="flex items-center gap-1">
                        <button className="px-3 py-1.5 bg-gray-200 text-gray-500 rounded hover:bg-gray-300">&lt;</button>
                        <div className="px-4 py-1.5 border bg-white rounded text-gray-400">Page 1 of 28</div>
                        <button className="px-3 py-1.5 bg-gray-200 text-gray-500 rounded hover:bg-gray-300">&gt;</button>
                    </div>
                </div>

                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-medium flex items-center gap-2 transition-colors">
                    <Plus size={18} /> Add New Diploma
                </button>
            </div>

            {/* --- الجزء الثاني: الفلاتر --- */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                    <span className="font-semibold flex items-center gap-2">
                        <Search size={18} /> Search & Filters
                    </span>
                    <button className="text-sm hover:underline flex items-center gap-1">
                        Hide
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by title"
                                className="w-full border rounded p-2.5 pl-3 outline-none focus:border-blue-500 text-sm placeholder:text-gray-400"
                            />
                            <Search size={16} className="absolute right-3 top-3 text-gray-400" />
                        </div>
                        <div className="relative">
                            <select className="w-full border rounded p-2.5 outline-none focus:border-blue-500 text-sm text-gray-500 appearance-none bg-transparent">
                                <option>Immutability</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded font-medium transition-colors">Clear</button>
                        <button className="px-6 py-2 text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 rounded font-medium transition-colors">Apply</button>
                    </div>
                </div>
            </div>

            {/* --- الجزء الثالث: جدول البيانات (Shadcn) --- */}
            <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-blue-600 hover:bg-blue-600">
                        <TableRow>
                            <TableHead className="text-white w-[100px] h-10">Image</TableHead>
                            <TableHead className="text-white w-[250px] h-10">Title</TableHead>
                            <TableHead className="text-white h-10">Description</TableHead>
                            <TableHead className="text-white text-right h-10">Sort ↕</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {dummyDiplomas.map((diploma) => (
                            <TableRow key={diploma.id} className="hover:bg-gray-50/50">

                                <TableCell className="py-4">
                                    <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 border flex-shrink-0">
                                        <img
                                            src={diploma.image}
                                            alt={diploma.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </TableCell>

                                <TableCell className="font-semibold text-gray-800 align-top pt-5">
                                    {diploma.title}
                                </TableCell>

                                <TableCell className="text-gray-500 text-sm align-top pt-5">
                                    <p className="line-clamp-2 leading-relaxed">
                                        {diploma.description}
                                    </p>
                                </TableCell>

                                <TableCell className="text-right align-top pt-5">
                                    <button className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}