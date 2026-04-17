import React from 'react'
import SideContent from '../../shared/components/custom/sideContent'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid lg:grid-cols-12 min-h-screen">
            
            <div className="lg:col-span-5">
                <SideContent />
            </div>

            <div className="lg:col-span-7 flex items-center justify-center p-8">
                {children}
            </div>
        </div>
    )
}