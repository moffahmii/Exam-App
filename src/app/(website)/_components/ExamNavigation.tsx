import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExamNavigationProps {
    currentIndex: number;
    total: number;
    canNext: boolean;
    isSubmitting: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export function ExamNavigation({
    currentIndex,
    total,
    canNext,
    isSubmitting,
    onPrev,
    onNext,
}: ExamNavigationProps) {
    return (
        <div className="flex justify-between items-center pt-8 gap-6 ">
            <button
                type="button"
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="flex-1 flex items-center justify-center px-6 py-3 text-gray-500 font-medium text-sm disabled:opacity-40 bg-gray-100 hover:bg-gray-200  transition-colors cursor-pointer"
            >
                <ChevronLeft className="mr-2 w-5 h-5" /> Previous
            </button>

            {currentIndex < total - 1 ? (
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!canNext}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm cursor-pointer font-medium  transition-colors disabled:opacity-50"
                >
                    Next <ChevronRight className="ml-2 w-5 h-5" />
                </button>
            ) : (
                <button
                    type="submit"
                    disabled={isSubmitting || !canNext}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold  disabled:bg-gray-400 disabled:opacity-50 transition-colors cursor-pointer"
                >
                    {isSubmitting ? "Submitting..." : "Finish Exam"}
                </button>
            )}
        </div>
    );
}