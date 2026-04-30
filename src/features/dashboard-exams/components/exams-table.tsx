import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/shared/components/ui/table";
import { TableSkeleton } from '../skeleton/table-skeleton';
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
        <div className="bg-white relative overflow-hidden">
            <Table className="w-full border-collapse table-fixed">
                <TableHeader className="bg-blue-600">
                    <TableRow className="border-none h-9 ">
                        <TableHead className="w-25 text-white text-sm font-medium ">Image</TableHead>
                        <TableHead className="w-112.25 text-white text-sm font-medium">Title</TableHead>
                        <TableHead className="w-50 text-white text-sm font-medium">Diploma</TableHead>
                        <TableHead className="w-50 text-white text-sm font-medium ">Questions</TableHead>
                        <TableHead className="w-20 text-white text-sm font-medium  pointer-events-auto">
                            <ExamSort currentSort={currentSort} onSort={onSortChange} />
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        exams.map((exam) => (
                            <TableRow key={exam.id} className="h-25">
                                <TableCell className="">
                                    <div className="w-23 h-25  bg-white shrink-0">
                                        <Image
                                            src={exam.image || '/placeholder.png'}
                                            alt={exam.title}
                                            width={70}
                                            height={80}
                                            className="w-full h-full object-contain p-2"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-sm text-gray-800">
                                    <div className="line-clamp-2">{exam.title}</div>
                                </TableCell>
                                <TableCell className="font-medium text-sm text-gray-800">
                                    {exam.diploma?.title || 'N/A'}
                                </TableCell>
                                <TableCell className=" font-medium text-sm text-gray-800">
                                    {exam.questionsCount}
                                </TableCell>
                                <TableCell className="text-end">
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