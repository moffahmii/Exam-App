import React from 'react'
import SideContent from '../../shared/components/custom/sideContent'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        // ضفنا كلمة flex هنا عشان العناصر تيجي جنب بعض
        <div className="flex w-full min-h-screen">

            <div className='w-1/2'>
                <SideContent />
            </div>

            <div className="flex items-center justify-center p-8 w-1/2">
                {children}
            </div>

        </div>
    )
}