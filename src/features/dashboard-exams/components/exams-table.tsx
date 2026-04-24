import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/shared/components/ui/table";
import { TableSkeleton } from './table-skeleton';
import Image from "next/image";
import { ExamActions } from "./exam-actions";
import { ExamSort } from "./exam-sort";

interface ExamsTableProps {
    exams: any[]; // يمكنك استبدالها بـ IExam[] لو متوفرة
    isLoading: boolean;
    isFetching: boolean;
    currentSort: string;
    onSortChange: (val: string) => void;
}

export function ExamsTable({ exams, isLoading, isFetching, currentSort, onSortChange }: ExamsTableProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-none shadow-none relative overflow-hidden">
            <Table className="w-full border-collapse table-fixed">
                <TableHeader className="bg-[#2563eb]">
                    <TableRow className="border-none h-12 hover:bg-[#2563eb]">
                        <TableHead className="w-[100px] text-white text-sm font-medium pl-6">Image</TableHead>
                        <TableHead className="w-[40%] text-white text-sm font-medium">Title</TableHead>
                        <TableHead className="w-[25%] text-white text-sm font-medium">Diploma</TableHead>
                        <TableHead className="w-[150px] text-white text-sm font-medium text-center">Questions</TableHead>
                        <TableHead className="w-[120px] text-white text-sm font-medium text-center pointer-events-auto">
                            <ExamSort currentSort={currentSort} onSort={onSortChange} />
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        exams.map((exam) => (
                            <TableRow key={exam.id} className="h-[100px] border-b border-gray-100 hover:bg-transparent rounded-none">
                                <TableCell className="pl-6">
                                    <div className="w-16 h-16 border border-gray-100 bg-white flex-shrink-0">
                                        <Image
                                            src={exam.image || '/placeholder.png'}
                                            alt={exam.title}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-800">
                                    <div className="line-clamp-2">{exam.title}</div>
                                </TableCell>
                                <TableCell className="text-gray-500 truncate">
                                    {exam.diploma?.title || 'N/A'}
                                </TableCell>
                                <TableCell className="text-center font-mono text-gray-700">
                                    {exam.questionsCount}
                                </TableCell>
                                <TableCell className="text-center">
                                    <ExamActions examId={exam.id} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}