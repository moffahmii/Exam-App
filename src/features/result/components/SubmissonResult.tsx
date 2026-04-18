"use client";
import React from "react";
import { ResultsChart } from "./ResultChart";
import { ReviewList } from "./ReviewList";
import { ResultsActions } from "./ResultActions";
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

    if (!data || !data.submission || !data.analytics) { return null;}
    const { submission, analytics } = data;
    return (
        <div className="bg-white font-mono p-6 h-auto">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-1">Results:</h2>
                <div className="flex flex-col lg:flex-row gap-4">
                    <ResultsChart
                        correctAnswers={submission.correctAnswers}
                        wrongAnswers={submission.wrongAnswers}
                    />
                    <ReviewList analytics={analytics} />
                </div>
                {/* 3. الأزرار */}
                <ResultsActions />
            </div>
        </div>
    );
}