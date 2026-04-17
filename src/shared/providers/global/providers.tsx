import React from 'react'
import ReactQueryProvider from '../sub-providers/queryProvider'
import NextAuthProvider from '../sub-providers/next-auth-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                {children}
            </NextAuthProvider>
        </ReactQueryProvider>
    )
}
