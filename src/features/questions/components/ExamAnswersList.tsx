"use client";

import { Control, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { cn } from "@/shared/utils/cn.util";

interface Answer {
  id: string;
  text: string;
}

interface AnswersListProps {
  answers: Answer[];
  control: Control<any>;
  name: string; 
}

/**
 * AnswersList component integrates Shadcn RadioGroup with React Hook Form.
 * It renders a list of selectable answers for a specific question.
 */
export function AnswersList({ answers, control, name }: AnswersListProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className="space-y-4"
        >
          {answers.map((answer) => (
            <label
              key={answer.id}
              className={cn(
                "p-4 bg-gray-50 cursor-pointer flex items-center gap-3 text-sm font-normal text-gray-800 transition-colors",
                field.value === answer.id && "bg-gray-200"
              )}
            >
              <RadioGroupItem value={answer.id} id={answer.id} />
              {answer.text}
            </label>
          ))}
        </RadioGroup>
      )}
    />
  );
}