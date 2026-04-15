"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { useExam } from '@/app/(website)/_hooks/use-exam';
import { useSubmitExam } from '@/app/(website)/_hooks/use-submit-exam';
import { IAnswer } from '@/lib/types/questions';
import { ChevronLeft } from 'lucide-react';

export default function ExamPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { questions, isLoading, error, formMethods } = useExam(id);
  const { sendSubmission, isSubmitting, error: submitError } = useSubmitExam();
  const [currentIndex, setCurrentIndex] = useState(0);
  const watchedAnswers = formMethods.watch("answers");
  if (isLoading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <span className="ml-3 font-bold text-gray-600">جاري تحميل الامتحان...</span>
    </div>
  );

  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;

  const currentQuestion = questions[currentIndex];
  const currentAnswers = currentQuestion?.answers || [];

  const onSubmit = async (data: any) => {
    await sendSubmission(id!, data.answers);
  };

  return (
    <div className=" bg-white font-mono ">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* الجزء الأيسر: عرض السؤال الحالي */}
        <div className="flex-1">

          {/* Progress Bar */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-2 ">
              <span className=" text-gray-800 text-base font-normal">
                Quiz Session
              </span>
              <p className="text-sm font-bold text-gray-500">
                Question <span className="text-blue-600">{currentIndex + 1}</span> of {questions.length}
              </p>
            </div>
            <div className="w-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              >
              </div>
            </div>
          </div>

          <form onSubmit={formMethods.handleSubmit(onSubmit)} className="p-6">
            <div className="min-h-107">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                {currentQuestion?.text}
              </h2>
              <Controller
                name={`answers.${currentIndex}.selectedOption`}
                control={formMethods.control}
                render={({ field }) => (
                  <div className="space-y-4">
                    {currentAnswers.map((answer: IAnswer) => (
                      <label
                        key={answer.id}
                        className={`flex items-center p-4 cursor-pointer h-12.5 ${field.value === answer.id
                          ? "border-blue-500 bg-gray-100"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                      >
                        <input
                          type="radio"
                          {...field}
                          value={answer.id}
                          checked={field.value === answer.id}
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className={`ml-2 text-sm text-gray-800 ${field.value === answer.id ? " " : ""}`}>
                          {answer.text}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              />
<div className="flex justify-between items-center mt-10 border-t pt-8 gap-10">
  {/* زر السابق */}
  <button
    type="button"
    disabled={currentIndex === 0}
    onClick={() => setCurrentIndex(prev => prev - 1)}
    className="flex-1 px-8 py-4 bg-white border border-gray-200 text-gray-600  font-bold disabled:opacity-30 hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm"
  >
    ← Previous
  </button>

  {/* زر التالي أو إنهاء الامتحان */}
  {currentIndex < questions.length - 1 ? (
    <button
      type="button"
      onClick={() => setCurrentIndex(prev => prev + 1)}
      className="flex-1 px-8 py-4 bg-blue-600 text-white  font-medium text-sm  hover:bg-blue-700 transition-all "
    >
    Next <ChevronLeft className="mr-2" size={18} />
    </button>
  ) : (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex-1 px-8 py-4 bg-green-600 text-white  font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-[0.98] disabled:bg-gray-400"
    >
      {isSubmitting ? "Submitting..." : "Finish Exam"}
    </button>
  )}
</div>
              {submitError && (
                <p className="text-red-500 text-center mt-4 font-medium italic">⚠️ {submitError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}