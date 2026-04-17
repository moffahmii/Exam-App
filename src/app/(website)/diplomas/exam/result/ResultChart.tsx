"use client";

import React from "react";
import { Pie, PieChart, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart";

interface ResultsChartProps {
    correctAnswers: number;
    wrongAnswers: number;
}

export function ResultsChart({ correctAnswers, wrongAnswers }: ResultsChartProps) {
    const chartData = [
        { name: "Correct", value: correctAnswers, fill: "rgba(0, 188, 125, 1)" },
        { name: "Incorrect", value: wrongAnswers, fill: "rgba(239, 68, 68, 1)" },
    ];

    const chartConfig = {
        correct: { label: "Correct", color: "rgba(0, 188, 125, 1)" },
        incorrect: { label: "Incorrect", color: "rgba(239, 68, 68, 1)" },
    } satisfies ChartConfig;

    return (
        <div className="w-full lg:w-1/3 bg-blue-50 border-blue-200 border p-8 flex flex-col items-center justify-center">
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square w-full"
            >
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={110}
                        strokeWidth={0}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>

            {/* مفتاح الرسم البياني */}
            <div className="flex flex-col gap-3 mt-8 text-sm font-bold text-black">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#00c46a]" />
                    <span>Correct: {correctAnswers}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#f44336]" />
                    <span>Incorrect: {wrongAnswers}</span>
                </div>
            </div>
        </div>
    );
}