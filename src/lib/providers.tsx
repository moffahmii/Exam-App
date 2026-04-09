import React from 'react'
import ReactQueryProvider from './providers/queryProvider'
import NextAuthProvider from './providers/next-auth-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                {children}
            </NextAuthProvider>
        </ReactQueryProvider>
    )
}
