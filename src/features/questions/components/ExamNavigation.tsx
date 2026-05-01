"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface ExamNavigationProps {
    currentIndex: number;
    total: number;
    canNext: boolean;
    isSubmitting: boolean;
    onPrev: () => void;
    onNext: () => void;
}

/**
 * ExamNavigation component using Shadcn UI Buttons.
 * Manages the transition between questions and the final submission.
 */
export function ExamNavigation({
    currentIndex,
    total,
    canNext,
    isSubmitting,
    onPrev,
    onNext,
}: ExamNavigationProps) {
    const isLastQuestion = currentIndex === total - 1;

    return (
        <div className="flex justify-between items-center pt-8 gap-6">
            {/* Previous Question Button */}
            <Button
                type="button"
                variant="secondary"
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="flex-1 h-auto py-3 px-6 rounded-none text-gray-500 font-medium text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
            >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Previous
            </Button>

            {/* Conditional Rendering: Next Question or Finish Exam */}
            {!isLastQuestion ? (
                <Button
                    type="button"
                    onClick={onNext}
                    disabled={!canNext}
                    className="flex-1 h-auto py-3 px-6 rounded-none bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                >
                    Next
                    <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
            ) : (
                <Button
                    type="submit"
                    disabled={isSubmitting || !canNext}
                    className="flex-1 h-auto py-3 px-6 rounded-none bg-green-600 hover:bg-green-700 text-white font-bold transition-colors disabled:bg-gray-400"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Finish Exam"
                    )}
                </Button>
            )}
        </div>
    );
}