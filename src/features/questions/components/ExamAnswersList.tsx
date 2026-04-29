"use client";

import React from "react";
import { Control, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";

interface Answer {
  id: string;
  text: string;
}

interface AnswersListProps {
  answers: Answer[];
  control: Control<any>; // استخدمنا control عشان يتربط بـ react-hook-form
  name: string;          // اسم الحقل الديناميكي (مثلاً: answers.0.answerId)
}

export function AnswersList({ answers, control, name }: AnswersListProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className="space-y-4" // نفس الستايل بتاعك
        >
          {answers.map((a) => (
            <label
              key={a.id}
              // نفس الكلاسات بتاعتك بالظبط مع الشرط بتاعك
              className={`p-4 bg-gray-50 cursor-pointer flex items-center gap-3 text-sm font-normal text-gray-800 ${field.value === a.id ? "bg-gray-200" : ""
                }`}
            >
              {/* استخدمنا المكون بتاع شيد سي إن بدل الـ input العادي */}
              <RadioGroupItem value={a.id} id={a.id} />
              {a.text}
            </label>
          ))}
        </RadioGroup>
      )}
    />
  );
}