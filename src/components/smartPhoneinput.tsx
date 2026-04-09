'use client'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css' // لازم تسيب الـ import ده عشان الأساسيات

export default function SmartPhoneInput() {
    const [value, setValue] = useState<string | undefined>()

    return (
        <div className="space-y-2">
            {/* الكلاس PhoneInput هيسحب كل التنسيقات اللي إنت حطيتها في الـ CSS */}
            <PhoneInput
                international
                defaultCountry="EG"
                value={value}
                onChange={setValue}
                placeholder="1012345678"
                className="PhoneInput"
            />
        </div>
    )
}