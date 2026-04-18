import ExamDataLoader from "@/features/questions/components/ExamDataLoader";
import { FileText } from "lucide-react";
import React, { Suspense } from "react";

export default function ExamPage() {
  return (
      <Suspense
        fallback={
          <div className="flex py-20 items-center justify-center font-mono">
            Loading exam parameters...
          </div>
        }>
        <ExamDataLoader />
      </Suspense>
  );
}