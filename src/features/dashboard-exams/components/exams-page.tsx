// "use client";

// import { useState } from "react";
// import Link from "next/link"; // 👈 استيراد Link
// import { ExamsTable } from "./exams-table";
// import { ExamsFilters } from "./exams-filter";

// export default function ExamsPage({ id }: { id: string }) {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [durationFilter, setDurationFilter] = useState("all");

//     return (
//         <div className="p-6">
//             {/* 👈 الهيدر الجديد اللي فيه العنوان والزرار */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold text-slate-800">Exams</h1>

//                 <Link
//                     href={`/dashboard/exams/${id}/create`}
//                     className="bg-[#00b074] text-white font-medium px-4 py-2 rounded shadow hover:bg-emerald-600 transition-colors flex items-center gap-2"
//                 >
//                     <span>+</span> Create New Exam
//                 </Link>
//             </div>

//             <ExamsFilters
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//                 durationFilter={durationFilter}
//                 setDurationFilter={setDurationFilter}
//             />

//             <ExamsTable
//                 id={id}
//                 searchQuery={searchQuery}
//                 durationFilter={durationFilter}
//             />
//         </div>
//     );
// }