"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Pie, PieChart, Cell } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { RotateCcw, FolderSearch, CircleDot, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// ... (نفس الـ Interfaces بتاعتك زي ما هي بالظبط)
export interface Answer { id: string; text: string; }
export interface AnalyticsRecord { questionId: string; questionText: string; selectedAnswer: Answer | null; isCorrect: boolean; correctAnswer: Answer; }
export interface SubmissionDetails { id: string; examId: string; examTitle: string; score: number; totalQuestions: number; correctAnswers: number; wrongAnswers: number; startedAt: string; submittedAt: string; }
export interface SubmissionData { submission: SubmissionDetails; analytics: AnalyticsRecord[]; }

interface SubmissionResultsProps {
    data: SubmissionData;
    onRestart?: () => void;
    onExplore?: () => void;
}

export default function SubmissionResults({
    data,
    onRestart,
    onExplore,
}: SubmissionResultsProps) {

    // 👇👇👇 هذا هو التعديل الوحيد (سطر الحماية) 👇👇👇
    if (!data || !data.submission || !data.analytics) {
        return null; // لو الداتا لسه بتلف أو ناقصة، الكومبوننت مش هيعمل كراش
    }
    // 👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆

    const { submission, analytics } = data;

    // 2. إعداد بيانات الـ Chart
    const chartData = [
        { name: "Correct", value: submission.correctAnswers, fill: "var(--color-correct)" },
        { name: "Incorrect", value: submission.wrongAnswers, fill: "var(--color-incorrect)" },
    ];

    const chartConfig = {
        correct: {
            label: "Correct",
            color: "#10b981",
        },
        incorrect: {
            label: "Incorrect",
            color: "#ef4444",
        },
    } satisfies ChartConfig;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 font-mono p-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Results:</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* العمود الأيسر: الإحصائيات والرسم البياني */}
                <Card className="col-span-1 bg-[#f4f8fc] border-slate-200 shadow-sm rounded-sm">
                    <CardContent className="flex flex-col items-center justify-center p-6 min-h-[400px]">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square w-full max-w-[200px]"
                        >
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={60}
                                    outerRadius={80}
                                    strokeWidth={0}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>

                        {/* مفتاح الرسم البياني (Legend) */}
                        <div className="flex flex-col gap-2 mt-8 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-emerald-500 rounded-sm" />
                                <span>Correct: {submission.correctAnswers}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-rose-500 rounded-sm" />
                                <span>Incorrect: {submission.wrongAnswers}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* العمود الأيمن: قائمة الأسئلة */}
                <div className="col-span-1 md:col-span-2 border border-slate-200 border-dashed bg-white p-2 rounded-sm">
                    <ScrollArea className="h-[400px] w-full pr-4">
                        <div className="space-y-8 p-4">
                            {analytics.map((item, index) => (
                                <div key={item.questionId || index} className="space-y-4">
                                    <h3 className="text-lg font-bold text-blue-600">
                                        {item.questionText}
                                    </h3>

                                    <div className="space-y-2">
                                        {!item.isCorrect && item.selectedAnswer && (
                                            <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-sm">
                                                <CircleDot className="w-4 h-4 text-rose-500" />
                                                <span className="text-sm font-medium">
                                                    {item.selectedAnswer.text}
                                                </span>
                                            </div>
                                        )}

                                        <div
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-sm border",
                                                item.isCorrect
                                                    ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                                                    : "bg-emerald-50/50 border-emerald-100/50 text-emerald-700"
                                            )}
                                        >
                                            {item.isCorrect ? (
                                                <CircleDot className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-emerald-500" />
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
            </div>

            {/* أزرار التحكم السفلية */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button
                    variant="secondary"
                    onClick={onRestart}
                    className="h-14 rounded-sm bg-slate-200 hover:bg-slate-300 text-slate-700 text-base font-bold transition-colors"
                >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Restart
                </Button>
                <Button
                    onClick={onExplore}
                    className="h-14 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-base font-bold transition-colors"
                >
                    <FolderSearch className="w-5 h-5 mr-2" />
                    Explore
                </Button>
            </div>
        </div>
    );
}