// @ts-nocheck
'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '@/components/ui/phone-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

// Zod schema for phone validation
const FormSchema = z.object({
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .refine((value) => value && isValidPhoneNumber(value), {
            message: 'Invalid phone number',
        }),
});
type FormData = z.infer<typeof FormSchema>;

export default function PhoneNumber() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: { phone: '' },
    });

    const onSubmit = (data: FormData) => {
        alert(`You submitted the following values: ${JSON.stringify(data)}`);
    };

    return (
        <div className='relative mt-4 flex justify-center w-full max-w-sm mx-auto'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-start space-y-4 w-full'
            >
                {/* Phone Input Field */}
                <div className='flex flex-col items-start w-full space-y-1.5'>
                    <label htmlFor='phone' className='text-sm font-medium text-slate-700'>
                        Phone Number
                    </label>
                    <Controller
                        name='phone'
                        control={control}
                        render={({ field }) => (
                            <PhoneInput
                                {...field}
                                id='phone'
                                defaultCountry="EG" // <-- هنا بنحدد مصر كدولة افتراضية
                                placeholder='1012345678' // <-- البليس هولدر اللي في الصورة
                                className='w-full'
                            />
                        )}
                    />
                    {errors.phone && (
                        <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full p-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}