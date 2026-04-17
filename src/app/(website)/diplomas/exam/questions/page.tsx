import ExamDataLoader from "@/app/(website)/_components/ExamDataLoader";
import PageWrapper from "@/app/(website)/_components/PageWrapper";
import { FileText } from "lucide-react";
import React, { Suspense } from "react";

export default function ExamPage() {
  return (
    <PageWrapper title="Q" icon={<FileText className="w-5 h-5" />}>
      <Suspense
        fallback={
          <div className="flex py-20 items-center justify-center font-mono">
            Loading exam parameters...
          </div>
        }
      >
        <ExamDataLoader />
      </Suspense>
    </PageWrapper>
  );
}