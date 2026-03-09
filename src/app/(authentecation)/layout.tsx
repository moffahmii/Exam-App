import React from 'react'
import SideContent from './_components/sideContent'

interface Props {
    children: React.ReactNode
}

export default function layout({ children }: Props) {
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