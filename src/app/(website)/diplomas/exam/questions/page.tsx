import { getExamQuestions } from '@/lib/api/website/exam-questions.api';
import { IQuestion } from '@/lib/types/questions';
import React from 'react'

export default async function QuestionsPage({ searchParams }: { searchParams: Promise<{ id?: string }>; }) {

  const { id } = await searchParams;
  console.log('Exam ID from searchParams:', id);
  const response  = await getExamQuestions(id!);
  console.log('Exam Questions Response:', response);

  return (
    <div>QuestionsPage</div>
  )
}
