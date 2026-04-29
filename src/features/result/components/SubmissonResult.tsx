"use client";
import React from "react";
import { CircleQuestionMark } from "lucide-react";
import { ResultsChart } from "./ResultChart";
import { ReviewList } from "./ReviewList";
import { ResultsActions } from "./ResultActions";
import { WebsiteHeader } from "@/shared/components/custom/website-header"; // 👈 استدعاء الهيدر
import { SubmissionData } from "@/shared/types/sub,ission";

interface SubmissionResultsProps {
    data: SubmissionData;
    diplomaName?: string; // 👈 هنستقبلهم عشان البريد كرامب
    diplomaId?: string;
}

export default function SubmissionResults({
    data,
    diplomaName,
    diplomaId,
}: SubmissionResultsProps) {
    if (!data || !data.submission || !data.analytics) { return null; }

    const { submission, analytics } = data;

    // 💡 نفس البريد كرامب بالظبط، بس غيرنا الكلمة الأخيرة لـ Results
    const breadcrumbsData = [
        { label: "Diplomas", href: "/diplomas" },
        { label: diplomaName || "Diploma Details", href: `/diplomas/${diplomaId}` },
        { label: `${submission.examTitle} Exam - Results` }
    ];

    const HeaderIcon = (
        <CircleQuestionMark size={45} className="text-white" strokeWidth={2} />
    );

    return (
        // 💡 نفس الحاوية الخارجية بتاعة صفحة الأسئلة
        <div className="w-full min-h-screen">

            <WebsiteHeader
                title={`${submission.examTitle} Results`}
                icon={HeaderIcon}
                breadcrumbs={breadcrumbsData}
            />

            <div className="max-w-7xl mx-auto px-6  space-y-6">
                {/* 💡 محتوى النتيجة جوه نفس الكارد الأبيض اللي كان فيه الأسئلة */}
                <div className="bg-white h-auto p-4">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">Your Performance:</h2>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <ResultsChart
                            correctAnswers={submission.correctAnswers}
                            wrongAnswers={submission.wrongAnswers}
                        />
                        <ReviewList analytics={analytics} />
                    </div>

                    <ResultsActions />
                </div>
            </div>
        </div>
    );
}