"use client";

import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { CircleDot, Circle } from "lucide-react";
import { cn } from "@/shared/utils/cn.util";
import { AnalyticsRecord } from "@/shared/types/sub,ission";

interface ReviewListProps {
    analytics: AnalyticsRecord[];
}

/**
 * ReviewList component displays a scrollable list of questions with their 
 * respective correct and selected answers for post-exam review.
 */
export function ReviewList({ analytics }: ReviewListProps) {
    return (
        <div className="w-full lg:w-2/3 border-2 border-dashed border-blue-200 p-1">
            <ScrollArea className="h-128.5 w-full pr-2">
                <div className="space-y-4 p-4">
                    {analytics.map((item, index) => (
                        <div key={item.questionId || index} className="space-y-4">
                            {/* Question Text */}
                            <h3 className="text-xl font-semibold text-blue-600">
                                {item.questionText}
                            </h3>

                            <div className="space-y-3">
                                {/* Incorrect Answer View: Displayed only if the user's choice was wrong */}
                                {!item.isCorrect && item.selectedAnswer && (
                                    <div className="flex items-center bg-red-50 h-12.5 p-4 gap-2">
                                        <CircleDot className="w-5 h-5 text-red-600 shrink-0" />
                                        <span className="text-sm font-medium">
                                            {item.selectedAnswer.text}
                                        </span>
                                    </div>
                                )}

                                {/* Correct Answer View: Always displayed as the reference */}
                                <div
                                    className={cn(
                                        "flex items-center gap-4 p-4 h-12.5 text-sm font-normal bg-emerald-50 text-gray-800"
                                    )}
                                >
                                    {item.isCorrect ? (
                                        <CircleDot className="w-5 h-5 text-green-600 shrink-0" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-green-600 shrink-0" />
                                    )}
                                    <span className="text-sm font-medium">
                                        {item.correctAnswer.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}