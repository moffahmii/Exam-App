"use client";

import { HelpCircle } from "lucide-react";
import { ResultsChart } from "./ResultChart";
import { ReviewList } from "./ReviewList";
import { ResultsActions } from "./ResultActions";
import { WebsiteHeader } from "@/shared/components/custom/website-header";
import { SubmissionData } from "@/shared/types/sub,ission";

interface SubmissionResultsProps {
    data: SubmissionData;
    diplomaName?: string;
    diplomaId?: string;
}

/**
 * SubmissionResults component displays the final breakdown of an exam submission,
 * including a performance chart, detailed question review, and navigation actions.
 */
export default function SubmissionResults({
    data,
    diplomaName,
    diplomaId,
}: SubmissionResultsProps) {
    // Guard clause for missing data
    if (!data || !data.submission || !data.analytics) {
        return null;
    }

    const { submission, analytics } = data;

    // Configuration for breadcrumb navigation
    const breadcrumbsData = [
        { label: "Diplomas", href: "/diplomas" },
        {
            label: diplomaName || "Diploma Details",
            href: `/diplomas/exam?id=${diplomaId}`,
        },
        { label: `${submission.examTitle} Exam - Results` },
    ];

    const HeaderIcon = (
        <HelpCircle size={45} className="text-white" strokeWidth={2} />
    );

    return (
        <div className="w-full min-h-screen">
            <WebsiteHeader
                title={`${submission.examTitle} Results`}
                icon={HeaderIcon}
                breadcrumbs={breadcrumbsData}
            />

            <div className="max-w-7xl mx-auto px-6 space-y-6">
                <div className="bg-white h-auto p-4">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        Your Performance:
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Visual data representation */}
                        <ResultsChart
                            correctAnswers={submission.correctAnswers}
                            wrongAnswers={submission.wrongAnswers}
                        />

                        {/* Detailed list of answers and corrections */}
                        <ReviewList analytics={analytics} />
                    </div>

                    {/* Navigation and retry actions */}
                    <ResultsActions />
                </div>
            </div>
        </div>
    );
}