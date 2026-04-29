'use client';

import React, { useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Trash2, Check, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { QuestionsBulkFormValue } from '@/features/dashboard-questions/types/question';

interface Props {
    ActiveQuestionIndex: number;
}

export default function QuestionsAnswers({ ActiveQuestionIndex }: Props) {
    const form = useFormContext<QuestionsBulkFormValue>();
    const [newAnswerText, setNewAnswerText] = useState("");

    const watchedAnswers = useWatch({
        control: form.control,
        name: `questions.${ActiveQuestionIndex}.answers`,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `questions.${ActiveQuestionIndex}.answers`
    });

    const handleMarkCorrect = (clickedIndex: number) => {
        const currentAnswers = form.getValues(`questions.${ActiveQuestionIndex}.answers`);

        currentAnswers.forEach((_, i) => {
            form.setValue(
                `questions.${ActiveQuestionIndex}.answers.${i}.isCorrect`,
                i === clickedIndex,
                { shouldValidate: true, shouldDirty: true }
            );
        });
    };


    return (
        <div className="flex flex-col">

            {/* Header */}
            <div className="flex h-11 bg-gray-300">
                <div className="flex-1 flex items-center px-4">
                    <p className="font-medium text-gray-800 text-sm">Body</p>
                </div>
                <Button
                    type="button"
                    onClick={() => append({ text: "", isCorrect: false })}
                    className="h-full bg-emerald-500 hover:bg-emerald-600 text-white px-6"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Answer
                </Button>
            </div>

            {/* Answers List */}
            <div className="flex flex-col">
                {fields.map((field, index) => {
                    const isCorrect = watchedAnswers?.[index]?.isCorrect;

                    return (
                        <div
                            key={field.id}
                            className="flex border-b last:border-b-0 h-12.5 "
                        >
                            <div className="w-12.5 h-12.5 shrink-0 flex items-center justify-center border-r bg-red-100">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    className="h-full w-full rounded-none text-red-500 hover:text-red-700 hover:bg-red-100/50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Text Input */}
                            <div className="flex-1 flex items-center">
                                <Input
                                    {...form.register(`questions.${ActiveQuestionIndex}.answers.${index}.text`)}
                                    placeholder="Enter answer body"
                                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-full text-sm"
                                />
                            </div>

                            {/* Mark Correct Button */}
                            <div className="w-44 shrink-0 flex items-center justify-end px-3">
                                <Button
                                    type="button"
                                    variant={isCorrect ? "ghost" : "secondary"}
                                    onClick={() => handleMarkCorrect(index)}
                                    className={`w-full justify-center gap-2${isCorrect
                                            ? "text-emerald-600 bg-white "
                                            : "text-gray-800 bg-gray-200 hover:bg-gray-100"
                                        }`}
                                >
                                    <Check className={`h-4 w-4 ${isCorrect ? "stroke-[3px]" : ""}`} />
                                    {isCorrect ? "Correct Answer" : "Mark Correct"}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    );
}