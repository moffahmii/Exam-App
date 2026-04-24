// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import { ExternalLink, Ban, Edit, Trash2, Plus, ArrowDownUp, MoreHorizontal, Loader2 } from 'lucide-react';
// import { PageHeader } from '@/features/dashboard-header/components/header-page';
// import { useExamDetails } from '../hooks/use-exam-details'; // تأكد من مسار الـ Hook

// // يفضل تضيف التايب ده في ملف الـ types لو هترجع الأسئلة من الباك إند مستقبلاً
// interface IQuestion {
//     id: string;
//     title: string;
// }

// export default function ExamDetailsView() {
//     // 1. سحب الـ ID من الرابط
//     const params = useParams();
//     const examId = params.id as string;

//     const { data: examData, isLoading, isError } = useExamDetails(examId);

//     // 3. شاشة التحميل (Loading State) - بستايل متناسق مع الداشبورد
//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center w-full min-h-[400px] bg-gray-50">
//                 <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
//                 <p className="text-gray-500 font-medium">Loading exam details...</p>
//             </div>
//         );
//     }

//     // 4. شاشة الخطأ (Error State)
//     if (isError || !examData) {
//         return (
//             <div className="flex flex-col items-center justify-center w-full min-h-[400px] bg-gray-50">
//                 <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100 flex flex-col items-center">
//                     <Ban className="w-8 h-8 mb-2" />
//                     <p className="font-semibold">Failed to load exam details.</p>
//                     <p className="text-sm mt-1 text-red-500">Please check your connection and try again.</p>
//                 </div>
//             </div>
//         );
//     }

//     // --- البيانات جاهزة الآن (examData من نوع IExam) ---

//     const headerTitleAndInfo = (
//         <div>
//             <h1 className="text-lg font-bold text-gray-900 mb-1">
//                 {examData.title}
//             </h1>
//             <div className="flex items-center text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
//                 {/* تم استخدام examData.diploma.title بناءً على التايب بتاعك */}
//                 <span>Diploma: {examData.diploma?.title || 'Unknown Diploma'}</span>
//                 <ExternalLink className="w-4 h-4 ml-1" />
//             </div>
//         </div>
//     );
    
//     const headerActions = (
//         <div className="flex items-center gap-2">
//             {/* تم استخدام examData.immutable بناءً على التايب بتاعك */}
//             {examData.immutable && (
//                 <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-4 py-2 text-sm font-medium border border-gray-200 rounded-sm">
//                     <Ban className="w-4 h-4" />
//                     Immutable
//                 </div>
//             )}
//             <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors rounded-sm shadow-sm">
//                 <Edit className="w-4 h-4" />
//                 Edit
//             </button>
//             <button className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium transition-colors rounded-sm shadow-sm">
//                 <Trash2 className="w-4 h-4" />
//                 Delete
//             </button>
//         </div>
//     );

//     return (
//         <div className="flex flex-col w-full h-full bg-gray-50 min-h-screen">
//             <PageHeader actions={headerActions}>
//                 {headerTitleAndInfo}
//             </PageHeader>

//             <div className="p-6 w-full mx-auto max-w-6xl">
//                 {/* كارت تفاصيل الامتحان */}
//                 <div className="bg-white p-6 border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-8">
                    
//                     {/* Image Section */}
//                     <div className="flex-shrink-0">
//                         <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Cover Image</label>
//                         <div className="w-[250px] h-[250px] relative bg-gray-50 border border-gray-200 overflow-hidden rounded-sm flex items-center justify-center">
//                             <Image
//                                 src={examData.image || "/placeholder.png"}
//                                 alt={examData.title}
//                                 fill
//                                 className="object-cover"
//                             />
//                         </div>
//                     </div>

//                     {/* Info Fields Section */}
//                     <div className="flex flex-col gap-6 flex-grow py-2">
//                         <div>
//                             <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Title</label>
//                             <div className="text-base font-medium text-gray-900">{examData.title}</div>
//                         </div>

//                         <div>
//                             <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
//                             <div className="text-sm font-medium text-gray-700 leading-relaxed max-w-3xl">
//                                 {examData.description || <span className="text-gray-400 italic">No description provided.</span>}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                             <div>
//                                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Diploma</label>
//                                 <div className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer transition-colors w-fit">
//                                     {examData.diploma?.title}
//                                     <ExternalLink className="w-3.5 h-3.5" />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Duration</label>
//                                 <div className="text-sm font-medium text-gray-900">{examData.duration} Minutes</div>
//                             </div>

//                             <div>
//                                 <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Questions Count</label>
//                                 <div className="text-sm font-medium text-gray-900 bg-gray-100 px-2.5 py-1 rounded w-fit">
//                                     {examData.questionsCount}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> 

//                 {/* Questions Table */}
//                 <div className="bg-white border border-gray-200 shadow-sm relative">
//                     {/* Table Header Action Bar */}
//                     <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-3">
//                         <h2 className="text-sm font-semibold tracking-wide">Exam Questions</h2>
//                         <button className="flex items-center gap-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors">
//                             <Plus className="w-4 h-4" /> Add Questions
//                         </button>
//                     </div>

//                     {/* Table Columns Header */}
//                     <div className="bg-gray-50 flex justify-between items-center px-4 py-3 border-b border-gray-200">
//                         <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Question Title</span>
//                         <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">
//                             Sort <ArrowDownUp className="w-3 h-3" />
//                         </div>
//                     </div>

//                     {/* Table Rows */}
//                     <div className="flex flex-col">
//                         ملاحظة: التايب IExam حالياً لا يحتوي على مصفوفة أسئلة (فقط questionsCount).
//                           إذا كان الـ API يرجع الأسئلة في حقل اسمه examData.questions، قم بإلغاء تعليق الكود التالي:
//                         */}
                        
//                         {/* {examData.questions && examData.questions.length > 0 ? (
//                             examData.questions.map((q: IQuestion) => (
//                                 <div
//                                     key={q.id}
//                                     className="flex justify-between items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
//                                 >
//                                     <span className="text-sm font-medium text-gray-800">{q.title}</span>
//                                     <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-600">
//                                         <MoreHorizontal className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="p-12 flex flex-col items-center justify-center text-center">
//                                 <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full mb-3">
//                                     <span className="text-gray-400 text-2xl">?</span>
//                                 </div>
//                                 <h3 className="text-sm font-semibold text-gray-900 mb-1">No questions yet</h3>
//                                 <p className="text-sm text-gray-500">Get started by adding questions to this exam.</p>
//                             </div>
//                         )} 
                       

//                         {/* مؤقتاً بما أن الداتا لا تحتوي على مصفوفة أسئلة */}
//                         <div className="p-12 flex flex-col items-center justify-center text-center">
//                             <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full mb-3">
//                                 <span className="text-gray-400 text-2xl">?</span>
//                             </div>
//                             <h3 className="text-sm font-semibold text-gray-900 mb-1">No questions data available</h3>
//                             <p className="text-sm text-gray-500">This API endpoint currently returns only the questions count ({examData.questionsCount}).</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }