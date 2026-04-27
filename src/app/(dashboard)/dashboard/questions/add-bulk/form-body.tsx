'use client';

import { QuestionsBulkFormValue } from '@/features/dashboard-questions/types/question';
import { Input } from '@/shared/components/ui/input';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import QuestionsAnswers from './questions-answers';
import { Label } from '@/shared/components/ui/label';

interface Props {
    ActiveQuestionIndex: number;
}

export default function     QuestionFromBody({ ActiveQuestionIndex }: Props) {
    const form = useFormContext<QuestionsBulkFormValue>();

    return (
        <div className="flex flex-col gap-6 ">
            {/* Headline */}
            <div className="flex flex-col gap-2">
                <Label className="text-gray-800 text-base font-medium">Question Headline</Label>
                <Controller
                    name={`questions.${ActiveQuestionIndex}.text`}
                    control={form.control}
                    render={({ field }) => (
                        <Input 
                            {...field} 
                            placeholder="Enter question headline..." 
                            className="h-10 "
                        />
                    )}
                />
            </div>
            {/* Answers */}
            <QuestionsAnswers ActiveQuestionIndex={ActiveQuestionIndex} />

        </div>
    );
}